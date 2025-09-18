import { Command } from 'commander';
import chalk from 'chalk';
import { getThawTransaction } from '@mosaic/sdk';
import { createSolanaClient } from '../../utils/rpc.js';
import { getAddressFromKeypair, loadKeypair } from '../../utils/solana.js';
import { createNoopSigner, signTransactionMessageWithSigners, type Address, type TransactionSigner } from 'gill';
import { maybeOutputRawTx } from '../../utils/rawTx.js';
import { createSpinner, getGlobalOpts } from '../../utils/cli.js';

interface CreateConfigOptions {
  tokenAccount: string;
  rpcUrl?: string;
  keypair?: string;
  payer?: string;
  authority?: string;
}

export const thaw = new Command('thaw')
  .description('Thaw a token account')
  .requiredOption(
    '-t, --token-account <token-account>',
    'Token account address'
  )
  .showHelpAfterError()
  .action(async (options: CreateConfigOptions, command) => {
    const parentOpts = getGlobalOpts(command);
    const rpcUrl = parentOpts.rpcUrl;
    const rawTx: string | undefined = parentOpts.rawTx;
    const spinner = createSpinner('Thawing token account...', rawTx);

    try {
      const { rpc, sendAndConfirmTransaction } = createSolanaClient(rpcUrl);
      spinner.text = `Using RPC URL: ${rpcUrl}`;

      let authority: TransactionSigner<string>;
      let payer: TransactionSigner<string>;
      if (rawTx) {
        const defaultAddr = (await getAddressFromKeypair(parentOpts.keypair)) as Address;
        authority = createNoopSigner(parentOpts.authority as Address || defaultAddr);
        payer = createNoopSigner(parentOpts.feePayer as Address || authority.address);
      } else {
        const kp = await loadKeypair(parentOpts.keypair);
        authority = kp;
        payer = kp;
      }

      const transaction = await getThawTransaction({
        rpc,
        payer,
        authority,
        tokenAccount: options.tokenAccount as Address,
      });

      if (maybeOutputRawTx(rawTx, transaction)) {
        return;
      }

      spinner.text = 'Signing transaction...';

      // Sign the transaction
      const signedTransaction =
        await signTransactionMessageWithSigners(transaction);

      spinner.text = 'Sending transaction...';

      // Send and confirm transaction
      const signature = await sendAndConfirmTransaction(signedTransaction, {
        skipPreflight: true,
        commitment: 'confirmed',
      });

      spinner.succeed('Thawing token account successfully!');

      // Display results
      console.log(chalk.green('✅ Thawing token account successfully!'));
      console.log(chalk.cyan('📋 Details:'));
      console.log(`   ${chalk.bold('Token Account:')} ${options.tokenAccount}`);
      console.log(`   ${chalk.bold('Transaction:')} ${signature}`);
    } catch (error) {
      if (!rawTx) {
        spinner.fail('Failed to thaw token account');
      }
      console.error(
        chalk.red('❌ Error:'),
        error instanceof Error ? error.message : 'Unknown error'
      );

      process.exit(1);
    }
  });

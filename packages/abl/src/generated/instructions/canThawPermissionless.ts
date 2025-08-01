/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  transformEncoder,
  type AccountMeta,
  type Address,
  type FixedSizeCodec,
  type FixedSizeDecoder,
  type FixedSizeEncoder,
  type Instruction,
  type InstructionWithAccounts,
  type InstructionWithData,
  type ReadonlyAccount,
  type ReadonlyUint8Array,
} from '@solana/kit';
import { ABL_SRFC37_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const CAN_THAW_PERMISSIONLESS_DISCRIMINATOR = new Uint8Array([
  8, 175, 169, 129, 137, 74, 61, 241,
]);

export function getCanThawPermissionlessDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(
    CAN_THAW_PERMISSIONLESS_DISCRIMINATOR
  );
}

export type CanThawPermissionlessInstruction<
  TProgram extends string = typeof ABL_SRFC37_PROGRAM_ADDRESS,
  TAccountAuthority extends string | AccountMeta<string> = string,
  TAccountTokenAccount extends string | AccountMeta<string> = string,
  TAccountMint extends string | AccountMeta<string> = string,
  TAccountOwner extends string | AccountMeta<string> = string,
  TAccountExtraMetas extends string | AccountMeta<string> = string,
  TAccountListConfig extends string | AccountMeta<string> = string,
  TAccountAbWallet extends string | AccountMeta<string> = string,
  TRemainingAccounts extends readonly AccountMeta<string>[] = [],
> = Instruction<TProgram> &
  InstructionWithData<ReadonlyUint8Array> &
  InstructionWithAccounts<
    [
      TAccountAuthority extends string
        ? ReadonlyAccount<TAccountAuthority>
        : TAccountAuthority,
      TAccountTokenAccount extends string
        ? ReadonlyAccount<TAccountTokenAccount>
        : TAccountTokenAccount,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountOwner extends string
        ? ReadonlyAccount<TAccountOwner>
        : TAccountOwner,
      TAccountExtraMetas extends string
        ? ReadonlyAccount<TAccountExtraMetas>
        : TAccountExtraMetas,
      TAccountListConfig extends string
        ? ReadonlyAccount<TAccountListConfig>
        : TAccountListConfig,
      TAccountAbWallet extends string
        ? ReadonlyAccount<TAccountAbWallet>
        : TAccountAbWallet,
      ...TRemainingAccounts,
    ]
  >;

export type CanThawPermissionlessInstructionData = {
  discriminator: ReadonlyUint8Array;
};

export type CanThawPermissionlessInstructionDataArgs = {};

export function getCanThawPermissionlessInstructionDataEncoder(): FixedSizeEncoder<CanThawPermissionlessInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', fixEncoderSize(getBytesEncoder(), 8)]]),
    value => ({
      ...value,
      discriminator: CAN_THAW_PERMISSIONLESS_DISCRIMINATOR,
    })
  );
}

export function getCanThawPermissionlessInstructionDataDecoder(): FixedSizeDecoder<CanThawPermissionlessInstructionData> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
  ]);
}

export function getCanThawPermissionlessInstructionDataCodec(): FixedSizeCodec<
  CanThawPermissionlessInstructionDataArgs,
  CanThawPermissionlessInstructionData
> {
  return combineCodec(
    getCanThawPermissionlessInstructionDataEncoder(),
    getCanThawPermissionlessInstructionDataDecoder()
  );
}

export type CanThawPermissionlessInput<
  TAccountAuthority extends string = string,
  TAccountTokenAccount extends string = string,
  TAccountMint extends string = string,
  TAccountOwner extends string = string,
  TAccountExtraMetas extends string = string,
  TAccountListConfig extends string = string,
  TAccountAbWallet extends string = string,
> = {
  authority: Address<TAccountAuthority>;
  tokenAccount: Address<TAccountTokenAccount>;
  mint: Address<TAccountMint>;
  owner: Address<TAccountOwner>;
  extraMetas: Address<TAccountExtraMetas>;
  listConfig: Address<TAccountListConfig>;
  abWallet: Address<TAccountAbWallet>;
};

export function getCanThawPermissionlessInstruction<
  TAccountAuthority extends string,
  TAccountTokenAccount extends string,
  TAccountMint extends string,
  TAccountOwner extends string,
  TAccountExtraMetas extends string,
  TAccountListConfig extends string,
  TAccountAbWallet extends string,
  TProgramAddress extends Address = typeof ABL_SRFC37_PROGRAM_ADDRESS,
>(
  input: CanThawPermissionlessInput<
    TAccountAuthority,
    TAccountTokenAccount,
    TAccountMint,
    TAccountOwner,
    TAccountExtraMetas,
    TAccountListConfig,
    TAccountAbWallet
  >,
  config?: { programAddress?: TProgramAddress }
): CanThawPermissionlessInstruction<
  TProgramAddress,
  TAccountAuthority,
  TAccountTokenAccount,
  TAccountMint,
  TAccountOwner,
  TAccountExtraMetas,
  TAccountListConfig,
  TAccountAbWallet
> {
  // Program address.
  const programAddress = config?.programAddress ?? ABL_SRFC37_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    authority: { value: input.authority ?? null, isWritable: false },
    tokenAccount: { value: input.tokenAccount ?? null, isWritable: false },
    mint: { value: input.mint ?? null, isWritable: false },
    owner: { value: input.owner ?? null, isWritable: false },
    extraMetas: { value: input.extraMetas ?? null, isWritable: false },
    listConfig: { value: input.listConfig ?? null, isWritable: false },
    abWallet: { value: input.abWallet ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.tokenAccount),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.owner),
      getAccountMeta(accounts.extraMetas),
      getAccountMeta(accounts.listConfig),
      getAccountMeta(accounts.abWallet),
    ],
    programAddress,
    data: getCanThawPermissionlessInstructionDataEncoder().encode({}),
  } as CanThawPermissionlessInstruction<
    TProgramAddress,
    TAccountAuthority,
    TAccountTokenAccount,
    TAccountMint,
    TAccountOwner,
    TAccountExtraMetas,
    TAccountListConfig,
    TAccountAbWallet
  >;

  return instruction;
}

export type ParsedCanThawPermissionlessInstruction<
  TProgram extends string = typeof ABL_SRFC37_PROGRAM_ADDRESS,
  TAccountMetas extends readonly AccountMeta[] = readonly AccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    authority: TAccountMetas[0];
    tokenAccount: TAccountMetas[1];
    mint: TAccountMetas[2];
    owner: TAccountMetas[3];
    extraMetas: TAccountMetas[4];
    listConfig: TAccountMetas[5];
    abWallet: TAccountMetas[6];
  };
  data: CanThawPermissionlessInstructionData;
};

export function parseCanThawPermissionlessInstruction<
  TProgram extends string,
  TAccountMetas extends readonly AccountMeta[],
>(
  instruction: Instruction<TProgram> &
    InstructionWithAccounts<TAccountMetas> &
    InstructionWithData<ReadonlyUint8Array>
): ParsedCanThawPermissionlessInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      authority: getNextAccount(),
      tokenAccount: getNextAccount(),
      mint: getNextAccount(),
      owner: getNextAccount(),
      extraMetas: getNextAccount(),
      listConfig: getNextAccount(),
      abWallet: getNextAccount(),
    },
    data: getCanThawPermissionlessInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}

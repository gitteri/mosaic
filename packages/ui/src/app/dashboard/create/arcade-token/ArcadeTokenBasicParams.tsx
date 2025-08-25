import { EnableSrfc37Toggle } from '@/components/EnableSrfc37Toggle';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArcadeTokenOptions } from '@/types/token';

interface ArcadeTokenBasicParamsProps {
  options: ArcadeTokenOptions;
  onInputChange: (field: string, value: string) => void;
}

export function ArcadeTokenBasicParams({
  options,
  onInputChange,
}: ArcadeTokenBasicParamsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Parameters</CardTitle>
        <CardDescription>
          Configure the fundamental properties of your arcade token
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Token Name *
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., Game Token"
              value={options.name}
              onChange={e => onInputChange('name', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Symbol *</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="e.g., GAME"
              value={options.symbol}
              onChange={e => onInputChange('symbol', e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Decimals *</label>
            <input
              type="number"
              className="w-full p-3 border rounded-lg"
              placeholder="6"
              value={options.decimals}
              onChange={e => onInputChange('decimals', e.target.value)}
              min="0"
              max="9"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Metadata URI
            </label>
            <input
              type="url"
              className="w-full p-3 border rounded-lg"
              placeholder="https://example.com/metadata.json"
              value={options.uri}
              onChange={e => onInputChange('uri', e.target.value)}
            />
          </div>
        </div>

        <EnableSrfc37Toggle
          enabled={options.enableSrfc37}
          setEnabled={value => onInputChange('enableSrfc37', value)}
        />
      </CardContent>
    </Card>
  );
}

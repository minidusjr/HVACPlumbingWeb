/**
 * Converts a hex color ("#0284c7" or "#08c") into space-separated RGB
 * channels ("2 132 199") so Tailwind's `<alpha-value>` opacity modifiers
 * (e.g. `bg-brand-primary/20`) work with config-driven brand colors.
 */
export function hexToRgbChannels(hex: string): string {
  let value = hex.trim().replace(/^#/, '');

  if (value.length === 3) {
    value = value
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    throw new Error(`Invalid hex color in config/data.json theme: "${hex}"`);
  }

  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);

  return `${r} ${g} ${b}`;
}


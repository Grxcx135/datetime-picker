export const variant = [
  'flat',
  'text',
  'elevated',
  'tonal',
  'outlined',
  'plain'
] as const;

type variantType = (typeof variant)[number];

const position = [
  'fixed',
  'relative',
  'static',
  'absolute',
  'sticky'
] as const;

type positionType = (typeof position)[number];

export const props = withDefaults(
  defineProps<{
    defaultDate?: string;
    variantType?: variantType;
    position?: positionType;
    width?: string | number;
    clearable?: boolean;
    color?: string;
    disabled?: boolean;
    height?: string | number;
  }>(),
  {
    variantType: 'outlined',
    width: '200px',
    height: '30px',
    clearable: false,
    disabled: false
  }
);

export const variant = [
  'flat',
  'text',
  'elevated',
  'tonal',
  'outlined',
  'plain'
] as const;
export type variantType = (typeof variant)[number];

export const position = [
  'fixed',
  'relative',
  'static',
  'absolute',
  'sticky'
] as const;
export type positionType = (typeof position)[number];

export interface dateTimeProps {
  defaultDate?: string;
  variantType?: variantType;
  position?: positionType;
  width?: string | number;
  clearable?: boolean;
  color?: string;
  disabled?: boolean;
  height?: string | number;
  dateForm?: string;
  space?: number;
  maxDate?: string;
  minDate?: string;
}

export const defaultDateTimeProps: Required<
  Pick<
    dateTimeProps,
    | 'variantType'
    | 'width'
    | 'height'
    | 'clearable'
    | 'disabled'
    | 'dateForm'
    | 'space'
  >
> = {
  variantType: 'outlined',
  width: '200px',
  height: '30px',
  clearable: false,
  disabled: false,
  dateForm: '/',
  space: 0
};

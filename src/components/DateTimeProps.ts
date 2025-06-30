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

export const rounded = [
  '0',
  'sm',
  'md',
  'lg',
  'xl',
  'pill',
  'circle'
] as const;
export type roundedType = (typeof rounded)[number];
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
  readonly?: boolean;
  borderRadius?: roundedType;
  elevationNumber?: number | string;
  fullWidth?: boolean;
  clickClear?: boolean;
  updateValue?: boolean;
  defaultTime?: string;
  //TODO
  maxTime?: string;
  minTime?: string;
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
    | 'readonly'
    | 'borderRadius'
    | 'elevationNumber'
    | 'updateValue'
    | 'clickClear'
    | 'maxDate'
    | 'minDate'
    | 'maxTime'
    | 'minTime'
  >
> = {
  variantType: 'outlined',
  width: '260px',
  height: '30px',
  clearable: false,
  disabled: false,
  dateForm: '/',
  space: 0,
  readonly: false,
  borderRadius: 'md',
  elevationNumber: 0,
  updateValue: false,
  clickClear: false,
  maxDate: '',
  minDate: '',
  maxTime: '',
  minTime: ''
};

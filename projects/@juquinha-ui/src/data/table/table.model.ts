export interface Header {
  label: string;
  filter?: HeaderFilter[];
}

export interface HeaderFilter {
  inputMode: string;
  property: string;
  value?: any;
  items?: any;
  label?: string;
  placeholder?: string;
  valueKey?: string;
  labelKey?: string;
  multiSelect?: boolean;
}

export interface FilterResult {
  [key: string]: any;
}

import { defaultArgs, formControlArgs } from '../common/stories.args';
import { DropdownComponent } from './dropdown.component';

export default {
  title: 'Forms/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  argTypes: {
    ...formControlArgs,
    items: {
      control: 'array',
      description: 'List of options.',
      type: { name: 'array', required: true },
    },
    labelKey: {
      control: 'text',
      description: 'Key of object to get label of option.',
      type: { name: 'string', required: true },
    },
    valueKey: {
      control: 'text',
      description: 'Key of object to get value of option.',
      type: { name: 'string', required: true },
    },
    showClear: {
      control: 'boolean',
      description:
        'Enable "x" on right side of field to clear when user select any value.',
      type: {
        name: 'boolean',
        required: false,
      },
    },
    multiple: {
      control: 'boolean',
      description: 'User can select multiple valuet.',
      type: {
        name: 'boolean',
        required: false,
      },
    },
    loading: {
      control: 'boolean',
      description: 'Show loading on right side.',
      type: {
        name: 'boolean',
        required: false,
      },
    },
    tooltipTitle: {
      control: 'text',
      description: 'Tooltip title is a small tooltip title when hovering.',
      type: 'string',
    },
    tooltipText: {
      control: 'text',
      description: 'Tooltip text is text that describes an action.',
      type: 'string',
    },
    tooltipIcon: {
      control: 'text',
      description: 'Icon for tooltip.',
      type: 'string',
    },
    tooltipPosition: {
      control: 'text',
      description: 'Position of tooltip.',
      type: 'string',
    },
  },
};

const items = [
  {
    icon: 'bold',
    label: 'Masculino',
    value: 'M',
  },
  {
    label: 'Feminino',
    value: 'F',
  },
  {
    label: 'Não me identifico',
    value: 'N/A',
  },
];

export const defaultDropdown = (args: any) => ({
  component: DropdownComponent,
  props: {
    ...args,
    ...defaultArgs,
    options: items,
    labelKey: 'label',
    valueKey: 'value',
  },
});

export const MultipleSelect = (args: any) => ({
  component: DropdownComponent,
  props: {
    ...args,
    ...defaultArgs,
    controlName: 'example2',
    options: items,
    labelKey: 'label',
    valueKey: 'value',
    multiple: true,
  },
});

export const NumberValueSelect = (args: any) => ({
  component: DropdownComponent,
  props: {
    ...args,
    ...defaultArgs,
    options: [
      {
        label: 'Um',
        value: 1,
      },
      {
        label: 'Dois',
        value: 2,
      },
      {
        label: 'Três',
        value: 3,
      },
    ],
    labelKey: 'label',
    valueKey: 'value',
    multiple: true,
  },
});

export const DisabledState = (args: any) => ({
  component: DropdownComponent,
  props: {
    ...args,
    ...defaultArgs,
    disabled: true,
    items,
    labelKey: 'label',
    valueKey: 'value',
  },
});

export const LoadingState = (args: any) => ({
  component: DropdownComponent,
  props: {
    ...args,
    ...defaultArgs,
    loading: true,
    items: [],
    labelKey: 'label',
    valueKey: 'value',
  },
});

export const EmptyState = (args: any) => ({
  component: DropdownComponent,
  props: {
    ...args,
    ...defaultArgs,
    labelKey: 'label',
    valueKey: 'value',
  },
});

export const withTooltipDropdown = (args: any) => ({
  component: DropdownComponent,
  props: {
    ...args,
    ...defaultArgs,
    labelKey: 'label',
    valueKey: 'value',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
  },
});

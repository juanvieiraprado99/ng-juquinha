import { getIconsName } from '../../icons/icon/icon.data';
import { InputComponent } from './input.component';

export default {
  title: 'Forms/Input',
  component: InputComponent,
  tags: ['autodocs'],
  argTypes: {
    fieldId: {
      control: 'text',
      description: 'Identifier of the field.',
      type: { name: 'string', required: true },
    },
    label: {
      control: 'text',
      description: 'Label text on top of the field.',
      type: { name: 'string', required: true },
    },
    subLabel: {
      control: 'text',
      description: 'Sub label on right of the label.',
      type: { name: 'string', required: false },
    },
    hintText: {
      control: 'text',
      description: 'Hint text on bottom of the field.',
      type: { name: 'string', required: false },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder of the field.',
      type: { name: 'string', required: false },
    },
    iconLeft: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon on left side of field.',
      type: { name: 'string', required: false },
    },
    iconRight: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon on right side of field.',
      type: { name: 'string', required: false },
    },
    disabled: {
      control: 'boolean',
      description:
        'State of the field. When disabled is true, the field is blocked.',
      type: { name: 'boolean', required: false },
    },
    customErrorMessages: {
      control: 'object',
      description: 'Custom error messages for form validation.',
      type: { name: 'object', required: false },
    },
    maxLength: {
      control: 'number',
      description: 'Max length of field.',
      type: { name: 'number', required: false },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'tel', 'email'],
      description: 'Type of input.',
      type: {
        name: 'text',
        required: false,
      },
    },
    typeDelay: {
      control: 'number',
      description: 'Delay to trigger (onTyped) in milliseconds.',
      type: {
        name: 'number',
        required: false,
      },
    },
    enableTypeListener: {
      control: 'boolean',
      description: 'Enable onTyped output function.',
      type: {
        name: 'text',
        required: false,
      },
    },
    mask: {
      control: 'string',
      description:
        'Mask of field. 0*: only numbers, CPF example: 000.000.000-00.',
      type: {
        name: 'string',
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

export const Default = (args: any) => ({
  component: InputComponent,
  props: {
    ...args,
    label: 'Label',
    ariaLabel: 'Aria label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    disabled: false,
    customErrorMessages: {},
    maxLength: 999,
    iconLeft: '',
    iconRight: '',
    type: 'text',
    typeDelay: 1200,
    mask: '',
  },
});

export const MaskedInput = (args: any) => ({
  component: InputComponent,
  props: {
    ...args,
    label: 'Documento',
    subLabel: 'CPF',
    placeholder: '___.___.___-__',
    type: 'text',
    mask: '000.000.000-00',
  },
});

export const InputWithIcons = (args: any) => ({
  component: InputComponent,
  props: {
    ...args,
    label: 'URL',
    subLabel: '',
    hintText: 'Utilize um link com protocolo https',
    iconLeft: 'user',
    placeholder: 'https://',
    type: 'text',
  },
});

export const DisabledState = (args: any) => ({
  component: InputComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sublabel',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    disabled: true,
  },
});

export const withTooltipInput = (args: any) => ({
  component: InputComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sublabel',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
    disabled: false,
  },
});

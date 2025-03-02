import { InputChipsComponent } from './input-chips.component';

const chips = ['Chip 1', 'Chip 2']; // Array de duas strings para testar

export default {
  title: 'Forms/Input Chips',
  component: InputChipsComponent,
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
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'tel', 'email'],
      },
      description: 'Type of input field.',
      type: { name: 'string', required: false },
    },
    mask: {
      control: 'text',
      description:
        'Mask to field. examples:<br/>00/00/0000 - for date, <br/>000.000.000-00 - for CPF, <br/>0* - only numbers.',
      type: { name: 'string', required: true },
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

export const defaultInputChips = (args: any) => ({
  component: InputChipsComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sublabel',
    hintText: 'Hint text',
    type: 'text',
    placeholder: 'Placeholder',
  },
});

export const maskedInputChips = (args: any) => ({
  props: {
    ...args,
    mask: '000.000.000-00',
    value: ['00000000000'],
    label: 'CPF',
    type: 'tel',
    subLabel: 'Documento Pessoal',
    placeholder: '___.___.___-__',
    hintText: 'Você acessará o sistema a partir do CPF',
  },
});

export const disabledInputChips = (args: any) => ({
  props: {
    ...args,
    mask: '000.000.000-00',
    value: ['00000000000'],
    label: 'CPF',
    type: 'tel',
    subLabel: 'Documento Pessoal',
    placeholder: '___.___.___-__',
    disabled: true,
    hintText: 'Você acessará o sistema a partir do CPF',
  },
});
export const withTooltipInputChips = (args: any) => ({
  props: {
    ...args,
    mask: '000.000.000-00',
    value: ['00000000000'],
    label: 'CPF',
    type: 'tel',
    subLabel: 'Documento Pessoal',
    placeholder: '___.___.___-__',
    disabled: false,
    hintText: 'Você acessará o sistema a partir do CPF',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
  },
});

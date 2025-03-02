import { RadioComponent } from './radio.component';

export default {
  title: 'Forms/Radio',
  component: RadioComponent,
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
    options: {
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
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Direction to render options.',
      type: 'string',
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
  component: RadioComponent,
  props: {
    ...args,
  },
});

Default.args = {
  label: 'Faixa etária',
  subLabel: 'Idade',
  hintText: 'Selecione o que melhor se encaixa',
  options: [
    {
      label: 'Menor de idade',
      value: '-18',
    },
    {
      label: 'Adulto (18 - 60)',
      value: '18-60',
    },
    {
      label: 'Idoso (60+)',
      value: '60+',
    },
  ],
  labelKey: 'label',
  valueKey: 'value',
  direction: 'vertical',
};

Default.storyName = 'Default Radio';

export const HorizontalRadio = (args: any) => ({
  component: RadioComponent,
  props: {
    ...args,
    label: 'Gênero',
    subLabel: 'Selecione 1',
    hintText: 'Selecione o seu gênero',
    options: [
      {
        label: 'Masculino',
        value: 'M',
      },
      {
        label: 'Feminino',
        value: 'F',
      },
      {
        label: 'Prefiro não informar',
        value: 'N/A',
      },
    ],
    direction: 'horizontal',
  },
});

export const withTooltipHorizontalRadio = (args: any) => ({
  component: RadioComponent,
  props: {
    ...args,
    label: 'Gênero',
    subLabel: 'Selecione 1',
    hintText: 'Selecione o seu gênero',
    options: [
      {
        label: 'Masculino',
        value: 'M',
      },
      {
        label: 'Feminino',
        value: 'F',
      },
      {
        label: 'Prefiro não informar',
        value: 'N/A',
      },
    ],
    direction: 'vertical',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
  },
});

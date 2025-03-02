import { CheckboxComponent } from './checkbox.component';

export default {
  title: 'Forms/Checkbox',
  component: CheckboxComponent,
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
    ariaLabel: {
      control: 'text',
      description:
        'Aria label for provide a short, concise label for an element that has no visible text content.',
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
  },
};

export const defaultCheckbox = (args: any) => ({
  component: CheckboxComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    disabled: false,
    customErrorMessages: {},
  },
});

export const disabledState = (args: any) => ({
  component: CheckboxComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    disabled: true,
    customErrorMessages: {},
  },
});

export const withToolipCheckbox = (args: any) => ({
  component: CheckboxComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
    disabled: false,
    customErrorMessages: {},
  },
});

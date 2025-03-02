import { getIconsName } from '../../icons/icon/icon.data';
import { DatepickerComponent } from './datepicker.component';

export default {
  title: 'Forms/Datepicker',
  component: DatepickerComponent,
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
    validateDate: {
      control: 'boolean',
      type: 'boolean',
      description:
        'On enabled the field will be validated when user blurs the field',
    },
    minDate: {
      control: 'date',
      description: 'Min date to select',
      type: 'date',
    },
    maxDate: {
      control: 'date',
      description: 'Min date to select',
      type: 'date',
    },
  },
};

export const defaultDatepicker = (args: any) => ({
  component: DatepickerComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    disabled: false,
    type: 'date',
  },
});

export const disabledState = (args: any) => ({
  component: DatepickerComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    disabled: true,
    type: 'date',
  },
});

export const dateTimeDatepicker = (args: any) => ({
  component: DatepickerComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    disabled: false,
    type: 'datetime-local',
  },
});

export const withTooltipDatepicker = (args: any) => ({
  component: DatepickerComponent,
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
    disabled: false,
    type: 'datetime-local',
  },
});

import { getIconsName } from '../../icons/icon/icon.data';
import { FileComponent } from './file.component';

export default {
  title: 'Forms/File',
  component: FileComponent,
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
    accept: {
      control: 'text',
      description:
        'Type of files accepted on field. Accept all types per default.<br/>' +
        'Default accept all type of files<br/>' +
        'Use comma to accept multiple types',
      type: { name: 'string', required: true },
    },
    buttonLabel: {
      control: 'text',
      description: 'Label in add file button.',
      type: { name: 'string', required: true },
    },
    numberOfFiles: {
      control: 'number',
      description: 'Max number of files.<br/>Default is 5 files.',
      type: 'number',
    },
    maxSize: {
      control: 'number',
      description: 'Max size in Mb per file.<br/>Default is 5.0 Mb.',
      type: 'number',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow user select multiple files on file window.',
      type: 'boolean',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Position of files, right or down.',
      type: 'string',
    },
    removable: {
      control: 'boolean',
      description: 'Files can be deleted.',
      type: { name: 'boolean', required: false },
    },
    showAction: {
      control: 'boolean',
      description: 'Show action button',
      type: { name: 'boolean', required: false },
    },
    actionIcon: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon of action button.',
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
  },
};

export const defaultFile = (args: any) => ({
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    disabled: false,
    customErrorMessages: {},
    accept: '**',
    multiple: false,
    maxSize: 5,
    numberOfFiles: 5,
    buttonLabel: 'Adicionar arquivo',
    hintText: 'JPG, PNG, SVG, GIF, MP4 [hintText]',
    removable: true,
    showAction: true,
    actionIcon: 'information-circle',
  },
});

export const withTooltipFile = (args: any) => ({
  props: {
    ...args,
    label: 'Label',
    subLabel: 'Sub label',
    disabled: false,
    customErrorMessages: {},
    accept: '**',
    multiple: false,
    maxSize: 5,
    numberOfFiles: 5,
    buttonLabel: 'Adicionar arquivo',
    hintText: 'JPG, PNG, SVG, GIF, MP4 [hintText]',
    removable: true,
    showAction: true,
    actionIcon: 'information-circle',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
  },
});

import type { Meta, StoryObj } from '@storybook/angular';
import { EditorComponent } from './editor.component';

const meta: Meta<EditorComponent> = {
  title: 'Forms/Editor',
  component: EditorComponent,
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
    },
    maxLength: {
      control: 'number',
      description: 'Max length of field.',
      type: { name: 'number', required: false },
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

export default meta;
type Story = StoryObj<EditorComponent>;

export const defaultEditor: Story = {
  args: {
    label: 'Label',
    subLabel: 'Sublabel',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
  },
};

export const withTooltipEditor: Story = {
  args: {
    label: 'Label',
    subLabel: 'Sublabel',
    hintText: 'Hint text',
    placeholder: 'Placeholder',
    tooltipTitle: 'Title',
    tooltipText: 'Text to tooltip.',
    tooltipIcon: 'select-box',
  },
};

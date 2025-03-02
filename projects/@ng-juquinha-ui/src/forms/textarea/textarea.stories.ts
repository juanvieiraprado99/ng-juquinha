import { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

const meta: Meta<TextareaComponent> = {
  title: 'Forms/Textarea',
  component: TextareaComponent,
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier of the field',
      type: { name: 'string', required: true },
    },
    label: {
      control: 'text',
      description: 'Text of the field label',
      type: { name: 'string', required: true },
    },
    subLabel: {
      control: 'text',
      description: 'Secondary text next to the label',
      type: { name: 'string' },
    },
    hintText: {
      control: 'text',
      description: 'Hint text below the field',
      type: { name: 'string' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text of the field',
      type: { name: 'string' },
    },
    disabled: {
      control: 'boolean',
      description: 'Indicates if the field is disabled',
      type: { name: 'boolean' },
    },
    maxLength: {
      control: 'number',
      description: 'Maximum number of allowed characters',
      type: { name: 'number' },
    },
    tooltipTitle: {
      control: 'text',
      description: 'Tooltip title',
      type: { name: 'string' },
    },
    tooltipText: {
      control: 'text',
      description: 'Tooltip descriptive text',
      type: { name: 'string' },
    },
    tooltipIcon: {
      control: 'text',
      description: 'Tooltip icon',
      type: { name: 'string' },
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Tooltip position',
      type: { name: 'string' },
    },
  },
};

export default meta;
type Story = StoryObj<TextareaComponent>;

export const Default: Story = {
  args: {
    label: 'Mensagem',
    subLabel: 'Opcional',
    hintText: 'Digite sua mensagem aqui',
    placeholder: 'Digite aqui...',
    disabled: false,
    maxLength: 500,
  },
};

export const WithTooltip: Story = {
  args: {
    ...Default.args,
    tooltipTitle: 'Dica',
    tooltipText: 'Este campo aceita formatação markdown',
    tooltipIcon: 'information-circle',
    tooltipPosition: 'top',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithMaxLength: Story = {
  args: {
    ...Default.args,
    maxLength: 100,
    hintText: 'Máximo de 100 caracteres',
  },
};

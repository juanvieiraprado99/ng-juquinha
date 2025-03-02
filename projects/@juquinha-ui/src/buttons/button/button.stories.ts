import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { getIconsName } from '../../icons/icon/icon.data';
import { fn } from '@storybook/test';

const meta: Meta<ButtonComponent> = {
  title: 'Buttons/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Text inside button.',
      type: { name: 'string', required: true },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description:
        'Button type: button - call function | submit - call submit function in form | reset - reset form values.',
      type: { name: 'string', required: true },
    },
    ariaLabel: {
      description: 'Label for accessibility',
      type: 'string',
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description:
        'Styles variants: primary - background color | secondary - Borders and text | tertiary - Only text.',
      type: { name: 'string', required: true },
    },
    theme: {
      control: 'select',
      options: ['default', 'light', 'error'],
      description:
        'Button theme: default - Color of the theme | error - Set semantic error color.',
      type: { name: 'string', required: true },
    },
    iconLeft: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon left side of the field.',
      type: { name: 'string', required: false },
    },
    iconRight: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon right side of the field.',
      type: { name: 'string', required: false },
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small'],
      description: 'Set size of button. Control font and padding sizes.',
      type: { name: 'string', required: true },
    },
    disabled: {
      control: 'boolean',
      description:
        'State of the field. When disabled is true, the field is blocked.',
      type: { name: 'boolean', required: false },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Set width to fill container.',
      type: { name: 'boolean', required: false },
    },
    loading: {
      control: 'boolean',
      description:
        'State of the field. When is true, the field is blocked and loader spinner show on left side.',
      type: { name: 'boolean', required: false },
    },
    confirmPopup: {
      control: 'boolean',
      description: 'Show confirm popup on user click on button.',
      type: { name: 'boolean', required: false },
    },
    confirmMessage: {
      control: 'text',
      description: 'Message in confirm popup.',
      type: { name: 'string', required: false },
    },
    onClick: {
      control: fn(),
      type: 'function',
      description:
        'Triggered when user click on button.<br/>Return void.<br/>Use example: (onClick)="function()"',
    },
    onAccept: {
      control: fn(),
      type: 'function',
      description:
        'Triggered when user click on accept button in confirm dialog popup.<br/>Return void.<br/>Use example: (onAccept)="function()"',
    },
    onReject: {
      control: fn(),
      type: 'function',
      description:
        'Triggered when user click on rejcet button in confirm dialog popup.<br/>Return void.<br/>Use example: (onReject)="function()"',
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const defaultButton: Story = {
  args: {
    label: 'Button',
    type: 'button',
    size: 'large',
    variant: 'primary',
    theme: 'default',
    disabled: false,
    loading: false,
    confirmPopup: false,
    confirmMessage: '',
  },
};

export const confirmMessageButton: Story = {
  args: {
    label: 'Button',
    type: 'button',
    size: 'large',
    variant: 'primary',
    theme: 'default',
    disabled: false,
    loading: false,
    confirmPopup: true,
  },
};

export const smallButton: Story = {
  args: {
    label: 'Button',
    type: 'button',
    size: 'small',
  },
};

export const withIcons: Story = {
  args: {
    label: 'Button',
    iconLeft: 'select-box',
    iconRight: 'select-box',
    confirmPopup: true,
    confirmMessage: 'Você deseja realmente realizar essa ação?',
    disabled: false,
    loading: false,
  },
};

export const secondaryButton: Story = {
  args: {
    label: 'Secondary Button',
    iconLeft: 'select-box',
    iconRight: 'select-box',
    variant: 'secondary',
    confirmPopup: true,
    confirmMessage: 'Você deseja realmente realizar essa ação?',
    disabled: false,
    loading: false,
  },
};

export const tertiaryButton: Story = {
  args: {
    label: 'Tertiary Button',
    iconLeft: 'select-box',
    iconRight: 'select-box',
    variant: 'tertiary',
    confirmPopup: true,
    confirmMessage: 'Você deseja realmente realizar essa ação?',
    disabled: false,
    loading: false,
  },
};

export const errorThemeButton: Story = {
  args: {
    label: 'Error Button',
    iconLeft: 'warning-triangle',
    theme: 'error',
    confirmPopup: true,
    confirmMessage: 'Você deseja realmente realizar essa ação?',
    disabled: false,
    loading: false,
  },
};

export const lightThemeButton: Story = {
  name: 'Light Theme Button [Only primary variant]',
  args: {
    label: 'Light Button',
    iconLeft: 'select-box',
    iconRight: 'select-box',
    theme: 'light',
    variant: 'primary',
  },
};

export const neutralThemeButton: Story = {
  name: 'Neutral Theme Button [Only primary variant]',
  args: {
    label: 'Light Button',
    iconLeft: 'select-box',
    iconRight: 'select-box',
    theme: 'neutral',
  },
};

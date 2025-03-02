import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';
import { getIconsName } from '../../icons/icon/icon.data';

const meta: Meta<DividerComponent> = {
  title: 'Dividers/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  argTypes: {
    style: {
      control: 'select',
      options: ['solid', 'dashed'],
      description: 'Set line style dashed or solid.',
      type: {
        name: 'string',
        required: true,
      },
    },
    text: {
      control: 'text',
      description: 'Text between lines.',
      type: {
        name: 'string',
        required: false,
      },
    },
    textColor: {
      control: 'text',
      description: 'Set text color.',
      type: {
        name: 'string',
        required: false,
      },
    },
    iconColor: {
      control: 'text',
      description: 'Set icon color.',
      type: {
        name: 'string',
        required: false,
      },
    },
    lineColor: {
      control: 'text',
      description: 'Set lines color.',
      type: {
        name: 'string',
        required: false,
      },
    },
    icon: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon between lines.',
      type: {
        name: 'string',
        required: false,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DividerComponent>;

export const defaultDivider: Story = {
  args: {
    style: 'solid',
  },
};

export const dashedDivider: Story = {
  args: {
    style: 'dashed',
  },
};

export const dividerWithText: Story = {
  args: {
    style: 'solid',
    text: 'ou',
  },
};

export const dividerWithIcon: Story = {
  args: {
    style: 'solid',
    icon: 'select-box',
  },
};

export const customColor: Story = {
  args: {
    style: 'solid',
    lineColor: 'red',
    iconColor: 'green',
    icon: 'select-box',
    text: 'Custom color',
    textColor: 'purple',
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { ExampleComponent } from './example.component';

const meta: Meta<ExampleComponent> = {
  title: 'Icons/Icons',
  component: ExampleComponent,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'text',
      description: 'Placeholder of the field.',
      defaultValue: 'black',
      type: { name: 'string', required: false },
    },
    size: {
      control: 'text',
      description: 'Size of the icon.',
      defaultValue: '24px',
      type: { name: 'string', required: false },
    },
    rotateSpeed: {
      control: 'text',
      description: 'Speed of rotation.',
      type: { name: 'string', required: false },
      defaultValue: '1.25s',
    },
    rotate: {
      control: 'boolean',
      description: 'Icon rotating.',
      defaultValue: false,
      type: { name: 'boolean', required: false },
    },
  },
};

export default meta;
type Story = StoryObj<ExampleComponent>;

export const Default: Story = {};

Default.storyName = 'Icons';

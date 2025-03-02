import type { Meta, StoryObj } from '@storybook/angular';
import { ProgressBarComponent } from './progress-bar.component';

const meta: Meta<ProgressBarComponent> = {
  title: 'Progresses/Progress Bar',
  component: ProgressBarComponent,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Progress bar label.',
      type: {
        name: 'string',
        required: false,
      },
    },
    value: {
      control: 'number',
      description: 'Value of progress bar.',
      type: {
        name: 'number',
        required: false,
      },
    },
    maxValue: {
      control: 'number',
      description: 'Max value of progress bar. Default is 100.',
      type: {
        name: 'number',
        required: false,
      },
    },
    overValue: {
      control: 'boolean',
      description: 'Set if value over the maxValue.',
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ProgressBarComponent>;

export const defaultProgressBar: Story = {
  args: {
    label: 'Progress label',
    value: 0,
    maxValue: 100,
    overValue: false,
  },
};

export const maxValueProgressBar: Story = {
  args: {
    label: 'Progress label',
    value: 150,
    maxValue: 100,
    overValue: false,
  },
};

export const progressBarWithLabelAndValue: Story = {
  args: {
    label: 'Progress label',
    value: 70,
  },
};

export const progressBarWithOverValue: Story = {
  args: {
    label: 'Progress label',
    value: 150,
    overValue: true,
  },
};

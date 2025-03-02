import type { Meta, StoryObj } from '@storybook/angular';
import { ExampleComponent } from './example.component';
import { fn } from '@storybook/test';

const meta: Meta<ExampleComponent> = {
  title: 'Data/Paginator',
  component: ExampleComponent,
  tags: ['autodocs'],
  argTypes: {
    page: {
      control: 'number',
      type: { name: 'number', required: true },
      description: 'Current page.',
    },
    totalPages: {
      control: 'number',
      description: 'Total of pages.',
      type: { name: 'number', required: true },
    },
    showPages: {
      control: 'number',
      type: 'number',
      description:
        'Total of page options in component list.<br/>Example with 3: << < 1 2 3 ... 20 > >><br/>Example with 5: << < 1 2 3 4 5 ... 20 > >>',
    },
    onPageChanged: {
      control: fn(),
      type: 'function',
      description:
        'Event triggered when user change page using this component.<br/>Return page selected as $event.<br/> Use example: (onPageChanged)="function($event)"',
    },
  },
};

export default meta;
type Story = StoryObj<ExampleComponent>;

export const defaultPaginator: Story = {
  args: {
    page: 1,
    totalPages: 10,
    showPages: 5,
  },
};

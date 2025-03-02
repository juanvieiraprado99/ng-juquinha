import type { Meta, StoryObj } from '@storybook/angular';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { fn } from '@storybook/test';

const ScrollToTop: Meta<ScrollToTopComponent> = {
  title: 'Overlays/ScrollToTop',
  component: ScrollToTopComponent,
  tags: ['autodocs'],
  argTypes: {
    elementId: {
      description: 'Document element id to scroll into view',
      control: 'text',
      type: 'string',
    },
    onClick: {
      control: fn(),
      description: 'Event triggered on user click in button to scroll',
      type: 'function',
    },
  },
};

export default ScrollToTop;
type Story = StoryObj<ScrollToTopComponent>;

export const defaultScrollToTop: Story = {
  args: {},
};

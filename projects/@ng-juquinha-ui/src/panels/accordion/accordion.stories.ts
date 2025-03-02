import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { getIconsName } from '../../icons/icon/icon.data';
import { fn } from '@storybook/test';

const Accordion: Meta<AccordionComponent> = {
  title: 'Panels/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title text on header of the accordion.',
      type: { name: 'string', required: true },
    },
    icon: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon on left side of the accordion header.',
      type: { name: 'string', required: false },
    },
    active: {
      control: 'boolean',
      description: 'Set status of collapse (expanded or collapsed).',
      type: {
        name: 'boolean',
        required: false,
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Set dimensions of accordion.',
      type: 'string',
    },
    onChangeState: {
      description:
        'Event triggered on user expand or collapse accordion.<br/>Parameter $event is accordion state.<br/>Use exemple (onChangeState)="function($event)"',
      type: 'function',
      control: fn(),
    },
  },
};

export default Accordion;

type Story = StoryObj<AccordionComponent>;

export const defaultAccordion: Story = {
  args: {
    title: 'Accordion',
    icon: 'select-box',
    size: 'medium',
  },
};

export const activatedAccordion: Story = {
  args: {
    title: 'Active true',
    icon: 'select-box',
    active: true,
  },
};

export const smalSizeAccordion: Story = {
  args: {
    title: 'Accordion small size',
    icon: 'select-box',
    size: 'small',
  },
};

export const largeSizeAccordion: Story = {
  args: {
    title: 'Accordion large size',
    icon: 'select-box',
    size: 'large',
  },
};

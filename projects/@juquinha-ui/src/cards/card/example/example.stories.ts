import type { Meta, StoryObj } from '@storybook/angular';
import { ExampleComponent } from './example.component';
import { getIconsName } from '../../../icons/icon/icon.data';
import { fn } from '@storybook/test';

const meta: Meta<ExampleComponent> = {
  title: 'Cards/Card',
  component: ExampleComponent,
  tags: ['autodocs'],
  argTypes: {
    imageSrc: {
      control: 'text',
      description: 'Image src on top of card.',
      type: { name: 'string', required: false },
    },
    imageAlt: {
      control: 'text',
      description: 'Alternative text to image on top of card.',
      type: { name: 'string', required: false },
    },
    icon: {
      control: 'select',
      options: getIconsName(),
      description: 'Icon on top of card.',
      type: { name: 'string', required: false },
    },
    iconSize: {
      control: 'text',
      description: 'Size of icon.',
      type: { name: 'string', required: false },
    },
    iconColor: {
      control: 'text',
      description: 'Color of icon.',
      type: { name: 'string', required: false },
    },
    showBadge: {
      control: 'boolean',
      description: 'Show badge.',
      type: {
        name: 'boolean',
      },
    },
    badgeLabel: {
      control: 'text',
      description: 'Text on badge.',
      type: { name: 'string', required: false },
    },
    badgeColor: {
      control: 'text',
      description: 'Color of badge.',
      type: { name: 'string', required: false },
    },
    badgeTextColor: {
      control: 'text',
      description: 'Color of text on badge.',
      type: { name: 'string', required: false },
    },
    badgeIcon: {
      control: 'select',
      options: getIconsName(),
      description: 'Color of text on badge.',
      type: { name: 'string', required: false },
    },
    title: {
      control: 'text',
      description: 'Title.',
      type: { name: 'string', required: false },
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle.',
      type: { name: 'string', required: false },
    },
    content: {
      control: 'text',
      description: 'Text inside card.',
      type: { name: 'string', required: false },
    },
    totalLines: {
      control: 'number',
      description: 'Max content line lenght.',
      type: { name: 'number', required: false },
    },
    clickable: {
      control: 'boolean',
      description: 'Card is clickable.',
      type: {
        name: 'boolean',
      },
    },
    onClick: {
      control: fn(),
      type: 'function',
      description:
        'Triggered when user click on card.<br/>Return void.<br/>Use example: (onClick)="function()"',
    },
  },
};

export default meta;
type Story = StoryObj<ExampleComponent>;

export const defaultCard: Story = {};

import type { Meta, StoryObj } from '@storybook/angular';
import { ExampleComponent } from './example.component';
import { getIconsName, ICONS } from '../../../icons/icon/icon.data';
import { fn } from '@storybook/test';

const meta: Meta<ExampleComponent> = {
  title: 'Overlays/Modal',
  component: ExampleComponent,
  tags: ['autodocs'],
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Show modal',
      type: {
        name: 'boolean',
      },
    },
    showClose: {
      control: 'boolean',
      description: 'Show close button and prevent escape from esc key',
      type: {
        name: 'boolean',
      },
    },
    size: {
      description: 'Control max width size',
      options: ['small', 'medium', 'large'],
      control: 'select',
      type: 'string',
    },
    headerIcon: {
      options: getIconsName(),
      description: 'Icon on header',
      control: 'select',
      type: 'string',
    },
    headerIconColor: {
      control: 'text',
      type: 'string',
      description: 'Color of icon on header',
    },
    title: {
      description: 'Title on header of modal',
      control: 'text',
      type: 'string',
    },
    subtitle: {
      description: 'Subtitle below title on header of modal',
      control: 'text',
      type: 'string',
    },
    showDivider: {
      type: 'boolean',
      control: 'boolean',
      description: 'Show dividers below header and above footer',
    },
    confirmButtonLabel: {
      description: 'Text inside confirm button',
      control: 'text',
      type: 'string',
    },
    cancelButtonLabel: {
      description: 'Text inside cancel button',
      control: 'text',
      type: 'string',
    },
    footerText: {
      description: 'Text in footer of modal, use it to additional informations',
      control: 'text',
      type: 'string',
    },
    footerLink: {
      description:
        'Link in footer of modal, use it to show terms and conditions',
      control: 'text',
      type: 'string',
    },
    preventEscapeKey: {
      description: 'When is false, on user press ESC KEY, the modal will close',
      control: 'boolean',
      type: 'boolean',
    },
    loading: {
      description: 'Change state of confirm button to loading',
      control: 'boolean',
      type: 'boolean',
    },
    footerMode: {
      control: 'select',
      type: 'string',
      options: [
        'none',
        'default',
        'information',
        'check',
        'link',
        'fullButton',
      ],
      description:
        '<b>None</b>: Show only header and body. All other show confirm and cancel button<br/> ' +
        '<b>Information</b>: Text on footer of modal, use to additional informations. Use footerText input to label<br/> ' +
        '<b>Check</b>: enable checkbox and disable confirm button until the box is marked as true. Use footerText input to label<br/> ' +
        '<b>Link</b>: use to share attachments, terms and conditions links. Use footerText input to label <br/> ' +
        '<b>Full Button</b>: Cancel and Confirm button has 100% width',
    },
    onCloseModal: {
      description: 'Triggered on modal close with escape key or close button',
      type: 'function',
      control: fn(),
    },
    onClickCancel: {
      description: 'Triggered on user click on cancel button',
      type: 'function',
      control: fn(),
    },
    onClickConfirm: {
      description: 'Triggered on user click on confirm button',
      type: 'function',
      control: fn(),
    },
  },
};

export default meta;
type Story = StoryObj<ExampleComponent>;

export const defaultModal: Story = {
  args: {},
};

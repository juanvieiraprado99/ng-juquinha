import type { Meta, StoryObj } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';

const meta: Meta<BreadcrumbComponent> = {
  title: 'Breadcrumbs/Breadcrumb',
  component: BreadcrumbComponent,
  tags: ['autodocs'],
  argTypes: {
    breadcrumbItems: {
      description:
        'List of items in breadcrumb.<br/>Use BreadcrumbItem model imported from "@juquinha-ui".',
    },
    lastIsCurrent: {
      control: 'boolean',
      description: 'Apply activated style on last item of breadcrumb.',
      type: {
        name: 'boolean',
        required: false,
      },
    },
  },
};

export default meta;
type Story = StoryObj<BreadcrumbComponent>;

export const defaultBreadcrumb: Story = {
  args: {
    breadcrumbItems: [
      {
        name: 'Página inicial',
        icon: 'home',
        link: '/',
      },
      {
        name: 'Listagem de usuários',
        link: '/usuarios',
        icon: 'users',
      },
      {
        name: 'Usuário Nº 1',
      },
    ],
    lastIsCurrent: true,
  },
};

export const breadcrumbLastDisabled: Story = {
  args: {
    breadcrumbItems: [
      {
        name: 'Página inicial',
        icon: 'home',
        link: '/',
      },
      {
        name: 'Listagem de usuários',
        link: '/usuarios',
        icon: 'users',
      },
      {
        name: 'Usuário Nº 1',
      },
    ],
    lastIsCurrent: false,
  },
};

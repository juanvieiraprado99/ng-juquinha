import type { Meta, StoryObj } from "@storybook/angular"
import { getIconsName } from "../../icons/icon/icon.data"
import { BadgeComponent } from "./badge.component"

const meta: Meta<BadgeComponent> = {
  title: "Badges and Chips/Badge and Chip",
  component: BadgeComponent,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Text inside badge.",
      type: { name: "string", required: true },
    },
    textColor: {
      control: "text",
      description: "Set color of text and icon.",
      type: { name: "string", required: true },
    },
    color: {
      control: "text",
      description:
        "Color of background when variant is primary, or color of border whe variant is secondary.",
      type: { name: "string", required: true },
    },
    icon: {
      control: "select",
      options: getIconsName(),
      description: "Icon on left of badge.",
      type: { name: "string", required: true },
    },
    iconSize: {
      control: "select",
      options: ["8", "16", "24"],
      description: "Size of icon o left size.",
      type: { name: "string", required: true },
    },
    variant: {
      control: "select",
      options: ["primary", "secondary"],
      description:
        "Variant of badge. Primary is solid color and secondary is outlined.",
      type: { name: "string", required: true },
    },
    removable: {
      control: "boolean",
      description:
        "If true, show remove button on right side, on click, call event (onClickRemove).",
      type: { name: "boolean", required: true },
    },
  },
}

export default meta
type Story = StoryObj<BadgeComponent>

export const badgeDefault: Story = {
  args: {
    textColor: "var(--juquinha-neutral-color-0)",
    color: "var(--juquinha-primary-color)",
    label: "Ativo",
    icon: "",
    iconSize: "16",
    variant: "primary",
    removable: false,
  },
}

export const badgeWithIcon: Story = {
  args: {
    textColor: "var(--juquinha-neutral-color-0)",
    color: "var(--juquinha-primary-color)",
    label: "Ativo",
    icon: "select-box",
    variant: "primary",
  },
}

export const badgeLight: Story = {
  args: {
    textColor: "var(--juquinha-primary-color)",
    color: "var(--juquinha-primary-color-light)",
    label: "Ativo",
  },
}

export const badgeSecondary: Story = {
  args: {
    variant: "secondary",
    textColor: "var(--juquinha-primary-color)",
    color: "var(--juquinha-primary-color)",
    label: "Ativo",
  },
}

export const badgeInactiveExample: Story = {
  args: {
    textColor: "var(--juquinha-error-color)",
    color: "var(--juquinha-error-color-light)",
    label: "Inativo",
  },
}

export const badgeValueOnly: Story = {
  args: {
    label: "0",
    icon: "",
  },
}

export const badgeRemovable: Story = {
  args: {
    label: "Removível",
    textColor: "var(--juquinha-error-color)",
    color: "var(--juquinha-error-color-light)",
    removable: true,
  },
}

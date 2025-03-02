import type { Meta, StoryObj } from "@storybook/angular"
import { AvatarComponent } from "./avatar.component"

const meta: Meta<AvatarComponent> = {
  title: "Avatars/Avatar",
  component: AvatarComponent,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      description:
        "Type of avatar.<br/>Letters: Use to enter first and last name.<br/>Image: load a image by src.<br/>Icon: Use a Juquinha Icon Component to render an icon.",
      options: ["letters", "image", "icon"],
    },
    value: {
      control: "text",
      description: "Name, imageUrl or icon.",
      type: { name: "string", required: true },
    },
    size: {
      control: "select",
      description:
        "Size of avatar component.<br/>Change the circle size and icon size.",
      options: ["large", "medium", "small"],
    },
    backgroundColor: {
      control: "text",
      description:
        "Set background color to circle when type is letters or icon.",
      type: {
        name: "string",
        required: false,
      },
    },
    color: {
      control: "text",
      description: "Set color of letters or icon inside circle.",
      type: {
        name: "string",
        required: false,
      },
    },
  },
}

export default meta
type Story = StoryObj<AvatarComponent>

export const avatar: Story = {
  args: {
    value: "Juquinha",
    type: "letters",
    size: "medium",
  },
}

export const customColorAvatar: Story = {
  args: {
    value: "Juquinha",
    type: "letters",
    size: "medium",
    backgroundColor: "green",
    color: "#000",
  },
}

export const avatarImage: Story = {
  args: {
    type: "image",
    value:
      "https://s2-casavogue.glbimg.com/YKjCtR8d9N62JhaPVBJmR56qVY8=/0x0:4088x2725/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_d72fd4bf0af74c0c89d27a5a226dbbf8/internal_photos/bs/2024/e/l/wRWga5RLC7eiTW31N3xg/melhores-praias-do-brasil-praia-de-lopes-mendes.jpg",
    size: "large",
  },
}

export const avatarIcon: Story = {
  args: {
    type: "icon",
    value: "user",
  },
}

export const customAvatarIconColor: Story = {
  args: {
    type: "icon",
    value: "user",
    color: "#000",
  },
}

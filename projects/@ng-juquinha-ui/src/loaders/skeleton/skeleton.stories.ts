import {
  type Meta,
  type StoryObj,
  componentWrapperDecorator,
} from "@storybook/angular"
import { SkeletonComponent } from "./skeleton.component"

const meta: Meta<SkeletonComponent> = {
  title: "Loaders/Skeleton",
  component: SkeletonComponent,
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "text",
      description: "Skeleton loader width.",
      type: { name: "string", required: false },
    },
    height: {
      control: "text",
      description: "Skeleton loader height.",
      type: { name: "string", required: false },
    },
    borderRadius: {
      control: "text",
      description: "Skeleton border radius.",
      type: { name: "string", required: false },
    },
    backgroundColor: {
      control: "text",
      description: "Color of skeleton loader background",
      type: { name: "string", required: false },
    },
    animationColor: {
      control: "text",
      description: "Animation color of skeleton loader background",
      type: { name: "string", required: false },
    },
    opacity: {
      control: "number",
      description: "Skeleton loader opacity",
      type: { name: "string", required: false },
    },
  },
}

export default meta
type Story = StoryObj<SkeletonComponent>

export const defaultSkeleton: Story = {
  args: {
    width: "100%",
    height: "20px",
    borderRadius: "8px",
    backgroundColor: "var(--juquinha-skeleton-background)",
    animationColor: "var(--juquinha-skeleton-loading-animation-color)",
    opacity: 0.15,
  },
}

export const RoundedSkeleton: Story = {
  args: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
  },
}

export const customWidthSkeleton: Story = {
  args: {
    width: "400px",
    height: "30px",
    borderRadius: "8px",
  },
}

export const squareSkeleton: Story = {
  args: {
    width: "80px",
    height: "80px",
    borderRadius: "8px",
  },
}

export const customColorSkeleton: Story = {
  args: {
    width: "100%",
    height: "30px",
    borderRadius: "8px",
    opacity: 1,
    animationColor: "red",
    backgroundColor: "blue",
  },
}

export const multipleSkeletons: Story = {
  args: {
    width: "400px",
    height: "30px",
    borderRadius: "8px",
  },
  decorators: [
    componentWrapperDecorator(
      story => `
    <div style='display: flex; flex-direction: column; gap: 5px'>
    ${story}
    ${story}
    ${story}
    </div>
  `
    ),
  ],
}

import type { Meta, StoryObj } from "@storybook/angular"
import { ExampleComponent } from "./example.component"

const meta: Meta<ExampleComponent> = {
  title: "Tooltips/Tooltip",
  component: ExampleComponent,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Use TooltipDirective imported from @ng-juquinha/ui and apply in any element to show tooltip on mouse hover.",
      },
    },
  },
  argTypes: {
    tooltipTitle: {
      control: "text",
      description: "Title of tooltip",
      type: "string",
    },
    tooltipText: {
      control: "text",
      description: "Text of tooltip",
      type: "string",
    },
    tooltipIcon: {
      control: "text",
      description: "Icon on left side of content.",
      type: "string",
    },
    tooltipPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Position of tooltip. Options: top, bottom, left and right.",
      type: "string",
    },
  },
}

export default meta
type Story = StoryObj<ExampleComponent>

export const defaultTooltip: Story = {}

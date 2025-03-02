import type { Meta, StoryObj } from "@storybook/angular"
import { ExampleComponent } from "./example.component"

const meta: Meta<ExampleComponent> = {
  title: "Data/Table",
  component: ExampleComponent,
  tags: ["autodocs"],
  argTypes: {
    clickable: {
      control: "boolean",
      description:
        "Only set styles to each line of table, dont have EventEmitter.",
      type: {
        name: "boolean",
        required: true,
      },
    },
    headers: {
      description: "Set headers of table.",
    },
    objectList: {
      description: "[!] ATENTION: Used only for StoryBook documentation.",
    },
  },
}

export default meta
type Story = StoryObj<ExampleComponent>

export const defaultCard: Story = {
  args: {
    clickable: true,
    headers: ["Nome", "Fundado em", "Total de hospedes", "Ações"],
    objectList: [
      {
        value: "Lindoia Hotel",
        object: {
          value: new Date(),
          object: {
            value: "12",
          },
        },
      },
      {
        value: "Bendito Cacao",
        object: {
          value: new Date(2023, 0, 1),
          object: {
            value: "38921",
          },
        },
      },
      {
        value: "Industria de Linhares",
        object: {
          value: new Date(2020, 0, 13),
          object: {
            value: "2381",
          },
        },
      },
    ],
  },
}

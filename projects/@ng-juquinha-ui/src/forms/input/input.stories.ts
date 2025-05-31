import type { Meta, StoryObj } from "@storybook/angular"
import { InputComponent } from "./input.component"

const meta: Meta<InputComponent> = {
  title: "Forms/Input",
  component: InputComponent,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "tel", "number", "email", "search"],
      type: {
        name: "string",
        required: false,
      },
    },
    mask: { control: "text" },
    thousandSeparator: { control: "text" },
    separatorLimit: { control: "text" },
    prefix: { control: "text" },
    suffix: { control: "text" },
    showMaskTyped: { control: "boolean" },
    keepMaskOnValue: { control: "boolean" },
    typeDelay: { control: "number" },
    enableTypeListener: { control: "boolean" },
    label: { control: "text" },
    subLabel: { control: "text" },
    placeholder: { control: "text" },
    hintText: { control: "text" },
    disabled: { control: "boolean" },
    maxLength: { control: "number" },
    iconLeft: { control: "text" },
    iconRight: { control: "text" },
    autocomplete: { control: "text" },
    tooltipTitle: { control: "text" },
    tooltipText: { control: "text" },
    tooltipIcon: { control: "text" },
    tooltipPosition: {
      control: "select",
      options: ["top", "left", "right", "bottom"],
      type: {
        name: "string",
        required: false,
      },
    },
  },
}

export default meta
type Story = StoryObj<InputComponent>

export const Default: Story = {
  args: {
    label: "Nome completo",
    placeholder: "Digite seu nome",
    type: "text",
  },
}

export const Password: Story = {
  args: {
    label: "Senha",
    placeholder: "Digite sua senha",
    type: "password",
    hintText: "Mínimo 8 caracteres",
  },
}

export const Email: Story = {
  args: {
    label: "E-mail",
    placeholder: "seu@email.com",
    type: "email",
    iconLeft: "email",
  },
}

export const Phone: Story = {
  args: {
    label: "Telefone",
    placeholder: "(00) 00000-0000",
    type: "tel",
    mask: "(00) 00000-0000",
    iconLeft: "phone",
  },
}

export const CPF: Story = {
  args: {
    label: "CPF",
    placeholder: "000.000.000-00",
    type: "text",
    mask: "000.000.000-00",
    showMaskTyped: true,
  },
}

export const CNPJ: Story = {
  args: {
    label: "CNPJ",
    placeholder: "00.000.000/0000-00",
    type: "text",
    mask: "00.000.000/0000-00",
    showMaskTyped: true,
  },
}

export const Currency: Story = {
  args: {
    label: "Valor",
    placeholder: "R$ 0,00",
    type: "text",
    mask: "separator.2",
    prefix: "R$ ",
    thousandSeparator: ".",
    separatorLimit: "999999999",
  },
}

export const CurrencyWithKeepMask: Story = {
  args: {
    label: "Valor com máscara mantida",
    placeholder: "R$ 0,00",
    type: "text",
    mask: "separator.2",
    prefix: "R$ ",
    thousandSeparator: ".",
    separatorLimit: "999999999",
    keepMaskOnValue: true,
  },
}

export const Percentage: Story = {
  args: {
    label: "Taxa de juros",
    placeholder: "0,00",
    type: "text",
    mask: "separator.2",
    suffix: " %",
    separatorLimit: "100",
  },
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Date: Story = {
  args: {
    label: "Data de nascimento",
    placeholder: "00/00/0000",
    type: "text",
    mask: "00/00/0000",
    showMaskTyped: true,
    iconLeft: "calendar",
  },
}

export const Search: Story = {
  args: {
    label: "Buscar produtos",
    placeholder: "Digite o nome do produto",
    type: "search",
    iconLeft: "search",
    enableTypeListener: true,
    typeDelay: 300,
  },
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Number: Story = {
  args: {
    label: "Idade",
    placeholder: "0",
    type: "number",
    maxLength: 3,
  },
}

export const WithIcons: Story = {
  args: {
    label: "Usuário",
    placeholder: "Digite seu usuário",
    type: "text",
    iconLeft: "user",
    iconRight: "check",
  },
}

export const WithSubLabel: Story = {
  args: {
    label: "E-mail principal",
    subLabel: "Este será usado para login",
    placeholder: "seu@email.com",
    type: "email",
  },
}

export const WithHintText: Story = {
  args: {
    label: "Senha forte",
    placeholder: "Digite uma senha",
    type: "password",
    hintText: "Deve conter ao menos 8 caracteres, incluindo números e símbolos",
  },
}

export const Disabled: Story = {
  args: {
    label: "Campo desabilitado",
    placeholder: "Campo não editável",
    type: "text",
    disabled: true,
    value: "Valor pré-definido",
  },
}

export const WithMaxLength: Story = {
  args: {
    label: "Comentário",
    placeholder: "Máximo 100 caracteres",
    type: "text",
    maxLength: 100,
    hintText: "Limite de 100 caracteres",
  },
}

export const WithTooltip: Story = {
  args: {
    label: "Código do produto",
    placeholder: "Digite o código",
    type: "text",
    tooltipTitle: "Código do produto",
    tooltipText:
      "Este código é único para cada produto e pode ser encontrado na etiqueta",
    tooltipIcon: "info",
    tooltipPosition: "top",
  },
}

export const WithTypeListener: Story = {
  args: {
    label: "Busca em tempo real",
    placeholder: "Digite para buscar...",
    type: "search",
    enableTypeListener: true,
    typeDelay: 500,
    iconLeft: "search",
    hintText: "A busca será executada após parar de digitar",
  },
}

export const AutocompleteUsername: Story = {
  args: {
    label: "Nome de usuário",
    placeholder: "Digite seu usuário",
    type: "text",
    iconLeft: "user",
  },
}

export const LongContent: Story = {
  args: {
    label: "Campo com conteúdo longo que pode quebrar a linha se necessário",
    subLabel:
      "Este é um sublabel muito longo que serve para testar como o componente se comporta com textos extensos",
    placeholder:
      "Digite um texto muito longo para testar o comportamento do placeholder quando ele ultrapassa o tamanho do campo",
    type: "text",
    hintText:
      "Este texto de dica também é muito longo para verificar como ele se comporta quando possui muitas palavras e precisa quebrar linha",
    tooltipTitle: "Título do tooltip longo",
    tooltipText:
      "Este é um texto de tooltip muito longo que serve para testar como o tooltip se comporta com conteúdo extenso e se ele consegue exibir adequadamente todas as informações",
  },
}

export const AllPasswordStates: Story = {
  args: {
    label: "Senha completa",
    subLabel: "Teste todos os estados do campo de senha",
    placeholder: "Digite sua senha",
    type: "password",
    hintText: "Clique no ícone do olho para mostrar/ocultar",
    tooltipTitle: "Segurança",
    tooltipText: "Use uma senha forte com números, letras e símbolos",
    tooltipIcon: "shield",
  },
}

export const FormExample: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <juquinha-input
          label="Nome completo"
          placeholder="Seu nome"
          type="text"
          iconLeft="select-box"
          required="true">
        </juquinha-input>

        <juquinha-input
          label="E-mail"
          placeholder="seu@email.com"
          type="email"
          iconLeft="select-box"
          required="true">
        </juquinha-input>

        <juquinha-input
          label="Telefone"
          placeholder="(00) 00000-0000"
          type="tel"
          mask="(00) 00000-0000"
          iconLeft="select-box">
        </juquinha-input>

        <juquinha-input
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          hintText="Mínimo 8 caracteres"
          required="true">
        </juquinha-input>

        <juquinha-input
          label="Confirmar senha"
          placeholder="Digite novamente"
          type="password"
          required="true">
        </juquinha-input>
      </div>
    `,
  }),
}

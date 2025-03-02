import { EditorCommand } from './editor.model';

export const EDITOR_COMMANDS: EditorCommand[] = [
  {
    icon: 'bold',
    name: 'bold',
    description: 'Negrito',
  },
  {
    icon: 'italic',
    name: 'italic',
    description: 'Itálico',
  },
  {
    icon: 'underline',
    name: 'underline',
    description: 'Underline',
  },
  {
    icon: 'justify-left',
    name: 'justifyLeft',
    description: 'Alinhar à esquerda',
  },
  {
    icon: 'justify-center',
    name: 'justifyCenter',
    description: 'Centralizar',
  },
  {
    icon: 'justify-right',
    name: 'justifyRight',
    description: 'Alinhar à direita',
  },
  {
    icon: 'justify',
    name: 'justifyFull',
    description: 'Justificado',
  },
  {
    icon: 'outdent',
    name: 'outdent',
    description: 'Remover recuo',
  },
  {
    icon: 'indent',
    name: 'indent',
    description: 'Adicionar recuo',
  },
  {
    icon: 'unordered-list',
    name: 'insertunorderedlist',
    description: 'Lista',
  },
  {
    icon: 'ordered-list',
    name: 'insertorderedlist',
    description: 'Lista ordenada',
  },
  {
    icon: 'horizontal-link',
    name: 'link',
    description: 'Adicionar link',
  },
  {
    icon: 'previous',
    name: 'undo',
    description: 'Desfazer alterações',
  },
  {
    icon: 'next',
    name: 'redo',
    description: 'Refazer alterações',
  },
];

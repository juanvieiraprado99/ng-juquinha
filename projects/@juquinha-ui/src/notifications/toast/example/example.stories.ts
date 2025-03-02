import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  applicationConfig,
} from '@storybook/angular';
import { ExampleComponent } from './example.component';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<ExampleComponent> = {
  title: 'Toast/Toast',
  component: ExampleComponent,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component:
          "This component works on the basis of a service, to use it:<br/>Add <juquinha-toast /> into app.component.html<br/>Inject the ToastService service into your component and call the add() function passing as a parameter an object called ToastMessage imported from '@juquinha/ui'.<br/>Alarm severity levels are the same as the trigger button names below.<br/><br/>Este componente funciona com base em um serviço, para utilizá-lo:<br/>Adicione <juquinha-toast /> em app.component.html<br/>Injete o serviço ToastService em seu componente e chame a função add() passando como parâmetro um objeto chamado ToastMessage importado de '@juquinha/ui'.<br/>Os níveis de gravidade do alarme são iguais aos nomes dos botões de acionamento abaixo.",
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [],
    }),
  ],
};

export default meta;
type Story = StoryObj<ExampleComponent>;

export const toastGeneric: Story = {
  args: {},
};

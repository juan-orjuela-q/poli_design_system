import { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';

const meta: Meta<ModalComponent> = {
  title: 'Componentes/Modal',
  component: ModalComponent,
  tags: ['autodocs'],
  argTypes: {
    /* Mapea los EventEmitter a acciones de Storybook */
    primary:   { action: 'primary clicked' },
    secondary: { action: 'secondary clicked' },
    closed:    { action: 'modal closed' },
  },
  parameters: {
    docs: {
        
      description: {
        component: `
Diálogo modal que bloquea la interacción con el fondo y muestra un título,
cuerpo de texto y botones de acción.

#### Buenas prácticas

- Mantener solo **un modal** activo a la vez.  
- Usar \`title\` claro y mensajes concisos; proyectar contenido complejo con
  \`[modal-text]\`.  
- Cerrar el modal al hacer clic en el backdrop para una UX intuitiva.  
- Escuchar los eventos \`primary\`, \`secondary\` y \`closed\` para la lógica
  de tu página.
        `.trim(),
      },
    },
  },
};
export default meta;
type Story = StoryObj<ModalComponent>;

/* ----------------------------- Historias ----------------------------- */

/** Modal simple con texto plano */
export const TextoPlano: Story = {
  args: {
    visible: true,
    title: 'Confirmar acción',
    text: '¿Estás seguro de continuar?',
    primaryButtonText: 'Aceptar',
    secondaryButtonText: 'Cancelar',
  },
  parameters: {
    docs: {
      iframeHeight: 380,
    },
  },
};

/** Modal con contenido proyectado */
export const ContenidoProyectado: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-modal
        [visible]="visible"
        [title]="title"
        [primaryButtonText]="primaryButtonText"
        [secondaryButtonText]="secondaryButtonText"
        (primary)="primary($event)"
        (secondary)="secondary($event)"
        (closed)="closed($event)"
      >
        <div modal-text>
          <p>Este contenido se proyecta dentro del modal.</p>
          <ul>
            <li>Punto 1</li>
            <li>Punto 2</li>
          </ul>
        </div>
      </app-modal>
    `,
  }),
  args: {
    visible: true,
    title: 'Detalles adicionales',
    primaryButtonText: 'Entendido',
    secondaryButtonText: 'Cerrar',
  },
};

/** Modal solo con botón primario */
export const SoloPrimario: Story = {
  args: {
    visible: true,
    title: 'Mensaje',
    text: 'Este modal solo tiene acción primaria.',
    primaryButtonText: 'Ok',
  },
};

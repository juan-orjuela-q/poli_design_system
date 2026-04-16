import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';
import { IconComponent } from '../icon/icon.component'; // Ajusta la ruta si es necesario
import { CommonModule } from '@angular/common';

const meta: Meta<AvatarComponent> = {
  title: 'Componentes/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        IconComponent,
      ],
    }),
  ],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['image', 'placeholder', 'letter'],
    },
    size: {
      control: { type: 'select' },
      options: ['2xl', 'xl', 'large', 'medium', 'small', 'xs'],
    },
    src: { control: 'text' },
    letter: { control: 'text' },
    notification: { control: 'number' }, // Puede ser boolean o número, aquí dejamos number por defecto
    status: {
      control: { type: 'select' },
      options: ['online', 'away', 'busy', null],
    },
  },
  args: {
    type: 'image',
    size: 'medium',
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    letter: 'A',
    notification: false,
    status: null,
  }
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Image: Story = {
  args: {
    type: 'image',
    src: 'https://randomuser.me/api/portraits/men/32.jpg',
    size: 'large',
    notification: false,
    status: null,
  },
};

export const Placeholder: Story = {
  args: {
    type: 'placeholder',
    size: 'large',
    notification: true,
    status: null,
  },
};

export const Letter: Story = {
  args: {
    type: 'letter',
    letter: 'J',
    size: 'xl',
    notification: false,
    status: null,
  },
};

export const ImageWithNotification: Story = {
  args: {
    type: 'image',
    src: 'https://randomuser.me/api/portraits/women/44.jpg',
    size: '2xl',
    notification: 3, // En 2xl puede mostrar el número
    status: null,
  },
};

export const LetterWithStatus: Story = {
  args: {
    type: 'letter',
    letter: 'C',
    size: 'large',
    notification: false,
    status: 'online',
  },
};

import { Meta, StoryObj, applicationConfig } from '@storybook/angular';
import { provideRouter } from '@angular/router';

import { SidenavComponent, SidenavItem } from './sidenav.component';
import { IconComponent } from '../icon/icon.component'; // corrige la ruta

/* ---------- Configuración global del story ---------- */
const meta: Meta<SidenavComponent> = {
  title: 'DS v1 (Legacy)/Sidenav',
  component: SidenavComponent,

  /* ⬇️  Aquí van los *EnvironmentProviders* */
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],   // ✅ ya no explota en NgModule
    }),
  ],

  /* ⬇️  Stand-alone components o NgModules que exige la historia */
  //imports: [IconComponent],

  parameters: {
    layout: 'fullscreen',
  },

  argTypes: {
    headerIcon: { control: 'text' },
    headerBadgeStatus: { 
      control: 'select', 
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
    },
    title: { control: 'text' },
    collapsed: { control: 'boolean' },
  },

  args: {
    headerIcon: 'description',
    headerBadgeStatus: 'warning',
    title: 'Gestión administrativa',
    items: [
      { icon: 'build',       label: 'Acciones',   route: '/acciones' },
      { icon: 'badge',       label: 'Roles',      route: '/roles' },
      { icon: 'dashboard',   label: 'Dashboard',  route: '/dashboard' },
      { icon: 'groups',      label: 'Grupos',     route: '/grupos' },
      { icon: 'description', label: 'Documentos', route: '/documentos' },
    ] as SidenavItem[],
  },
};

export default meta;

/* ---------- Historias ---------- */
type Story = StoryObj<SidenavComponent>;

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `
      <app-sidenav
        [headerIcon]="headerIcon"
        [headerBadgeStatus]="headerBadgeStatus"
        [title]="title"
        [items]="items"
        [collapsed]="collapsed"
      >
        <ng-container sidenav-footer>
          <a href="#" routerLink="/">Política de privacidad</a><br>
          <a href="#" routerLink="/">Términos y condiciones</a>
        </ng-container>
      </app-sidenav>
    `,
  }),
};

export const Default:   Story = { ...Template };
export const Collapsed: Story = { ...Template, args: { collapsed: true } };

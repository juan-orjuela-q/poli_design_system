import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import {
  PdsAvatarButtonComponent,
  PdsBreadcrumbComponent,
  PdsPaginatorComponent,
  PdsStepperCompactComponent,
  PdsTabsComponent,
} from '@poli/components';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [
    PdsTabsComponent,
    PdsBreadcrumbComponent,
    PdsPaginatorComponent,
    PdsStepperCompactComponent,
    PdsAvatarButtonComponent,
  ],
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavegacionComponent {
  // Tabs
  protected readonly tabs = [
    { id: 'resumen', label: 'Resumen' },
    { id: 'detalle', label: 'Detalle' },
    { id: 'historial', label: 'Historial' },
    { id: 'docs', label: 'Documentos' },
    { id: 'config', label: 'Configuración', disabled: true },
  ];
  protected readonly activeTab = signal('resumen');

  // Tabs con íconos
  protected readonly tabsWithIcons = [
    { id: 'home', label: 'Inicio', icon: 'home' },
    { id: 'profile', label: 'Perfil', icon: 'person' },
    { id: 'settings', label: 'Ajustes', icon: 'settings' },
  ];
  protected readonly activeTabIcon = signal('home');

  // Breadcrumb
  protected readonly breadcrumbItems = [
    { label: 'Inicio', link: '/home' },
    { label: 'Showcase', link: '/showcase' },
    { label: 'Navegación' },
  ];

  // Paginator
  protected readonly currentPage = signal(1);

  // Stepper compact
  protected readonly steps = [
    { label: 'Datos personales', id: 'personal' },
    { label: 'Información académica', id: 'academica' },
    { label: 'Documentos', id: 'documentos' },
    { label: 'Confirmación', id: 'confirmacion' },
  ];
  protected readonly stepperIndex = signal(1);

  // Avatar buttons
  protected readonly avatarVariants = [
    { name: 'Ana García', type: 'letter' as const, role: 'Estudiante' },
    { name: 'Carlos Pérez', type: 'letter' as const, role: 'Docente', showBadge: true },
    { name: 'Bot Sistema', type: 'icon' as const, role: 'Administrador' },
  ];
}

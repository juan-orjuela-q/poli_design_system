/**
 * Configuración centralizada de navegación del Portal Colaborador
 * 
 * Este archivo centraliza toda la configuración visual y funcional
 * de la navegación, eliminando valores hardcodeados dispersos en componentes.
 * 
 * Para adaptar a un nuevo proyecto:
 * 1. Modifica las rutas en `routes`
 * 2. Actualiza los assets en `branding`
 * 3. Ajusta los badges en `badges`
 * 4. Personaliza los layouts en `layouts`
 */

/**
 * Configuración de rutas principales del aplicativo
 */
export const NAVIGATION_ROUTES = {
  /** Ruta del dashboard principal */
  dashboard: '/main',
  
  /** Ruta base de las páginas internas */
  pages: '/pages',
  
  /** Ruta de login */
  login: '/auth/login',
  
  /** Ruta después de logout */
  afterLogout: '/auth/login'
} as const;

/**
 * Configuración de branding (logos, nombres, etc.)
 */
export const NAVIGATION_BRANDING = {
  /** Nombre del portal institucional */
  portalName: 'Portal del Colaborador',
  
  /** Nombre corto para espacios reducidos */
  portalShortName: 'Portal',
  
  /** Logo principal del portal */
  portalLogo: 'assets/images/logo-poli-portal.png',
  
  /** Logo alternativo (si aplica) */
  portalLogoAlt: 'Logo del Portal Institucional',
  
  /** Favicon del sitio */
  favicon: 'favicon.ico'
} as const;

/**
 * Configuración de badges para navegación
 */
export const NAVIGATION_BADGES = {
  /** Badge del portal en breadcrumb */
  portal: {
    status: 'warning' as const,
    icon: 'badge',
    text: 'Portal'
  },
  
  /** Badge por defecto de aplicaciones */
  application: {
    status: 'info' as const,
    icon: 'apps'
  }
} as const;

/**
 * Configuración de layouts y su comportamiento
 */
export const NAVIGATION_LAYOUTS = {
  /** Configuración para TopbarLayout (/main) */
  topbar: {
    /** Mostrar botón de menú en mobile */
    showMenu: false,
    
    /** Fuente del menú */
    menuSource: 'static' as const,
    
    /** Mostrar breadcrumb */
    showBreadcrumb: false,
    
    /** Título del documento */
    documentTitle: 'Portal del Colaborador'
  },
  
  /** Configuración para PagesLayout (/pages/*) */
  pages: {
    /** Mostrar botón de menú en mobile */
    showMenu: true,
    
    /** Fuente del menú */
    menuSource: 'dynamic' as const,
    
    /** Mostrar breadcrumb */
    showBreadcrumb: true,
    
    /** Formato del breadcrumb */
    breadcrumbFormat: 'portal > app' as const
  }
} as const;

/**
 * Configuración de breakpoints responsive
 */
export const NAVIGATION_BREAKPOINTS = {
  /** Breakpoint para mobile/desktop */
  mobileMaxWidth: 1024, // px
  
  /** Breakpoint para tablet */
  tabletMaxWidth: 768, // px
  
  /** Query para desktop */
  desktopQuery: '(min-width: 1025px)',
  
  /** Query para mobile */
  mobileQuery: '(max-width: 1024px)'
} as const;

/**
 * Configuración del sidebar
 */
export const NAVIGATION_SIDEBAR = {
  /** Ancho del sidebar en píxeles */
  width: 240,
  
  /** Ancho del sidebar colapsado */
  collapsedWidth: 60,
  
  /** Mostrar footer en el sidebar */
  showFooter: true,
  
  /** Permitir colapsar sidebar */
  allowCollapse: true,
  
  /** Estado inicial (colapsado o expandido) */
  initialCollapsed: false
} as const;

/**
 * Configuración del header mobile
 */
export const NAVIGATION_MOBILE_HEADER = {
  /** Altura de la barra superior (logo + avatar) */
  topBarHeight: 70, // px
  
  /** Altura de la barra de breadcrumb */
  breadcrumbBarHeight: 40, // px
  
  /** Altura total del header */
  totalHeight: 110, // px
  
  /** Z-index del header */
  zIndex: 100,
  
  /** Animación de apertura del menú (ms) */
  menuAnimationDuration: 300
} as const;

/**
 * Configuración de iconos por defecto
 */
export const NAVIGATION_ICONS = {
  /** Icono por defecto para items sin icono */
  defaultMenuItem: 'folder',
  
  /** Icono por defecto para subitems */
  defaultSubMenuItem: 'arrow_right',
  
  /** Icono del portal */
  portal: 'home',
  
  /** Icono de aplicación genérica */
  application: 'apps',
  
  /** Icono de menú hamburguesa */
  menu: 'menu',
  
  /** Icono de cerrar */
  close: 'close',
  
  /** Icono de logout */
  logout: 'logout',
  
  /** Icono de usuario */
  user: 'person'
} as const;

/**
 * Configuración de textos UI
 */
export const NAVIGATION_LABELS = {
  /** Textos para el modal de usuario */
  userModal: {
    title: 'Información de usuario',
    emailLabel: 'Correo electrónico',
    roleLabel: 'Rol',
    ouLabel: 'Unidad Organizacional',
    logoutButton: 'Cerrar sesión'
  },
  
  /** Textos para el breadcrumb */
  breadcrumb: {
    separator: '>',
    portalLabel: 'Portal del colaborador'
  },
  
  /** Textos para el sidebar */
  sidebar: {
    collapseTooltip: 'Colapsar menú',
    expandTooltip: 'Expandir menú'
  },
  
  /** Mensajes de error */
  errors: {
    noMenu: 'No hay menú disponible',
    noProcess: 'No se ha seleccionado una aplicación',
    loadError: 'Error al cargar la navegación'
  }
} as const;

/**
 * Configuración de storage (localStorage)
 */
export const NAVIGATION_STORAGE = {
  /** Claves de localStorage */
  keys: {
    portal: 'PORTAL',
    process: 'PROCESS',
    sidebarCollapsed: 'SIDEBAR_COLLAPSED'
  },
  
  /** Usar encriptación para datos sensibles */
  useEncryption: true
} as const;

/**
 * Tipo helper para obtener tipos de las configuraciones
 */
export type NavigationConfig = {
  routes: typeof NAVIGATION_ROUTES;
  branding: typeof NAVIGATION_BRANDING;
  badges: typeof NAVIGATION_BADGES;
  layouts: typeof NAVIGATION_LAYOUTS;
  breakpoints: typeof NAVIGATION_BREAKPOINTS;
  sidebar: typeof NAVIGATION_SIDEBAR;
  mobileHeader: typeof NAVIGATION_MOBILE_HEADER;
  icons: typeof NAVIGATION_ICONS;
  labels: typeof NAVIGATION_LABELS;
  storage: typeof NAVIGATION_STORAGE;
};

/**
 * Exportación de configuración completa
 */
export const NAVIGATION_CONFIG: NavigationConfig = {
  routes: NAVIGATION_ROUTES,
  branding: NAVIGATION_BRANDING,
  badges: NAVIGATION_BADGES,
  layouts: NAVIGATION_LAYOUTS,
  breakpoints: NAVIGATION_BREAKPOINTS,
  sidebar: NAVIGATION_SIDEBAR,
  mobileHeader: NAVIGATION_MOBILE_HEADER,
  icons: NAVIGATION_ICONS,
  labels: NAVIGATION_LABELS,
  storage: NAVIGATION_STORAGE
} as const;

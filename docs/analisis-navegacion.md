# Análisis del Sistema de Navegación del Portal Colaborador

## 📋 Resumen Ejecutivo

Este documento identifica todos los componentes, layouts y páginas involucrados en la navegación del aplicativo, tanto en versión escritorio como mobile, con el objetivo de identificar oportunidades de mejora para facilitar la implementación en nuevos proyectos.

---

## 🏗️ Arquitectura de Navegación

### **1. LAYOUTS PRINCIPALES**

#### 1.1 `TopbarLayoutComponent` (/main)
**Ubicación:** `src/app/layout/screens/topbar-layout/`

**Propósito:** Layout para la página principal del portal (dashboard)

**Componentes de Navegación:**
- **Desktop:** `PageHeaderCustomComponent`
- **Mobile:** `MobileNavPortalsComponent` (sin menú, solo header + avatar)

**Características:**
- Carga menú desde `SYSTEM_ROUTES` (constante estática)
- Usa `ValidatePermissionsHelPer` para construir menú con permisos
- Carga información del portal desde `MainService.getPortal()`
- Muestra modales de "Novedades" y "Ayuda"
- **No muestra botón de menú en mobile** (`showMenu="false"`)

**Dependencias:**
- `AuthService`: Obtener nombre de usuario
- `MainService`: Obtener datos del portal
- `ValidatePermissionsHelPer`: Construir menú con permisos

---

#### 1.2 `PagesLayoutComponent` (/pages/*)
**Ubicación:** `src/app/layout/screens/pages-layout/`

**Propósito:** Layout para todas las páginas internas del aplicativo

**Estructura HTML:**
```html
<app-page-header-custom></app-page-header-custom>
<section class="sidenav-main-container">
  <app-page-sidebar></app-page-sidebar>
  <app-page-content>
    <router-outlet></router-outlet>
  </app-page-content>
</section>
```

**Componentes de Navegación:**
- **Desktop:** `PageSidebarComponent` → `SidenavComponent`
- **Mobile:** `PageSidebarComponent` → `MobileNavPortalsComponent` (con menú completo)
- **Header:** `PageHeaderCustomComponent` (común para ambos)

**Características:**
- Layout más completo con sidebar persistente
- Carga menú **dinámico** desde el proceso guardado en localStorage
- Muestra breadcrumb en mobile (Portal > Aplicación)

---

### **2. COMPONENTES DE NAVEGACIÓN**

#### 2.1 **PageHeaderCustomComponent** (Desktop - Header Superior)
**Ubicación:** `src/app/shared/components/header/` + `src/app/layout/components/page-header-custom/`

**Responsabilidades:**
- Mostrar logo del portal (clickeable, navega a /main)
- Mostrar nombre y rol del usuario
- Avatar clickeable que abre `RightModalComponent` con:
  - Información de usuario (correo, unidad organizacional, rol)
  - Botón de cerrar sesión
- Parsear DN (Distinguished Name) del usuario

**Tecnología:**
- Usa `signal()` para controlar estado del modal
- Integra `HeaderComponent` base del sistema de diseño
- Usa `TabsComponent`, `BadgeComponent`, `AvatarComponent`, `ButtonComponent`

**Datos que obtiene:**
- `AuthService.getUser()`: Nombre, username, DN
- Parsea el DN para extraer rol y unidad organizacional

---

#### 2.2 **PageSidebarComponent** (Contenedor de Navegación Lateral)
**Ubicación:** `src/app/layout/components/page-sidebar/`

**Responsabilidades:**
- Actúa como **wrapper** que decide qué componente de navegación mostrar
- **Desktop (>1025px):** Muestra `SidenavComponent`
- **Mobile (<1025px):** Muestra `MobileNavPortalsComponent`
- Carga menú **dinámico** desde `MainService.getProcess()`
- Escucha cambios de ruta (`NavigationEnd`) para recargar menú

**Lógica de Construcción del Menú:**
```typescript
private loadProcessMenu(): void {
  const process = this._MainService.getProcess();
  
  this.sidebarMenu = process.menus.map(menu => ({
    label: menu.title,
    route: menu.route,
    icon: menu.icon || 'folder',
    moduleKey: menu.windowTitle,
    children: menu.subMenus?.map(subMenu => ({
      label: subMenu.title,
      route: subMenu.route,
      icon: subMenu.icon || 'arrow_right',
      moduleKey: subMenu.windowTitle,
    }))
  }));
}
```

**Datos que expone via getters:**
- `userName`: Nombre del usuario actual
- `processName`: Nombre del proceso/aplicación actual
- `processIcon`: Icono del proceso
- `parentPortalName`: Nombre del portal padre (para breadcrumb)
- `parentPortalIcon`: Icono del portal padre

**Dependencias:**
- `MainService`: Obtener proceso guardado en localStorage
- `AuthService`: Obtener datos de usuario

---

#### 2.3 **SidenavComponent** (Navegación Desktop)
**Ubicación:** `src/app/shared/components/sidenav/`

**Características:**
- Sidebar vertical fijo en desktop
- Muestra badge con icono y título del proceso
- Lista de items con soporte para submenús expandibles
- Usa `MatExpansionModule` para acordeones
- Integra `PageFooterComponent` en la parte inferior
- Control de colapso de menú
- Manejo de estado de items abiertos/cerrados

**Inputs:**
- `headerIcon`: Icono para el badge del header
- `headerBadgeStatus`: Color/estado del badge
- `title`: Texto principal (nombre del proceso)
- `items`: Array de `RouteDefinition[]`
- `collapsedMenu`: Estado colapsado/expandido

**Tecnología:**
- `RouterLink`, `RouterLinkActive` para navegación
- `IconComponent`, `BadgeComponent` del sistema de diseño
- Material Design: `MatExpansionModule`, `MatIconModule`, `MatListModule`

---

#### 2.4 **MobileNavPortalsComponent** (Navegación Mobile)
**Ubicación:** `src/app/shared/components/mobile-nav-portals/`

**Características:**
- **Barra 1 (top-bar):** Logo + Avatar + Botón de menú toggle
- **Barra 2 (app-bar):** Breadcrumb con badges (Portal > Aplicación)
- **Panel lateral deslizante:** Overlay + navegación
- Avatar clickeable que abre `RightModalComponent`
- Cierre automático del menú al navegar (escucha `NavigationEnd`)
- Soporte para mostrar/ocultar menú via `@Input() showMenu`

**Inputs:**
- `portalLogoSrc`: Logo del portal institucional (requerido)
- `userName`: Nombre de usuario para avatar
- `appIcon`: Icono del aplicativo actual
- `appName`: Nombre del aplicativo (requerido)
- `appBadgeStatus`: Color del badge del aplicativo
- `parentBadgeText`: Texto del badge padre (opcional)
- `parentBadgeIcon`: Icono del badge padre
- `parentBadgeStatus`: Color del badge padre
- `parentBadgeRoute`: Ruta al hacer click en badge padre
- `menuItems`: Items del menú (requerido)
- `footerLinks`: Links complementarios en el footer
- `showMenu`: Controla si se muestra el botón de menú y panel (default: true)

**Estados:**
- `isOpen`: Signal para controlar apertura del panel
- `rightModalOpen`: Signal para modal de usuario

**Funcionalidad del Modal de Usuario:**
- Muestra correo electrónico
- Muestra unidad organizacional
- Muestra rol
- Botón de cerrar sesión
- Parsea DN igual que `PageHeaderCustomComponent`

**Tecnología:**
- Signals para gestión de estado reactiva
- `RouterLink`, `NavigationEnd` para navegación
- `HeaderNavItemComponent` para items de menú
- `RightModalComponent`, `TabsComponent`, `BadgeComponent`, `AvatarComponent`, `ButtonComponent`

---

#### 2.5 **MobileNavComponent** (Navegación Mobile - Legacy/Alternativa)
**Ubicación:** `src/app/shared/components/mobile-nav/`

**Estado:** Parece ser un componente más genérico, menos usado actualmente

**Características:**
- Similar a `MobileNavPortalsComponent` pero más simple
- No tiene lógica de breadcrumb
- No tiene modal de usuario integrado
- Usado en `TopbarLayoutComponent` (pero no activo en mobile debido a media queries)

---

#### 2.6 **HeaderNavItemComponent** (Item de Menú)
**Ubicación:** `src/app/shared/components/header-nav-item/`

**Propósito:** Componente reutilizable para items de menú con soporte para submenús

**Características:**
- Soporta navegación simple y con children
- Manejo de estado activo
- Expandible/colapsable para submenús
- Usado tanto en `SidenavComponent` como en `MobileNavPortalsComponent`

---

### **3. FLUJO DE DATOS**

#### 3.1 Fuentes de Datos para Navegación

**A. Menú Estático (SYSTEM_ROUTES)**
- **Ubicación:** `src/app/core/constants/system-paths.ts`
- **Usado en:** `TopbarLayoutComponent` (/main)
- **Procesado por:** `ValidatePermissionsHelPer.buildMenuFromRoutes()`
- **Ventaja:** Control centralizado de rutas del sistema
- **Desventaja:** Requiere recompilación para cambios

**B. Menú Dinámico (Process)**
- **Fuente:** API → `MainService.getProcess()`
- **Almacenado en:** `localStorage` (encriptado via `CryptoService`)
- **Usado en:** `PageSidebarComponent` (/pages/*)
- **Estructura:**
```typescript
interface Process {
  name: string;
  icon: string;
  menus: Menu[];
}

interface Menu {
  title: string;
  route: string;
  icon: string;
  windowTitle: string;
  subMenus?: SubMenu[];
}
```
- **Ventaja:** Configuración dinámica desde backend
- **Desventaja:** Dependencia de API y localStorage

**C. Información del Portal**
- **Fuente:** API → `MainService.getPortal()`
- **Endpoint:** `GET /Portals/code/{portalCode}`
- **Almacenado en:** `localStorage` (encriptado)
- **Usado en:** Badge del portal, nombre del portal en header

**D. Información del Usuario**
- **Fuente:** `AuthService.getUser()`
- **Datos disponibles:**
  - `account.name`: Nombre completo
  - `account.username`: Email/username
  - `account.idTokenClaims.DN`: Distinguished Name (contiene rol y unidad)

---

#### 3.2 Flujo de Navegación

```
Usuario accede a la app
    ↓
Autenticación (MSAL)
    ↓
Carga datos iniciales:
  - Portal: MainService.getPortal() → localStorage
  - Usuario: AuthService.getUser()
    ↓
Navega a /main (TopbarLayoutComponent)
  - Desktop: PageHeaderCustomComponent + contenido
  - Mobile: MobileNavPortalsComponent (sin menú)
  - Menú: SYSTEM_ROUTES (estático)
    ↓
Usuario selecciona un proceso/aplicación
  - Guarda proceso en localStorage vía MainService.setProcess()
    ↓
Navega a /pages/* (PagesLayoutComponent)
  - Desktop: PageHeaderCustomComponent + PageSidebarComponent → SidenavComponent
  - Mobile: PageHeaderCustomComponent + MobileNavPortalsComponent (con menú)
  - Menú: process.menus (dinámico desde localStorage)
    ↓
Usuario navega entre páginas
  - Desktop: Click en SidenavComponent
  - Mobile: Click en MobileNavPortalsComponent → Panel se cierra automáticamente
    ↓
Usuario cierra sesión
  - Click en avatar → Modal → Botón "Cerrar sesión"
  - AuthService.signOut()
```

---

### **4. SERVICIOS CLAVE**

#### 4.1 **MainService**
**Ubicación:** `src/app/pages/dashboard/services/main.service.ts`

**Métodos:**
- `getPortal()`: Obtiene datos del portal desde API
- `setPortal(portal)`: Guarda portal en localStorage (encriptado)
- `getPortalLocal()`: Lee portal desde localStorage
- `getProcess()`: Lee proceso desde localStorage
- `setProcess(process)`: Guarda proceso en localStorage (encriptado)
- `getNewsContent()`: Obtiene contenido de novedades
- `getHelpContent()`: Obtiene contenido de ayuda

**Constantes localStorage:**
- `PORTAL`: Clave para datos del portal
- `PROCESS`: Clave para datos del proceso

---

#### 4.2 **AuthService**
**Ubicación:** `src/app/pages/auth/services/auth.service.ts`

**Métodos:**
- `getUser()`: Obtiene usuario autenticado (MSAL)
- `signOut()`: Cierra sesión

**Datos de usuario:**
```typescript
{
  account: {
    name: string;
    username: string;
    idTokenClaims: {
      DN: string; // Distinguished Name
    }
  },
  accessToken: string;
}
```

---

#### 4.3 **ValidatePermissionsHelPer**
**Ubicación:** `src/app/core/helpers/validate-permissions.ts`

**Métodos:**
- `buildMenuFromRoutes(routes)`: Construye menú desde rutas estáticas con validación de permisos

---

#### 4.4 **CryptoService**
**Ubicación:** `src/app/core/services/crypto.service.ts`

**Métodos:**
- `encrypt(data)`: Encripta datos para localStorage
- `decrypt(data)`: Desencripta datos desde localStorage

---

### **5. INTERFACES Y TIPOS**

#### 5.1 **RouteDefinition**
**Ubicación:** `src/app/layout/interfaces/route-definition.interface.ts`

```typescript
interface RouteDefinition {
  label: string;
  route: string;
  icon: string;
  moduleKey?: string;
  children?: RouteDefinition[];
}
```

---

#### 5.2 **NavLink**
**Ubicación:** `src/app/shared/components/mobile-nav/mobile-nav.component.ts`

```typescript
interface NavLink {
  ruta: string;
  icon?: string;
  texto: string;
}
```

---

#### 5.3 **Portal**
**Ubicación:** `src/app/pages/dashboard/interfaces/portal.interface.ts`

```typescript
interface Portal {
  name: string;
  description: string;
  code: string;
  // ... otros campos
}
```

---

#### 5.4 **Process**
**Ubicación:** `src/app/pages/dashboard/interfaces/section.interface.ts`

```typescript
interface Process {
  name: string;
  icon: string;
  menus: Menu[];
}

interface Menu {
  title: string;
  route: string;
  icon: string;
  windowTitle: string;
  subMenus?: SubMenu[];
}
```

---

### **6. RESPONSIVE BEHAVIOR**

#### Desktop (>1025px)
- **Header:** `PageHeaderCustomComponent` con `HeaderComponent`
- **Sidebar:** `SidenavComponent` (fijo, visible siempre)
- **Contenido:** Ocupa espacio restante a la derecha del sidebar

#### Mobile (<1025px)
- **Header:** `MobileNavPortalsComponent` (fixed, z-index: 100)
  - Barra 1: Logo + Avatar + Toggle (70px altura)
  - Barra 2: Breadcrumb badges (40px altura)
- **Contenido:** Padding-top de 110px para no quedar oculto detrás del header
- **Menú:** Panel deslizante desde la derecha con overlay

**Media Queries:**
```scss
// page-sidebar.component.scss
.desktop-nav-container { display: none; }
.mobile-nav-container { display: block; }

@media (min-width: 1025px) {
  .desktop-nav-container { display: block; }
  .mobile-nav-container { display: none; }
}
```

---

## 🔍 OPORTUNIDADES DE MEJORA

### **1. COMPLEJIDAD DE CONFIGURACIÓN**

**Problema Actual:**
- Para implementar navegación en un nuevo proyecto se requiere:
  1. Crear layout (TopbarLayout o PagesLayout)
  2. Configurar PageSidebarComponent
  3. Configurar MainService con getters
  4. Manejar sincronización entre desktop y mobile
  5. Duplicar lógica de menú en múltiples lugares

**Propuesta de Mejora:**
- **Servicio centralizado de navegación** (`NavigationService`)
- **Configuración declarativa** en un solo lugar
- **Auto-sincronización** entre desktop y mobile

---

### **2. DUPLICACIÓN DE LÓGICA**

**Problema Actual:**
- Parseo de DN duplicado en:
  - `PageHeaderCustomComponent`
  - `MobileNavPortalsComponent`
- Obtención de datos de usuario duplicada
- Lógica de modal de usuario duplicada

**Propuesta de Mejora:**
- **Servicio de usuario** con métodos reutilizables:
  ```typescript
  UserProfileService {
    getUserName(): string
    getUserEmail(): string
    getUserRole(): string
    getUserOU(): string
    parseDN(dn: string): ParsedDN
  }
  ```
- **Componente compartido** para modal de usuario

---

### **3. DEPENDENCIA DE LOCALSTORAGE**

**Problema Actual:**
- Menú dinámico depende de `localStorage`
- Si se pierde/borra localStorage, navegación se rompe
- No hay mecanismo de recuperación

**Propuesta de Mejora:**
- **Caché con fallback**: Intentar cargar desde API si no existe en localStorage
- **Estado global** con servicio de estado (NgRx, Akita, o servicio con BehaviorSubject)
- **Validación** de integridad de datos antes de usar

---

### **4. ACOPLAMIENTO CON MAINSERVICE**

**Problema Actual:**
- `PageSidebarComponent` está fuertemente acoplado a `MainService`
- Difícil de reutilizar en otros proyectos con diferentes estructuras

**Propuesta de Mejora:**
- **Inyección de configuración**:
  ```typescript
  @Injectable()
  export class NavigationConfigService {
    abstract getMenuItems(): Observable<RouteDefinition[]>
    abstract getProcessInfo(): Observable<{name: string, icon: string}>
  }
  ```
- Cada proyecto implementa su propia versión

---

### **5. FALTA DE DOCUMENTACIÓN DE FLUJO**

**Problema Actual:**
- No hay documentación clara de cómo implementar navegación en nuevo proyecto
- Flujo de datos no está documentado
- Dependencias no están claras

**Propuesta de Mejora:**
- **Guía de implementación paso a paso**
- **Ejemplos de código** comentados
- **Diagramas de flujo** visuales
- **Este documento** como punto de partida

---

### **6. ESTADO DE NAVEGACIÓN NO REACTIVO**

**Problema Actual:**
- `PageSidebarComponent` escucha `NavigationEnd` manualmente
- No hay estado reactivo compartido entre componentes
- Cambios en el menú requieren lógica manual de recarga

**Propuesta de Mejora:**
- **Estado reactivo** con Signals o RxJS:
  ```typescript
  NavigationStateService {
    menuItems$ = signal<RouteDefinition[]>([])
    currentProcess$ = signal<Process | null>(null)
    currentUser$ = signal<User | null>(null)
  }
  ```

---

### **7. CONFIGURACIÓN HARDCODEADA**

**Problema Actual:**
- Logo hardcodeado: `"assets/images/logo-poli-portal.png"`
- Rutas hardcodeadas en varios lugares
- Configuración dispersa en múltiples archivos

**Propuesta de Mejora:**
- **Archivo de configuración centralizado**:
  ```typescript
  export const NAVIGATION_CONFIG = {
    portal: {
      logoSrc: 'assets/images/logo-poli-portal.png',
      name: 'Portal Institucional',
    },
    routes: {
      dashboard: '/main',
      pages: '/pages',
    },
    badges: {
      portal: { status: 'warning', icon: 'badge' },
      process: { status: 'info' },
    }
  }
  ```

---

### **8. TESTING**

**Problema Actual:**
- Componentes difíciles de testear debido a:
  - Múltiples dependencias
  - Lógica en constructores
  - Dependencia de localStorage

**Propuesta de Mejora:**
- **Mocks de servicios** bien definidos
- **Inyección de dependencias** clara
- **Separación de lógica** de obtención de datos y presentación

---

## 📦 PROPUESTA DE REFACTORIZACIÓN

### **Fase 1: Servicios Centralizados**
```typescript
// navigation.service.ts
@Injectable({ providedIn: 'root' })
export class NavigationService {
  menuItems$ = signal<RouteDefinition[]>([]);
  currentProcess$ = signal<Process | null>(null);
  
  loadMenuForProcess(processId: string) { }
  updateMenu(items: RouteDefinition[]) { }
}

// user-profile.service.ts
@Injectable({ providedIn: 'root' })
export class UserProfileService {
  user$ = signal<User | null>(null);
  
  getUserName(): string { }
  getUserRole(): string { }
  parseDN(dn: string): ParsedDN { }
}

// navigation-config.service.ts (Abstract)
@Injectable()
export abstract class NavigationConfigService {
  abstract getMenuItems(): Observable<RouteDefinition[]>;
  abstract getProcessInfo(): Observable<ProcessInfo>;
  abstract getPortalInfo(): Observable<PortalInfo>;
}
```

### **Fase 2: Componentes Unificados**
- Unificar `PageHeaderCustomComponent` + `HeaderComponent`
- Unificar modal de usuario en componente compartido
- Simplificar `PageSidebarComponent` para ser solo un wrapper

### **Fase 3: Configuración Declarativa**
```typescript
// app.config.ts
export const navigationConfig: NavigationConfig = {
  layouts: {
    dashboard: {
      showMenu: false,
      menuSource: 'static',
      staticRoutes: SYSTEM_ROUTES
    },
    pages: {
      showMenu: true,
      menuSource: 'dynamic',
      dynamicSource: 'process'
    }
  },
  branding: {
    logo: 'assets/images/logo-poli-portal.png',
    portalName: 'Portal Institucional'
  }
}
```

### **Fase 4: Documentación**
- README para cada layout
- Ejemplos de implementación
- Guía de migración
- Troubleshooting común

---

## 📊 RESUMEN DE COMPONENTES

| Componente | Ubicación | Propósito | Usado en |
|------------|-----------|-----------|----------|
| **TopbarLayoutComponent** | `layout/screens/topbar-layout/` | Layout para /main | Dashboard |
| **PagesLayoutComponent** | `layout/screens/pages-layout/` | Layout para /pages/* | Páginas internas |
| **PageHeaderCustomComponent** | `layout/components/page-header-custom/` | Header desktop | Ambos layouts |
| **PageSidebarComponent** | `layout/components/page-sidebar/` | Contenedor de nav lateral | PagesLayout |
| **SidenavComponent** | `shared/components/sidenav/` | Navegación desktop | PageSidebar (desktop) |
| **MobileNavPortalsComponent** | `shared/components/mobile-nav-portals/` | Navegación mobile | Ambos layouts (mobile) |
| **HeaderNavItemComponent** | `shared/components/header-nav-item/` | Item de menú reutilizable | Sidenav + MobileNav |
| **HeaderComponent** | `shared/components/header/` | Header base | PageHeaderCustom |

---

## 🎯 CONCLUSIÓN

El sistema de navegación actual es **funcional** pero presenta **alta complejidad** para implementar en nuevos proyectos debido a:

1. **Lógica dispersa** en múltiples componentes
2. **Duplicación de código** (especialmente en manejo de usuario)
3. **Dependencias implícitas** (localStorage, servicios específicos)
4. **Falta de documentación** centralizada
5. **Configuración hardcodeada**

Las mejoras propuestas permitirían:
- ✅ **Reducir tiempo de implementación** de 2-3 días a 2-3 horas
- ✅ **Facilitar mantenimiento** con lógica centralizada
- ✅ **Mejorar testabilidad** con servicios desacoplados
- ✅ **Reutilización** en múltiples proyectos con mínimas modificaciones

---

**Fecha del análisis:** 27 de noviembre de 2025  
**Proyecto:** Portal Colaborador Front  
**Versión Angular:** 19.2.0

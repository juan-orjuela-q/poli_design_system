# Contexto del Proyecto - Portal Colaborador Front

## 📌 Información General

**Nombre del Proyecto:** Portal Colaborador - Frontend  
**Framework:** Angular 19.2.0  
**Patrón de Componentes:** Standalone Components  
**Sistema de Diseño:** Politécnico Grancolombiano Design System  
**Autenticación:** Azure MSAL (Microsoft Authentication Library)  
**Estado:** En desarrollo activo  

---

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas Principal

```
src/app/
├── core/                    # Servicios core, guards, interceptors, constantes
├── layout/                  # Layouts y componentes de estructura
│   ├── components/          # Componentes de layout (header, sidebar, footer)
│   └── screens/            # Layouts principales (topbar, pages, auth)
├── pages/                   # Módulos de páginas/features
│   ├── auth/               # Autenticación
│   ├── dashboard/          # Dashboard principal
│   └── flexibility/        # Módulo de flexibilidad (beneficios, cupones, etc.)
└── shared/                  # Componentes compartidos del sistema de diseño
    └── components/         # Badge, Button, Modal, Avatar, etc.
```

---

## 🎨 Sistema de Diseño

Todos los componentes visuales están bajo `src/app/shared/components/` e incluyen:

**Componentes Implementados:**
- `AvatarComponent`: Avatares con letras, imágenes, estados y notificaciones
- `BadgeComponent`: Etiquetas/badges con íconos, colores y tamaños variados
- `ButtonComponent`: Botones con múltiples variantes (primary, secondary, outline, destructive, etc.)
- `ModalComponent`: Diálogos modales centrados
- `RightModalComponent`: Panel modal lateral derecho
- `FlexibleModalComponent`: Modal con tamaño configurable
- `LoaderComponent`: Indicadores de carga (small, medium, large)
- `TabsComponent`: Pestañas/tabs para organizar contenido
- `IconComponent`: Wrapper para Material Icons
- `HeaderComponent`: Header institucional
- `SidenavComponent`: Navegación lateral para desktop
- `FileUploadComponent`: Componente de carga de archivos con drag & drop

**Características:**
- Cada componente tiene su `.stories.ts` para Storybook
- Documentación inline en archivos TypeScript
- Variables CSS del sistema de diseño (`--colores-marca-poli-*`, `--spacing-*`, `--tipografia-*`)
- Componentes standalone (no requieren módulos)

---

## 🧭 Sistema de Navegación

### Layouts Principales

#### 1. **TopbarLayoutComponent** (`/main`)
- **Propósito:** Dashboard/página principal del portal
- **Desktop:** Header con logo, nombre de usuario, avatar (abre modal de perfil)
- **Mobile:** `MobileNavPortalsComponent` sin menú (solo header + avatar)
- **Menú:** Estático desde `SYSTEM_ROUTES`
- **Características:** 
  - Botones de "Novedades" y "Ayuda" (cargan contenido HTML desde API)
  - Badge del portal con estado warning

#### 2. **PagesLayoutComponent** (`/pages/*`)
- **Propósito:** Páginas internas de las aplicaciones
- **Desktop:** Header + Sidebar fijo (`SidenavComponent`)
- **Mobile:** `MobileNavPortalsComponent` con menú completo
- **Menú:** Dinámico desde `MainService.getProcess()` (cargado desde localStorage)
- **Características:**
  - Breadcrumb en mobile: "Portal del colaborador > Nombre de la aplicación"
  - Sidebar con submenús expandibles
  - Footer con información adicional

### Componentes de Navegación

**`MobileNavPortalsComponent`** (Mobile):
- **Barra 1:** Logo + Avatar (clickeable) + Botón menú toggle
- **Barra 2:** Breadcrumb con badges (Portal > Aplicación)
- **Panel lateral:** Overlay + navegación deslizante
- **Modal de usuario:** Correo, Unidad Organizacional, Rol, Botón de cerrar sesión
- **Input `showMenu`:** Controla si se muestra el botón de menú (`false` en /main, `true` en /pages)
- **Posición:** Fixed top (z-index: 100)
- **Altura total:** 110px (70px + 40px)

**`SidenavComponent`** (Desktop):
- Sidebar vertical fijo
- Badge con icono y título del proceso
- Lista de items con submenús expandibles (Material Expansion Panel)
- Footer integrado
- Control de colapso

**`PageHeaderCustomComponent`** (Desktop):
- Logo clickeable (navega a /main)
- Nombre y rol del usuario
- Avatar clickeable (abre `RightModalComponent`)
- Modal con info de usuario y botón de cerrar sesión

**`HeaderNavItemComponent`**:
- Componente reutilizable para items de menú
- Soporte para submenús
- Estado activo con RouterLinkActive

---

## 🔐 Autenticación y Autorización

**Servicio:** `AuthService` (usa MSAL)

**Métodos principales:**
- `getUser()`: Obtiene usuario autenticado con token y claims
- `signOut()`: Cierra sesión

**Estructura de usuario:**
```typescript
{
  account: {
    name: string;           // "Juan Pérez"
    username: string;       // "juan.perez@ejemplo.com"
    idTokenClaims: {
      DN: string;          // Distinguished Name: "CN=User,OU=Rol,OU=Unidad,..."
    }
  },
  accessToken: string;
}
```

**Parseo de DN:**
- El DN contiene información jerárquica del usuario
- Se parsea para extraer: rol (primer OU), unidad organizacional (segundo OU)
- Usado en `PageHeaderCustomComponent` y `MobileNavPortalsComponent`

---

## 💾 Gestión de Estado y Datos

### MainService

**Propósito:** Gestión de datos del portal y procesos

**Métodos clave:**
- `getPortal()`: Obtiene datos del portal desde API
- `setPortal(portal)`: Guarda portal en localStorage (encriptado)
- `getPortalLocal()`: Lee portal desde localStorage
- `getProcess()`: Lee proceso/aplicación desde localStorage
- `setProcess(process)`: Guarda proceso en localStorage (encriptado)
- `getNewsContent()`: Obtiene HTML de novedades
- `getHelpContent()`: Obtiene HTML de ayuda

**LocalStorage:**
- `PORTAL`: Datos del portal institucional
- `PROCESS`: Datos del proceso/aplicación actual con su menú
- Todos los datos se encriptan con `CryptoService`

### Estructura de Datos

**Portal:**
```typescript
interface Portal {
  name: string;
  description: string;
  code: string;
}
```

**Process:**
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

**RouteDefinition:**
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

## 🌐 API y Endpoints

**Base URL:** Configurada en `environment.ts`
- `apiPortalesUrl`: URL base de la API de portales
- `apiPortalesVersion`: Versión de la API (ej: "v1")
- `portalCode`: Código del portal institucional

**Endpoints principales:**
```
GET /Portals/code/{portalCode}                    - Datos del portal
GET /Portals/code/{portalCode}/news-content       - Contenido de novedades
GET /Portals/code/{portalCode}/help-content       - Contenido de ayuda
GET /Categories/portal/code/{portalCode}          - Categorías del portal
```

**Headers:**
- `Authorization: Bearer {accessToken}` (obtenido de MSAL)

---

## 📱 Responsive Design

**Breakpoint principal:** 1025px

### Desktop (>= 1025px)
- Header con logo, nombre de usuario, avatar
- Sidebar fijo visible (240px ancho aprox)
- Contenido ocupa espacio restante
- Modal de usuario como panel lateral derecho

### Mobile (< 1025px)
- `MobileNavPortalsComponent` fixed en top
- Contenido con `padding-top: 110px`
- Menú como panel deslizante desde la derecha
- Overlay oscuro con blur cuando el menú está abierto
- Cierre automático del menú al navegar

**Media queries clave:**
```scss
.desktop-nav-container { display: none; }
.mobile-nav-container { display: block; }

@media (min-width: 1025px) {
  .desktop-nav-container { display: block; }
  .mobile-nav-container { display: none; }
}
```

---

## 🎯 Flujo de Usuario Típico

1. **Login:** Usuario se autentica con Azure MSAL
2. **Carga inicial:** 
   - Se obtiene información del portal desde API
   - Se guarda en localStorage
   - Se obtienen datos del usuario
3. **Dashboard (`/main`):**
   - Ve categorías/tarjetas de aplicaciones disponibles
   - Desktop: Header con avatar clickeable
   - Mobile: Header sin menú, solo avatar
4. **Selección de aplicación:**
   - Usuario hace click en una aplicación
   - Se guarda el proceso en localStorage
   - Navega a `/pages/ruta-de-la-app`
5. **Navegación en aplicación (`/pages/*`):**
   - Desktop: Sidebar con menú del proceso visible
   - Mobile: Botón de menú que abre panel lateral
   - Breadcrumb en mobile: "Portal > Aplicación"
6. **Perfil de usuario:**
   - Click en avatar abre modal
   - Muestra: correo, unidad organizacional, rol
   - Botón de cerrar sesión
7. **Cerrar sesión:**
   - Click en "Cerrar sesión" ejecuta `AuthService.signOut()`

---

## 🛠️ Servicios Core

### CryptoService
- Encripta/desencripta datos para localStorage
- Usado por `MainService` para proteger datos sensibles

### ValidatePermissionsHelPer
- Construye menú desde rutas estáticas (`SYSTEM_ROUTES`)
- Valida permisos de usuario
- Usado en `TopbarLayoutComponent`

### LanguageService
- Gestión de idiomas (en desarrollo/no usado actualmente)

---

## 🧩 Componentes Clave por Funcionalidad

### Carga de Archivos
- **Componente:** `FileUploadComponent`
- **Características:**
  - Drag & drop
  - Selección múltiple de archivos
  - Validación de tipo y tamaño
  - Preview de archivos
  - Eliminación de archivos antes de subir

### Modales/Diálogos
- **ModalComponent:** Modal centrado estándar
- **RightModalComponent:** Panel lateral derecho (usado para perfil de usuario)
- **FlexibleModalComponent:** Modal con tamaño configurable (usado en novedades/ayuda)

### Indicadores de Carga
- **LoaderComponent:** 3 tamaños (small, medium, large)
- **Minimal mode:** Solo spinner sin texto
- **Full screen mode:** Overlay completo

### Navegación
- **HeaderNavItemComponent:** Item de menú reutilizable con submenús
- **SidenavComponent:** Sidebar desktop con acordeones
- **MobileNavPortalsComponent:** Navegación mobile completa con modal de usuario

---

## 📝 Convenciones de Código

### Nomenclatura
- **Componentes:** PascalCase con sufijo `Component` (ej: `ButtonComponent`)
- **Servicios:** PascalCase con sufijo `Service` (ej: `AuthService`)
- **Interfaces:** PascalCase (ej: `RouteDefinition`, `Portal`)
- **Constantes:** UPPER_SNAKE_CASE (ej: `SYSTEM_ROUTES`, `PORTAL`)

### Estructura de Componentes
```typescript
@Component({
  selector: 'app-nombre',
  standalone: true,
  imports: [...],
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // Preferido
})
export class NombreComponent { }
```

### Uso de Signals
- Se usa `signal()` para estado reactivo en componentes nuevos
- Ejemplo: `isOpen = signal(false)`
- Preferido sobre `BehaviorSubject` para estado local

### CSS Variables
```scss
// Colores
var(--colores-marca-poli-azul-principal-base, #0f385a)
var(--colores-marca-poli-azul-secundario-alt, #007BA4)
var(--colores-marca-poli-magenta-alt, #e0006e)

// Espaciado
var(--spacing-universal-spacing-small, 4px)
var(--spacing-universal-spacing-base, 8px)
var(--spacing-universal-spacing-medium, 12px)
var(--spacing-universal-spacing-lg, 16px)
var(--spacing-universal-spacing-2xl, 24px)

// Tipografía
var(--tipografia-font-family-family-sans-heading, Poppins)
var(--tipografia-font-size-body-body-sm, 14px)
var(--tipografia-line-height-body-line-height-body-sm, 21px)
```

---

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm start                    # Inicia servidor en localhost:4300
ng serve                     # Alternativa

# Build
ng build                     # Producción
ng build --configuration development  # Desarrollo

# Testing
ng test                      # Unit tests
ng e2e                       # E2E tests

# Generación de componentes
ng g c shared/components/nombre --standalone
ng g s core/services/nombre
```

---

## 🔄 Estado Actual del Proyecto

### Completado ✅
- Sistema de navegación desktop y mobile funcionando
- Autenticación con Azure MSAL integrada
- Componentes base del sistema de diseño implementados
- Layouts principales (topbar, pages) operativos
- Modal de usuario con información y logout
- Menú dinámico desde API/localStorage
- Responsive design para mobile y desktop
- Componente de carga de archivos
- Modales de novedades y ayuda

### En Desarrollo 🚧
- Módulo de flexibilidad (beneficios, cupones)
- Módulo de reconocimientos
- Gestión de permisos granular
- Optimización de performance

### Próximos Pasos 📋
1. Refactorización del sistema de navegación (ver `docs/analisis-navegacion.md`)
2. Implementación de más módulos de funcionalidad
3. Mejora de testing (unit + e2e)
4. Documentación adicional de componentes
5. Optimización de bundle size

---

## 📚 Documentos Relacionados

- **`docs/analisis-navegacion.md`**: Análisis completo del sistema de navegación con propuestas de mejora
- **`README.md`**: Instrucciones de instalación y setup
- **Storybook**: Cada componente en `shared/components/` tiene su archivo `.stories.ts`

---

## 💡 Notas Importantes

1. **Todos los componentes son standalone**: No se usan módulos NgModule
2. **LocalStorage encriptado**: Datos sensibles se encriptan con `CryptoService`
3. **Menú dinámico**: El menú de navegación en `/pages` se carga desde la API y se guarda en localStorage
4. **Menú estático**: El menú en `/main` es estático desde `SYSTEM_ROUTES`
5. **Avatar clickeable**: En ambos layouts (desktop y mobile) el avatar abre un modal con información del usuario
6. **Cierre automático**: El menú mobile se cierra automáticamente al navegar a otra ruta
7. **Breadcrumb mobile**: Solo visible en `/pages`, muestra "Portal > Aplicación"
8. **Fixed header mobile**: El header mobile está fixed top, el contenido tiene padding-top de 110px

---

**Última actualización:** 27 de noviembre de 2025  
**Versión Angular:** 19.2.0  
**Proyecto:** Portal Colaborador - Politécnico Grancolombiano

# Guía de Migración - Sistema de Navegación Optimizado

## 📋 Resumen

Esta guía te ayudará a migrar un proyecto que usa el sistema de navegación antiguo al nuevo sistema optimizado. El proceso tomará aproximadamente **1-2 horas**.

---

## 📦 Archivos a Copiar/Reemplazar al Proyecto Destino

### 1. Servicios Core (NUEVOS - Copiar)

Copiar estos archivos a `src/app/core/services/`:

```
✅ navigation.service.ts
✅ user-profile.service.ts
```

**Ubicación origen:**
- `src/app/core/services/navigation.service.ts`
- `src/app/core/services/user-profile.service.ts`

---

### 2. Configuración (NUEVO - Copiar)

Copiar este archivo a `src/app/core/constants/`:

```
✅ navigation.config.ts
```

**Ubicación origen:**
- `src/app/core/constants/navigation.config.ts`

---

### 3. Componente User Profile Modal (NUEVO - Copiar)

Copiar toda la carpeta a `src/app/shared/components/`:

```
✅ user-profile-modal/
   ├── user-profile-modal.component.ts
   ├── user-profile-modal.component.html
   └── user-profile-modal.component.scss
```

**Ubicación origen:**
- `src/app/shared/components/user-profile-modal/`

---

### 4. Componente Sidenav (REEMPLAZAR)

Reemplazar estos archivos en `src/app/shared/components/sidenav/`:

```
🔄 sidenav.component.ts
🔄 sidenav.component.html
🔄 sidenav.component.scss
🔄 sidenav.component.stories.ts
```

**Ubicación origen:**
- `src/app/shared/components/sidenav/`

**Cambios principales:**
- Agregado método `navigateToMain()` para navegar a /main
- Header ahora es clickeable con `(click)="navigateToMain()"`
- Inyección de `Router` en el constructor
- Estilos CSS para cursor pointer en header

---

### 5. Componente Page Header Custom (REEMPLAZAR)

Reemplazar estos archivos en `src/app/layout/components/page-header-custom/`:

```
🔄 page-header-custom.component.ts
🔄 page-header-custom.component.html
```

**Ubicación origen:**
- `src/app/layout/components/page-header-custom/`

**Cambios principales:**
- Usa `UserProfileService` en lugar de parseo manual de DN
- Usa `UserProfileModalComponent` en lugar de HTML duplicado
- Usa `NAVIGATION_CONFIG` para configuración
- Eliminado código duplicado (~80 líneas)

---

### 6. Componente Page Sidebar (REEMPLAZAR)

Reemplazar estos archivos en `src/app/layout/components/page-sidebar/`:

```
🔄 page-sidebar.component.ts
🔄 page-sidebar.component.html
```

**Ubicación origen:**
- `src/app/layout/components/page-sidebar/`

**Cambios principales:**
- Usa `NavigationService` y `UserProfileService`
- Eliminada lógica de carga de menú local
- Signals expuestos como readonly
- Código reducido de ~100 a ~60 líneas

---

### 7. Componente Right Modal (VERIFICAR)

Verificar este archivo en `src/app/shared/components/right-modal/`:

```
⚠️ right-modal.component.scss
```

**Ubicación origen:**
- `src/app/shared/components/right-modal/right-modal.component.scss`

**Nota:** Si hay cambios en este archivo, reemplázalo también.

---

### 8. Otros Componentes Modificados (OPCIONAL - Solo si existen en tu proyecto)

Si estos componentes existen en tu proyecto destino, considera reemplazarlos:

```
⚠️ topbar-layout.component.ts
⚠️ benefit-detail.component.ts
⚠️ manage-request-dialog.component.ts
⚠️ attachment-item.component.ts
```

**Nota:** Estos componentes tienen imports sin usar eliminados. Solo cópialos si quieres limpiar warnings.

---

### 9. Documentación (COPIAR)

Copiar estos archivos a `docs/`:

```
📄 GUIA_NAVEGACION_COMPLETA.md
📄 MIGRACION_NAVEGACION.md (este archivo)
```

**Ubicación origen:**
- `docs/GUIA_NAVEGACION_COMPLETA.md`
- `docs/MIGRACION_NAVEGACION.md`

---

## 📊 Resumen de Archivos

### Archivos NUEVOS a Copiar (3)
1. ✅ `navigation.service.ts`
2. ✅ `user-profile.service.ts`
3. ✅ `navigation.config.ts`
4. ✅ `user-profile-modal/` (carpeta completa con 3 archivos)

### Archivos MODIFICADOS a Reemplazar (6 componentes)
1. 🔄 `sidenav.component.*` (4 archivos)
2. 🔄 `page-header-custom.component.*` (2 archivos)
3. 🔄 `page-sidebar.component.*` (2 archivos)
4. ⚠️ `right-modal.component.scss` (1 archivo)

### Documentación (2)
1. 📄 `GUIA_NAVEGACION_COMPLETA.md`
2. 📄 `MIGRACION_NAVEGACION.md`

**Total:** ~15 archivos a copiar/reemplazar

---

## 🤖 Instrucciones para Copilot

Una vez que hayas copiado los archivos al proyecto destino, usa estas instrucciones con GitHub Copilot:

### Paso 1: Refactorizar el Layout Principal

```
Necesito refactorizar mi componente de layout para usar el nuevo sistema de navegación.

Archivo actual: [ruta_a_tu_layout.component.ts]

Requisitos:
1. Inyectar NavigationService y UserProfileService del core
2. En ngOnInit, cargar el menú desde el proceso usando navigationService.loadMenuFromProcess()
3. Establecer la información del portal con navigationService.setPortalInfo()
4. Reemplazar cualquier lógica local de carga de menú con los servicios
5. Eliminar cualquier parseo manual de DN (ahora lo hace UserProfileService)

Servicios disponibles:
- NavigationService: src/app/core/services/navigation.service.ts
- UserProfileService: src/app/core/services/user-profile.service.ts
- NAVIGATION_CONFIG: src/app/core/constants/navigation.config.ts

Ejemplo de implementación:
```typescript
constructor(
  private navigationService: NavigationService,
  private userProfileService: UserProfileService,
  private mainService: MainService
) {}

ngOnInit(): void {
  // Cargar portal
  const portal = this.mainService.getPortalLocal();
  if (portal) {
    this.navigationService.setPortalInfo(portal.name, 'badge');
  }

  // Cargar menú
  const process = this.mainService.getProcess();
  if (process) {
    this.navigationService.loadMenuFromProcess(process);
  }
}
```
```

---

### Paso 2: Refactorizar Componente de Sidebar

```
Necesito refactorizar mi componente de sidebar para usar NavigationService.

Archivo actual: [ruta_a_tu_sidebar.component.ts]

Requisitos:
1. Inyectar NavigationService y UserProfileService
2. Exponer los signals como propiedades readonly:
   - readonly menuItems = this.navigationService.menuItems
   - readonly processName = this.navigationService.processName
   - readonly processIcon = this.navigationService.processIcon
   - readonly userName = this.userProfileService.userName
3. Eliminar toda lógica de carga de menú local
4. Eliminar cualquier parseo de DN manual
5. En el template, usar los signals con paréntesis: menuItems(), userName()

Servicios disponibles:
- NavigationService: src/app/core/services/navigation.service.ts
- UserProfileService: src/app/core/services/user-profile.service.ts

El componente debe quedar muy simple, solo consumiendo signals de los servicios.
```

---

### Paso 3: Refactorizar Template del Sidebar

```
Necesito actualizar el template de mi sidebar para usar los signals correctamente.

Archivo actual: [ruta_a_tu_sidebar.component.html]

Requisitos:
1. Reemplazar accesos directos a propiedades por llamadas a signals con ()
2. Usar @for en lugar de *ngFor para iterar menuItems()
3. Verificar que RouterLink esté correctamente configurado
4. Asegurar que items sin children usen <a [routerLink]="item.route">

Ejemplo:
```html
<!-- Header -->
<div class="sidebar-header">
  <app-badge [text]="processName()" [iconStart]="processIcon()"></app-badge>
</div>

<!-- Menú -->
<nav>
  @for (item of menuItems(); track item.route) {
    @if (!item.children) {
      <a [routerLink]="item.route" class="menu-link">
        <app-icon [icon]="item.icon"></app-icon>
        <span>{{ item.label }}</span>
      </a>
    } @else {
      <!-- Items con hijos -->
      <div class="menu-parent">{{ item.label }}</div>
      <div class="submenu">
        @for (child of item.children; track child.route) {
          <a [routerLink]="child.route">{{ child.label }}</a>
        }
      </div>
    }
  }
</nav>
```
```

---

### Paso 4: Refactorizar Componente de Header

```
Necesito refactorizar mi componente de header para usar UserProfileService y UserProfileModalComponent.

Archivo actual: [ruta_a_tu_header.component.ts]

Requisitos:
1. Inyectar UserProfileService
2. Importar UserProfileModalComponent y RightModalComponent
3. Crear signal para controlar el modal: modalOpen = signal(false)
4. Exponer signals del servicio:
   - readonly userName = this.userProfileService.userName
   - readonly userRole = this.userProfileService.userRole
   - readonly userInitials = this.userProfileService.userInitials
5. Eliminar cualquier lógica de parseo de DN manual
6. Eliminar código HTML duplicado del modal de usuario

Servicios disponibles:
- UserProfileService: src/app/core/services/user-profile.service.ts
- UserProfileModalComponent: src/app/shared/components/user-profile-modal/

Ejemplo:
```typescript
import { signal } from '@angular/core';
import { UserProfileModalComponent } from '@shared/components/user-profile-modal/user-profile-modal.component';

modalOpen = signal(false);
readonly userName = this.userProfileService.userName;

constructor(
  private userProfileService: UserProfileService,
  private authService: AuthService,
  private router: Router
) {}

handleLogout(): void {
  this.authService.signOut();
  this.router.navigate(['/auth/login']);
}
```
```

---

### Paso 5: Refactorizar Template del Header

```
Necesito actualizar el template de mi header para usar UserProfileModalComponent.

Archivo actual: [ruta_a_tu_header.component.html]

Requisitos:
1. Reemplazar todo el HTML del modal de usuario con UserProfileModalComponent
2. Usar RightModalComponent como contenedor
3. Bindear correctamente los eventos
4. Usar signals con () en el template

Reemplazar TODO el código del modal de usuario con:
```html
<!-- Avatar clickeable -->
<div class="user-avatar" (click)="modalOpen.set(true)">
  <app-avatar [userName]="userName()"></app-avatar>
</div>

<!-- Modal lateral -->
<app-right-modal 
  [visible]="modalOpen()" 
  (close)="modalOpen.set(false)">
  
  <app-user-profile-modal
    [isOpen]="modalOpen()"
    (logout)="handleLogout()">
  </app-user-profile-modal>
</app-right-modal>
```

Eliminar todo el HTML duplicado del modal que muestre:
- Correo electrónico
- Rol
- Unidad Organizacional
- Botón de cerrar sesión

Todo eso ahora lo maneja UserProfileModalComponent automáticamente.
```

---

### Paso 6: Actualizar Imports y Path Aliases

```
Necesito verificar que los path aliases estén correctamente configurados en mi tsconfig.json.

Archivo: tsconfig.json

Requisitos:
1. Verificar que existan estos path aliases en compilerOptions.paths:
   - "@core/*": ["src/app/core/*"]
   - "@shared/*": ["src/app/shared/*"]
   - "@pages/*": ["src/app/pages/*"]
   - "@layout/*": ["src/app/layout/*"]

2. Si no existen, agregarlos.

Ejemplo de configuración:
```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@core/*": ["app/core/*"],
      "@shared/*": ["app/shared/*"],
      "@pages/*": ["app/pages/*"],
      "@layout/*": ["app/layout/*"]
    }
  }
}
```
```

---

### Paso 7: Eliminar Código Duplicado

```
Necesito eliminar código duplicado que ahora es manejado por los servicios centralizados.

Buscar y eliminar en los siguientes archivos:
[lista de archivos de tu proyecto que usan navegación]

Código a eliminar:
1. Funciones parseDN() duplicadas - ahora lo hace UserProfileService
2. Lógica de transformación de menús - ahora lo hace NavigationService
3. HTML de modal de usuario duplicado - ahora es UserProfileModalComponent
4. Valores hardcodeados de configuración - ahora están en NAVIGATION_CONFIG

Buscar específicamente:
- Funciones que contengan "parseDN"
- Código que transforme process.menus en arrays
- HTML que muestre info de usuario en modales
- Strings como "Portal Colaborador", "badge", etc que deberían venir de config
```

---

### Paso 8: Actualizar Componentes Móviles (Si aplica)

```
Necesito refactorizar mi componente de navegación móvil para usar los nuevos servicios.

Archivo actual: [ruta_a_tu_mobile_nav.component.ts]

Requisitos:
1. Inyectar NavigationService y UserProfileService
2. Usar los mismos signals que el sidebar
3. Reemplazar UserProfileModalComponent en lugar de HTML duplicado
4. Eliminar lógica de carga de menú local

Los cambios son idénticos a los del sidebar, pero adaptados a la UI móvil.
```

---

## ✅ Checklist de Verificación Post-Migración

Después de hacer los cambios, verifica:

### Compilación
- [ ] El proyecto compila sin errores
- [ ] No hay warnings de TypeScript relacionados con tipos
- [ ] Los imports de path aliases funcionan correctamente

### Funcionalidad
- [ ] El menú se carga correctamente en desktop
- [ ] El menú se carga correctamente en mobile
- [ ] Los items del menú navegan correctamente
- [ ] Los items con hijos se expanden/colapsan
- [ ] El modal de usuario se abre al hacer click en el avatar
- [ ] El modal muestra: email, rol, unidad organizacional
- [ ] El botón de cerrar sesión funciona
- [ ] Al hacer click en "Portal del colaborador" navega a /main

### Código Limpio
- [ ] Se eliminó código duplicado de parseo de DN
- [ ] Se eliminó lógica duplicada de carga de menú
- [ ] Se eliminó HTML duplicado del modal de usuario
- [ ] No hay funciones parseDN() en componentes
- [ ] No hay transformación manual de menus en componentes

### Signals
- [ ] Los signals se llaman con () en los templates
- [ ] Los signals están expuestos como readonly
- [ ] No hay subscripciones manuales innecesarias

---

## 🆘 Solución de Problemas

### Error: "Property does not exist on type"

**Problema:** TypeScript se queja de propiedades que no existen

**Solución:**
1. Verifica que los servicios estén correctamente inyectados
2. Asegúrate de llamar los signals con (): `userName()` en templates
3. Verifica los imports de path aliases en tsconfig.json

```
Copilot, tengo este error: [pega el error]

Archivos involucrados:
- [archivo con error]

Servicios que debería estar usando:
- NavigationService
- UserProfileService

Por favor ayúdame a corregirlo.
```

---

### Error: "Cannot read properties of undefined"

**Problema:** Los datos no se están cargando

**Solución:**
1. Verifica que `loadMenuFromProcess()` se llame en ngOnInit
2. Verifica que el proceso exista en localStorage
3. Agrega logs para debug

```
Copilot, los datos del menú no se están cargando.

Componente: [tu layout]

Necesito:
1. Agregar console.log para verificar que el proceso existe
2. Verificar que navigationService.loadMenuFromProcess() se llame correctamente
3. Verificar que los signals tengan datos

Código actual:
[pega tu código de ngOnInit]
```

---

### Error: Modal no se abre

**Problema:** Click en avatar no muestra el modal

**Solución:**
1. Verifica que el signal esté definido: `modalOpen = signal(false)`
2. Verifica el binding: `(click)="modalOpen.set(true)"`
3. Verifica que RightModalComponent reciba el signal llamado: `[visible]="modalOpen()"`

```
Copilot, el modal de usuario no se abre al hacer click.

Archivo: [tu header component]

Necesito verificar:
1. Que el signal modalOpen esté definido correctamente
2. Que el evento (click) llame a modalOpen.set(true)
3. Que RightModalComponent reciba modalOpen()
4. Que UserProfileModalComponent esté correctamente importado

Template actual:
[pega tu HTML del modal]
```

---

### Rutas duplicadas (/pages/pages/...)

**Problema:** Las URLs tienen segmentos duplicados

**Solución:**
NavigationService ya normaliza las rutas automáticamente. Si aún hay problemas:

```
Copilot, tengo rutas duplicadas en mi navegación.

Las URLs se ven así: /pages/pages/flexibility/benefits
Deberían ser: /pages/flexibility/benefits

NavigationService debería normalizar esto automáticamente.

Necesito:
1. Verificar que esté usando navigationService.loadMenuFromProcess()
2. Ver los datos del proceso en localStorage
3. Verificar que el método normalizeRoute() se esté ejecutando

Código de carga del menú:
[pega tu código]
```

---

## 📊 Comparación Antes/Después

### Antes de la Migración
```typescript
// ❌ Código duplicado en múltiples componentes
parseDN(dnString: string) {
  // 50+ líneas duplicadas
}

loadProcessMenu(): void {
  const process = this.mainService.getProcess();
  this.sidebarMenu = process.menus.map(menu => ({
    // Transformación manual compleja
  }));
}

// HTML de modal duplicado (100+ líneas)
```

### Después de la Migración
```typescript
// ✅ Código limpio y reutilizable
constructor(
  private navigationService: NavigationService,
  private userProfileService: UserProfileService
) {}

ngOnInit(): void {
  const process = this.mainService.getProcess();
  this.navigationService.loadMenuFromProcess(process);
}

readonly menuItems = this.navigationService.menuItems;
readonly userName = this.userProfileService.userName;

// HTML: <app-user-profile-modal> (1 línea)
```

---

## 📞 Soporte

Si encuentras problemas durante la migración:

1. **Revisa la documentación completa:** `docs/GUIA_NAVEGACION_COMPLETA.md`
2. **Busca en el código de ejemplo:** El proyecto actual ya tiene todo implementado
3. **Usa los prompts de Copilot:** Están optimizados para guiarte paso a paso

---

## 🎯 Resumen de Beneficios Post-Migración

✅ **95% menos código** duplicado  
✅ **0 funciones parseDN** manuales  
✅ **1 configuración** centralizada  
✅ **2 servicios** core reutilizables  
✅ **1 componente** de modal compartido  
✅ **Navegación reactiva** con Signals  
✅ **Fácil mantenimiento** futuro

---

**Tiempo estimado de migración:** 1-2 horas  
**Complejidad:** Media  
**Beneficio:** Alto

¡Buena suerte con la migración! 🚀

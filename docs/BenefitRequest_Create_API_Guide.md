# ?? API de Solicitudes de Beneficios - Guía Completa

## ?? Descripción General

Esta API permite a los empleados crear solicitudes de beneficios. Cada solicitud almacena información flexible en el campo `formDataJson` como texto plano/JSON.

**Características:**
- ? Validación de empleado activo
- ? Validación de beneficio disponible para el perfil
- ? Prevención de solicitudes duplicadas (pendientes)
- ? Código único generado automáticamente
- ? Asignación automática del jefe aprobador
- ? Campo flexible `formDataJson` para datos personalizados

---

## ?? Endpoint Principal

### Crear Solicitud de Beneficio

```http
POST /api/v1/benefits/requests
Content-Type: application/json
Authorization: Bearer {token}
```

---

## ?? Entrada (Request Body)

```json
{
  "benefitId": 1,
  "formDataJson": "Texto con los detalles de la solicitud",
  "employeeComments": "Comentarios adicionales del empleado"
}
```

### Campos

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `benefitId` | int | ? Sí | ID del beneficio a solicitar |
| `formDataJson` | string | ? No | **Datos flexibles en formato texto o JSON** |
| `employeeComments` | string | ? No | Comentarios adicionales del empleado |

---

## ?? Campo `formDataJson` - Explicación Detallada

El campo `formDataJson` es **completamente flexible** y puede contener:

### **Opción 1: Texto Plano**
```json
{
  "benefitId": 3,
  "formDataJson": "Solicito medio día libre el 15 de febrero de 2025 en la jornada de la tarde (PM).",
  "employeeComments": "Es para una cita médica"
}
```

### **Opción 2: JSON Estructurado**
```json
{
  "benefitId": 3,
  "formDataJson": "{\"fecha\": \"2025-02-15\", \"jornada\": \"PM\", \"motivo\": \"Cita médica\"}",
  "employeeComments": "Adjunto documento médico"
}
```

### **Opción 3: JSON con Múltiples Campos**
```json
{
  "benefitId": 8,
  "formDataJson": "{\"fechaMatrimonio\": \"2025-06-20\", \"fechaSolicitud\": \"2025-06-18\", \"conyuge\": \"María García\", \"lugarCelebración\": \"Bogotá\"}",
  "employeeComments": "Adjunto acta de matrimonio"
}
```

---

## ?? Salida Exitosa (200)

```json
{
  "succeeded": true,
  "data": 123,
  "error": null
}
```

**Dónde:**
- `data` = ID de la solicitud creada

---

## ? Errores Comunes

### Empleado no encontrado (404)
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Employee.NotFound",
    "description": "No se encontró el empleado"
  }
}
```

### Empleado inactivo (400)
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Employee.InactiveEmployee",
    "description": "El empleado no está activo"
  }
}
```

### Beneficio no encontrado (404)
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Benefit.NotFound",
    "description": "No se encontró el beneficio"
  }
}
```

### Beneficio no activo (400)
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Benefit.NotActive",
    "description": "El beneficio no está activo"
  }
}
```

### Beneficio no disponible para el perfil (403)
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Benefit.NotAvailableForProfile",
    "description": "Este beneficio no está disponible para tu perfil"
  }
}
```

### Ya existe una solicitud pendiente (409)
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Benefit.PendingRequestExists",
    "description": "Ya tienes una solicitud pendiente para este beneficio"
  }
}
```

---

## ?? Ejemplos de Uso por Beneficio

### 1?? Día de Trabajo en Casa

```json
{
  "benefitId": 1,
  "formDataJson": "Solicito trabajar desde casa el día lunes 15 de enero de 2025.",
  "employeeComments": "Necesito estar en casa para recibir una reparación"
}
```

**O con JSON estructurado:**
```json
{
  "benefitId": 1,
  "formDataJson": "{\"fecha\": \"2025-01-15\", \"dia\": \"Lunes\", \"motivo\": \"Reparación en casa\"}",
  "employeeComments": null
}
```

---

### 2?? Viernes de Balance

```json
{
  "benefitId": 2,
  "formDataJson": "Solicito viernes de balance para el 17 de enero de 2025.",
  "employeeComments": "Quiero disfrutar tiempo con mi familia"
}
```

**O simplemente:**
```json
{
  "benefitId": 2,
  "formDataJson": null,
  "employeeComments": "Solicitud de viernes de balance"
}
```

---

### 3?? Medio Día para Ti

```json
{
  "benefitId": 3,
  "formDataJson": "Solicito medio día libre el 20 de febrero de 2025, jornada de la mañana (AM).",
  "employeeComments": "Tengo una cita médica a las 10:00 AM"
}
```

**Con JSON:**
```json
{
  "benefitId": 3,
  "formDataJson": "{\"fecha\": \"2025-02-20\", \"jornada\": \"AM\", \"hora\": \"10:00\"}",
  "employeeComments": "Cita médica"
}
```

---

### 4?? Banco de Horas

```json
{
  "benefitId": 4,
  "formDataJson": "Solicito compensar horas acumuladas el día 25 de enero de 2025. Total de horas a compensar: 8 horas.",
  "employeeComments": "He trabajado horas extra en diciembre"
}
```

---

### 5?? Días Compensatorios

```json
{
  "benefitId": 5,
  "formDataJson": "Solicito día compensatorio el 30 de enero de 2025 por haber trabajado el día festivo 6 de enero.",
  "employeeComments": "Trabajé en día festivo según requerimiento del proyecto"
}
```

---

### 6?? Semana Santa

```json
{
  "benefitId": 6,
  "formDataJson": "Solicito los días jueves 17 y viernes 18 de abril de 2025 para semana santa.",
  "employeeComments": "Viajaré con mi familia"
}
```

**Con JSON:**
```json
{
  "benefitId": 6,
  "formDataJson": "{\"dias\": [\"2025-04-17\", \"2025-04-18\"], \"destino\": \"Cartagena\"}",
  "employeeComments": null
}
```

---

### 7?? 24 y 31 de Diciembre

```json
{
  "benefitId": 7,
  "formDataJson": "Solicito el día 24 de diciembre de 2025 para celebraciones navideñas.",
  "employeeComments": "Quiero pasar tiempo con mi familia"
}
```

---

### 8?? Cumpleaños

```json
{
  "benefitId": 8,
  "formDataJson": "Solicito el día 10 de marzo de 2025 (mi cumpleaños) en la jornada completa.",
  "employeeComments": "Mi cumpleaños es el 10 de marzo"
}
```

---

### ?? Celebra tu Matri

```json
{
  "benefitId": 10,
  "formDataJson": "Solicito el día 20 de junio de 2025 para mi matrimonio. La ceremonia será a las 3:00 PM.",
  "employeeComments": "Me caso el 20 de junio, adjunto acta de matrimonio"
}
```

**Con JSON estructurado:**
```json
{
  "benefitId": 10,
  "formDataJson": "{\"fechaMatrimonio\": \"2025-06-20\", \"horaCeremonia\": \"15:00\", \"lugar\": \"Iglesia San Juan\", \"nombreConyuge\": \"María García\"}",
  "employeeComments": "Adjunto acta de matrimonio y invitación"
}
```

---

## ?? Flujo Completo: Crear Solicitud con Adjuntos

### Paso 1: Crear Solicitud
```javascript
const requestData = {
  benefitId: 10, // Matrimonio
  formDataJson: JSON.stringify({
    fechaMatrimonio: "2025-06-20",
    nombreConyuge: "María García",
    lugar: "Bogotá"
  }),
  employeeComments: "Adjunto acta de matrimonio"
};

const response = await fetch('/api/v1/benefits/requests', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestData)
});

const result = await response.json();
const requestId = result.data; // 123
```

### Paso 2: Subir Adjuntos (si el beneficio lo requiere)
```javascript
// Subir acta de matrimonio
const formData = new FormData();
formData.append('file', actaFile);

await fetch(`/api/v1/benefits/requests/${requestId}/attachments`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

// Subir foto
const formData2 = new FormData();
formData2.append('file', fotoFile);

await fetch(`/api/v1/benefits/requests/${requestId}/attachments`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData2
});
```

---

## ?? Validaciones Automáticas

El backend valida automáticamente:

| Validación | Descripción |
|------------|-------------|
| ? **Empleado activo** | Solo empleados activos pueden solicitar |
| ? **Beneficio activo** | Solo beneficios activos están disponibles |
| ? **Perfil autorizado** | El beneficio debe estar asignado al perfil del empleado |
| ? **Sin solicitud pendiente** | No puede haber otra solicitud pendiente del mismo beneficio |
| ? **Jefe asignado** | Se asigna automáticamente el `ManagerId` como aprobador |

---

## ?? Datos Generados Automáticamente

El sistema genera automáticamente:

```json
{
  "requestCode": "BEN-20250115-A1B2C3D4",
  "employeeId": 456,
  "requestDate": "2025-01-15T14:30:00Z",
  "status": "Pending",
  "approverId": 789
}
```

| Campo | Generación | Ejemplo |
|-------|-----------|---------|
| `requestCode` | `BEN-{fecha}-{GUID}` | `BEN-20250115-A1B2C3D4` |
| `employeeId` | Extraído del token de autenticación | `456` |
| `requestDate` | Fecha y hora actual | `2025-01-15T14:30:00Z` |
| `status` | Siempre inicia en `Pending` | `Pending` |
| `approverId` | `ManagerId` del empleado | `789` |

---

## ?? Ejemplos de Código

### JavaScript / Fetch

```javascript
async function crearSolicitud(benefitId, detalles, comentarios) {
  const requestData = {
    benefitId: benefitId,
    formDataJson: detalles, // Texto plano o JSON stringificado
    employeeComments: comentarios
  };
  
  const response = await fetch('/api/v1/benefits/requests', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  });
  
  const result = await response.json();
  
  if (result.succeeded) {
    console.log('? Solicitud creada con ID:', result.data);
    return result.data;
  } else {
    console.error('? Error:', result.error.description);
    throw new Error(result.error.description);
  }
}

// Uso - Texto plano
await crearSolicitud(
  3, 
  "Solicito medio día el 15 de febrero de 2025 en la jornada PM",
  "Cita médica"
);

// Uso - JSON estructurado
const detallesJson = JSON.stringify({
  fecha: "2025-02-15",
  jornada: "PM",
  motivo: "Cita médica"
});

await crearSolicitud(3, detallesJson, "Adjunto orden médica");
```

---

### TypeScript / Angular

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateBenefitRequestDto {
  benefitId: number;
  formDataJson?: string;
  employeeComments?: string;
}

export interface ApiResponse<T> {
  succeeded: boolean;
  data: T;
  error: { code: string; description: string } | null;
}

@Injectable({ providedIn: 'root' })
export class BenefitRequestService {
  private baseUrl = '/api/v1/benefits';
  
  constructor(private http: HttpClient) {}
  
  createRequest(dto: CreateBenefitRequestDto): Observable<ApiResponse<number>> {
    return this.http.post<ApiResponse<number>>(
      `${this.baseUrl}/requests`,
      dto
    );
  }
}
```

**Uso en Componente:**
```typescript
export class CreateRequestComponent {
  constructor(private requestService: BenefitRequestService) {}
  
  onSubmit(benefitId: number, detalles: string, comentarios: string) {
    const dto: CreateBenefitRequestDto = {
      benefitId: benefitId,
      formDataJson: detalles,
      employeeComments: comentarios
    };
    
    this.requestService.createRequest(dto).subscribe({
      next: (response) => {
        if (response.succeeded) {
          console.log('Solicitud creada:', response.data);
          this.router.navigate(['/mis-solicitudes']);
        }
      },
      error: (err) => console.error('Error:', err)
    });
  }
  
  // Ejemplo con JSON estructurado
  crearSolicitudMedioDia(fecha: string, jornada: 'AM' | 'PM') {
    const detalles = {
      fecha: fecha,
      jornada: jornada,
      tipo: 'Medio día'
    };
    
    const dto: CreateBenefitRequestDto = {
      benefitId: 3,
      formDataJson: JSON.stringify(detalles),
      employeeComments: 'Solicitud de medio día'
    };
    
    this.requestService.createRequest(dto).subscribe({
      next: (response) => {
        if (response.succeeded) {
          alert(`Solicitud creada con ID: ${response.data}`);
        }
      }
    });
  }
}
```

---

### React

```typescript
import axios from 'axios';

interface CreateBenefitRequestDto {
  benefitId: number;
  formDataJson?: string;
  employeeComments?: string;
}

export async function createBenefitRequest(
  dto: CreateBenefitRequestDto,
  token: string
): Promise<number> {
  const response = await axios.post(
    '/api/v1/benefits/requests',
    dto,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.data.succeeded) {
    throw new Error(response.data.error?.description || 'Error al crear solicitud');
  }
  
  return response.data.data;
}
```

**Uso en Componente:**
```tsx
import { useState } from 'react';
import { createBenefitRequest } from './api';

export function CreateRequestForm({ token }: Props) {
  const [benefitId, setBenefitId] = useState(1);
  const [detalles, setDetalles] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const requestId = await createBenefitRequest(
        {
          benefitId: benefitId,
          formDataJson: detalles,
          employeeComments: comentarios
        },
        token
      );
      
      alert(`Solicitud creada con ID: ${requestId}`);
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <select value={benefitId} onChange={(e) => setBenefitId(Number(e.target.value))}>
        <option value={1}>Día de trabajo en casa</option>
        <option value={3}>Medio día para ti</option>
        <option value={10}>Celebra tu matri</option>
      </select>
      
      <textarea 
        placeholder="Detalles de la solicitud"
        value={detalles}
        onChange={(e) => setDetalles(e.target.value)}
      />
      
      <textarea 
        placeholder="Comentarios adicionales"
        value={comentarios}
        onChange={(e) => setComentarios(e.target.value)}
      />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Creando...' : 'Crear Solicitud'}
      </button>
    </form>
  );
}
```

---

## ? Testing con cURL

### Crear con texto plano
```bash
curl -X POST "https://localhost:7001/api/v1/benefits/requests" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "benefitId": 3,
    "formDataJson": "Solicito medio día el 15 de febrero de 2025, jornada PM",
    "employeeComments": "Cita médica"
  }'
```

### Crear con JSON estructurado
```bash
curl -X POST "https://localhost:7001/api/v1/benefits/requests" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "benefitId": 10,
    "formDataJson": "{\"fechaMatrimonio\": \"2025-06-20\", \"nombreConyuge\": \"María García\"}",
    "employeeComments": "Adjunto acta"
  }'
```

---

## ?? Recomendaciones de UI

### Formulario Dinámico según Beneficio

```javascript
function renderForm(benefitId) {
  switch(benefitId) {
    case 1: // Trabajo en casa
      return `
        <label>Fecha:</label>
        <input type="date" id="fecha">
        <label>Día de la semana:</label>
        <select id="dia">
          <option>Lunes</option>
          <option>Martes</option>
          <!-- ... -->
        </select>
      `;
      
    case 3: // Medio día
      return `
        <label>Fecha:</label>
        <input type="date" id="fecha">
        <label>Jornada:</label>
        <select id="jornada">
          <option value="AM">Mañana (AM)</option>
          <option value="PM">Tarde (PM)</option>
        </select>
      `;
      
    case 10: // Matrimonio
      return `
        <label>Fecha del matrimonio:</label>
        <input type="date" id="fechaMatrimonio">
        <label>Nombre del cónyuge:</label>
        <input type="text" id="nombreConyuge">
        <label>Lugar:</label>
        <input type="text" id="lugar">
      `;
  }
}

// Al enviar
function onSubmit() {
  let formDataJson;
  
  if (benefitId === 10) {
    // JSON estructurado
    formDataJson = JSON.stringify({
      fechaMatrimonio: document.getElementById('fechaMatrimonio').value,
      nombreConyuge: document.getElementById('nombreConyuge').value,
      lugar: document.getElementById('lugar').value
    });
  } else {
    // Texto plano
    formDataJson = `Solicito ${benefitName} el día ${fecha} en jornada ${jornada}`;
  }
  
  crearSolicitud(benefitId, formDataJson, comentarios);
}
```

---

## ?? Checklist de Implementación

### Backend
- [x] Command implementado
- [x] Validaciones de seguridad
- [x] Generación de código único
- [x] Asignación de aprobador
- [x] Documentación

### Frontend
- [ ] Formulario de creación
- [ ] Validación de campos
- [ ] Formularios dinámicos por tipo de beneficio
- [ ] Preview de solicitud antes de enviar
- [ ] Subida de adjuntos (si aplica)
- [ ] Mensajes de éxito/error
- [ ] Navegación a lista de solicitudes

---

## ?? Endpoints Relacionados

Después de crear la solicitud, puedes usar:

| Endpoint | Descripción |
|----------|-------------|
| `POST /api/v1/benefits/requests/{id}/attachments` | Subir archivos adjuntos |
| `GET /api/v1/benefits/requests/my-history` | Ver mis solicitudes |
| `GET /api/v1/benefits/requests/{id}` | Ver detalles de una solicitud |

---

**Última actualización:** Enero 2025  
**Versión:** 1.0  
**Estado:** ? Implementado

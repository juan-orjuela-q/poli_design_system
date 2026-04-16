# ?? API de Listado de Solicitudes de Beneficios

## ?? Descripción General

Esta API proporciona endpoints para consultar solicitudes de beneficios con diferentes filtros y perspectivas:
- ?? **Historial del empleado** - Mis solicitudes
- ? **Aprobaciones pendientes** - Para jefes
- ?? **Detalle de solicitud** - Ver una solicitud específica

---

## ?? Endpoints

### 1?? Historial de Mis Solicitudes

```http
GET /api/v1/benefits/requests/my-history
Authorization: Bearer {token}
```

**Descripción:** Obtiene todas las solicitudes del empleado autenticado, ordenadas de más reciente a más antigua.

---

#### ?? Salida Exitosa (200)

```json
{
  "succeeded": true,
  "data": [
    {
      "id": 123,
      "requestCode": "BEN-20250115-A1B2C3D4",
      "employeeId": 456,
      "employeeName": "Juan Pérez",
      "employeeEmail": "juan.perez@empresa.com",
      "benefitId": 3,
      "benefitName": "Medio día para ti",
      "requestDate": "2025-01-15T14:30:00Z",
      "status": 1,
      "statusName": "Pendiente",
      "employeeComments": "Cita médica",
      "formDataJson": "{\"fecha\": \"2025-02-15\", \"jornada\": \"PM\"}",
      "approverId": 789,
      "approverName": "María González",
      "approvalDate": null,
      "approverComments": null,
      "hrApproverEmail": null,
      "hrApprovalDate": null,
      "hrApproverComments": null,
      "attachments": []
    },
    {
      "id": 122,
      "requestCode": "BEN-20250110-X9Y8Z7W6",
      "employeeId": 456,
      "employeeName": "Juan Pérez",
      "employeeEmail": "juan.perez@empresa.com",
      "benefitId": 1,
      "benefitName": "Día de trabajo en casa",
      "requestDate": "2025-01-10T09:00:00Z",
      "status": 2,
      "statusName": "Aprobado",
      "employeeComments": "Reparación en casa",
      "formDataJson": "{\"fecha\": \"2025-01-12\"}",
      "approverId": 789,
      "approverName": "María González",
      "approvalDate": "2025-01-10T11:30:00Z",
      "approverComments": "Aprobado",
      "hrApproverEmail": null,
      "hrApprovalDate": null,
      "hrApproverComments": null,
      "attachments": []
    }
  ],
  "error": null
}
```

---

#### ? Errores Comunes

**Empleado no encontrado (404):**
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

---

### 2?? Aprobaciones Pendientes (Para Jefes)

```http
GET /api/v1/benefits/approvals/pending
Authorization: Bearer {token}
```

**Descripción:** Obtiene todas las solicitudes pendientes de aprobación asignadas al jefe autenticado, ordenadas por fecha de solicitud (más antiguas primero).

---

#### ?? Salida Exitosa (200)

```json
{
  "succeeded": true,
  "data": [
    {
      "id": 125,
      "requestCode": "BEN-20250114-D4E5F6G7",
      "employeeId": 457,
      "employeeName": "Carlos Rodríguez",
      "employeeEmail": "carlos.rodriguez@empresa.com",
      "benefitId": 10,
      "benefitName": "Celebra tu matri",
      "requestDate": "2025-01-14T10:00:00Z",
      "status": 1,
      "statusName": "Pendiente",
      "employeeComments": "Me caso el 20 de junio",
      "formDataJson": "{\"fechaMatrimonio\": \"2025-06-20\"}",
      "approverId": 789,
      "approverName": "María González",
      "approvalDate": null,
      "approverComments": null,
      "hrApproverEmail": null,
      "hrApprovalDate": null,
      "hrApproverComments": null,
      "attachments": [
        {
          "id": 50,
          "fileName": "acta_matrimonio.pdf",
          "contentType": "application/pdf",
          "fileSize": 524288,
          "fileSizeFormatted": "512 KB",
          "uploadDate": "2025-01-14T10:05:00Z",
          "uploadedBy": "carlos.rodriguez@empresa.com",
          "blobUrl": "https://starchivospolidev.blob.core.windows.net/..."
        }
      ]
    },
    {
      "id": 126,
      "requestCode": "BEN-20250115-H8I9J0K1",
      "employeeId": 458,
      "employeeName": "Ana López",
      "employeeEmail": "ana.lopez@empresa.com",
      "benefitId": 3,
      "benefitName": "Medio día para ti",
      "requestDate": "2025-01-15T08:30:00Z",
      "status": 1,
      "statusName": "Pendiente",
      "employeeComments": "Cita médica",
      "formDataJson": "{\"fecha\": \"2025-01-20\", \"jornada\": \"AM\"}",
      "approverId": 789,
      "approverName": "María González",
      "approvalDate": null,
      "approverComments": null,
      "hrApproverEmail": null,
      "hrApprovalDate": null,
      "hrApproverComments": null,
      "attachments": []
    }
  ],
  "error": null
}
```

---

### 3?? Detalle de Solicitud

```http
GET /api/v1/benefits/requests/{id}
Authorization: Bearer {token}
```

**Descripción:** Obtiene los detalles completos de una solicitud específica, incluyendo adjuntos.

**Path Parameter:**
- `id` (int) - ID de la solicitud

---

#### ?? Salida Exitosa (200)

```json
{
  "succeeded": true,
  "data": {
    "id": 123,
    "requestCode": "BEN-20250115-A1B2C3D4",
    "employeeId": 456,
    "employeeName": "Juan Pérez",
    "employeeEmail": "juan.perez@empresa.com",
    "benefitId": 10,
    "benefitName": "Celebra tu matri",
    "requestDate": "2025-01-15T14:30:00Z",
    "status": 1,
    "statusName": "Pendiente",
    "employeeComments": "Me caso el 20 de junio, adjunto acta de matrimonio",
    "formDataJson": "{\"fechaMatrimonio\": \"2025-06-20\", \"lugar\": \"Bogotá\"}",
    "approverId": 789,
    "approverName": "María González",
    "approvalDate": null,
    "approverComments": null,
    "hrApproverEmail": null,
    "hrApprovalDate": null,
    "hrApproverComments": null,
    "attachments": [
      {
        "id": 42,
        "fileName": "acta_matrimonio.pdf",
        "contentType": "application/pdf",
        "fileSize": 524288,
        "fileSizeFormatted": "512 KB",
        "uploadDate": "2025-01-15T14:35:00Z",
        "uploadedBy": "juan.perez@empresa.com",
        "blobUrl": "https://starchivospolidev.blob.core.windows.net/cuponera/solicitudes/123_20250115143500_a1b2c3d4_acta_matrimonio.pdf"
      },
      {
        "id": 43,
        "fileName": "foto_boda.jpg",
        "contentType": "image/jpeg",
        "fileSize": 1048576,
        "fileSizeFormatted": "1 MB",
        "uploadDate": "2025-01-15T14:36:00Z",
        "uploadedBy": "juan.perez@empresa.com",
        "blobUrl": "https://starchivospolidev.blob.core.windows.net/cuponera/solicitudes/123_20250115143600_b2c3d4e5_foto_boda.jpg"
      }
    ]
  },
  "error": null
}
```

---

#### ? Errores Comunes

**Solicitud no encontrada (404):**
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Benefit.NotFound",
    "description": "No se encontró la solicitud"
  }
}
```

---

## ?? Estructura del DTO

### **BenefitRequestDto**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | int | ID de la solicitud |
| `requestCode` | string | Código único (BEN-YYYYMMDD-XXXXXXXX) |
| `employeeId` | int | ID del empleado solicitante |
| `employeeName` | string | Nombre completo del empleado |
| `employeeEmail` | string | Email corporativo |
| `benefitId` | int | ID del beneficio solicitado |
| `benefitName` | string | Nombre del beneficio |
| `requestDate` | DateTime | Fecha y hora de creación |
| `status` | int | Estado (1=Pending, 2=Approved, 3=Rejected) |
| `statusName` | string | Nombre del estado |
| `employeeComments` | string? | Comentarios del empleado |
| `formDataJson` | string? | Datos del formulario en formato JSON |
| `approverId` | int? | ID del jefe aprobador |
| `approverName` | string? | Nombre del jefe |
| `approvalDate` | DateTime? | Fecha de aprobación del jefe |
| `approverComments` | string? | Comentarios del jefe |
| `hrApproverEmail` | string? | Email del aprobador de RH |
| `hrApprovalDate` | DateTime? | Fecha de aprobación de RH |
| `hrApproverComments` | string? | Comentarios de RH |
| `attachments` | List<AttachmentDto> | Lista de adjuntos |

---

### **AttachmentDto**

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | int | ID del adjunto |
| `fileName` | string | Nombre original del archivo |
| `contentType` | string | Tipo MIME (application/pdf, image/jpeg, etc.) |
| `fileSize` | long | Tamaño en bytes |
| `fileSizeFormatted` | string | Tamaño formateado (ej: "512 KB") |
| `uploadDate` | DateTime | Fecha de subida |
| `uploadedBy` | string | Email de quien subió el archivo |
| `blobUrl` | string | URL del archivo en blob storage |

---

## ?? Estados de Solicitud (RequestStatus)

| Valor | Nombre | Descripción |
|-------|--------|-------------|
| `1` | Pending | Pendiente de aprobación |
| `2` | Approved | Aprobada por el jefe |
| `3` | Rejected | Rechazada |
| `4` | Cancelled | Cancelada por el empleado |
| `5` | Used | Beneficio utilizado/disfrutado |
| `6` | Expired | Expirada (no se usó en el tiempo establecido) |
| `7` | PendingHRApproval | Pendiente de aprobación de RH |

---

## ?? Ejemplos de Código

### JavaScript / Fetch

#### Obtener Mis Solicitudes

```javascript
async function obtenerMisSolicitudes(token) {
  const response = await fetch('/api/v1/benefits/requests/my-history', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const result = await response.json();
  
  if (result.succeeded) {
    console.log('? Solicitudes:', result.data);
    return result.data;
  } else {
    console.error('? Error:', result.error.description);
    throw new Error(result.error.description);
  }
}

// Uso
const solicitudes = await obtenerMisSolicitudes(token);

// Mostrar en tabla
solicitudes.forEach(solicitud => {
  console.log(`${solicitud.requestCode} - ${solicitud.benefitName} - ${solicitud.statusName}`);
});
```

---

#### Obtener Aprobaciones Pendientes (Jefe)

```javascript
async function obtenerAprobacionesPendientes(token) {
  const response = await fetch('/api/v1/benefits/approvals/pending', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const result = await response.json();
  
  if (result.succeeded) {
    console.log('? Aprobaciones pendientes:', result.data.length);
    return result.data;
  } else {
    console.error('? Error:', result.error.description);
    throw new Error(result.error.description);
  }
}

// Uso
const pendientes = await obtenerAprobacionesPendientes(token);

// Mostrar lista
pendientes.forEach(solicitud => {
  console.log(`?? ${solicitud.employeeName} solicita ${solicitud.benefitName}`);
});
```

---

#### Obtener Detalle de Solicitud

```javascript
async function obtenerDetalleSolicitud(requestId, token) {
  const response = await fetch(`/api/v1/benefits/requests/${requestId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const result = await response.json();
  
  if (result.succeeded) {
    console.log('? Detalle:', result.data);
    return result.data;
  } else {
    console.error('? Error:', result.error.description);
    throw new Error(result.error.description);
  }
}

// Uso
const detalle = await obtenerDetalleSolicitud(123, token);

// Mostrar adjuntos
if (detalle.attachments.length > 0) {
  console.log('?? Adjuntos:');
  detalle.attachments.forEach(adj => {
    console.log(`  - ${adj.fileName} (${adj.fileSizeFormatted})`);
  });
}
```

---

### TypeScript / Angular

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BenefitRequestDto {
  id: number;
  requestCode: string;
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  benefitId: number;
  benefitName: string;
  requestDate: string;
  status: number;
  statusName: string;
  employeeComments?: string;
  formDataJson?: string;
  approverId?: number;
  approverName?: string;
  approvalDate?: string;
  approverComments?: string;
  hrApproverEmail?: string;
  hrApprovalDate?: string;
  hrApproverComments?: string;
  attachments: AttachmentDto[];
}

export interface AttachmentDto {
  id: number;
  fileName: string;
  contentType: string;
  fileSize: number;
  fileSizeFormatted: string;
  uploadDate: string;
  uploadedBy: string;
  blobUrl: string;
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
  
  // Mis solicitudes
  getMyHistory(): Observable<ApiResponse<BenefitRequestDto[]>> {
    return this.http.get<ApiResponse<BenefitRequestDto[]>>(
      `${this.baseUrl}/requests/my-history`
    );
  }
  
  // Aprobaciones pendientes (para jefes)
  getPendingApprovals(): Observable<ApiResponse<BenefitRequestDto[]>> {
    return this.http.get<ApiResponse<BenefitRequestDto[]>>(
      `${this.baseUrl}/approvals/pending`
    );
  }
  
  // Detalle de solicitud
  getRequestById(id: number): Observable<ApiResponse<BenefitRequestDto>> {
    return this.http.get<ApiResponse<BenefitRequestDto>>(
      `${this.baseUrl}/requests/${id}`
    );
  }
}
```

**Uso en Componente:**
```typescript
export class MyRequestsComponent implements OnInit {
  requests: BenefitRequestDto[] = [];
  loading = false;
  
  constructor(private requestService: BenefitRequestService) {}
  
  ngOnInit() {
    this.loadMyRequests();
  }
  
  loadMyRequests() {
    this.loading = true;
    
    this.requestService.getMyHistory().subscribe({
      next: (response) => {
        if (response.succeeded) {
          this.requests = response.data;
          console.log(`Cargadas ${this.requests.length} solicitudes`);
        }
      },
      error: (err) => console.error('Error:', err),
      complete: () => this.loading = false
    });
  }
  
  getStatusBadgeClass(status: number): string {
    switch(status) {
      case 1: return 'badge-warning';  // Pending
      case 2: return 'badge-success';  // Approved
      case 3: return 'badge-danger';   // Rejected
      default: return 'badge-secondary';
    }
  }
}
```

---

### React

```typescript
import axios from 'axios';

export interface BenefitRequestDto {
  id: number;
  requestCode: string;
  employeeName: string;
  benefitName: string;
  requestDate: string;
  status: number;
  statusName: string;
  employeeComments?: string;
  formDataJson?: string;
  attachments: AttachmentDto[];
}

export interface AttachmentDto {
  id: number;
  fileName: string;
  fileSizeFormatted: string;
}

export async function getMyHistory(token: string): Promise<BenefitRequestDto[]> {
  const response = await axios.get('/api/v1/benefits/requests/my-history', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.data.succeeded) {
    throw new Error(response.data.error?.description || 'Error al obtener solicitudes');
  }
  
  return response.data.data;
}

export async function getPendingApprovals(token: string): Promise<BenefitRequestDto[]> {
  const response = await axios.get('/api/v1/benefits/approvals/pending', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.data.succeeded) {
    throw new Error(response.data.error?.description || 'Error al obtener aprobaciones');
  }
  
  return response.data.data;
}

export async function getRequestById(id: number, token: string): Promise<BenefitRequestDto> {
  const response = await axios.get(`/api/v1/benefits/requests/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  if (!response.data.succeeded) {
    throw new Error(response.data.error?.description || 'Error al obtener solicitud');
  }
  
  return response.data.data;
}
```

**Uso en Componente:**
```tsx
import { useState, useEffect } from 'react';
import { getMyHistory, BenefitRequestDto } from './api';

export function MyRequestsList({ token }: { token: string }) {
  const [requests, setRequests] = useState<BenefitRequestDto[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadRequests();
  }, []);
  
  const loadRequests = async () => {
    try {
      const data = await getMyHistory(token);
      setRequests(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadge = (status: number) => {
    const badges = {
      1: 'bg-yellow-500',  // Pending
      2: 'bg-green-500',   // Approved
      3: 'bg-red-500',     // Rejected
    };
    return badges[status] || 'bg-gray-500';
  };
  
  if (loading) return <div>Cargando...</div>;
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mis Solicitudes</h2>
      
      {requests.map(request => (
        <div key={request.id} className="border rounded p-4">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{request.benefitName}</h3>
              <p className="text-sm text-gray-600">{request.requestCode}</p>
              <p className="text-sm">{new Date(request.requestDate).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded ${getStatusBadge(request.status)}`}>
              {request.statusName}
            </span>
          </div>
          
          {request.attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-semibold">?? Adjuntos:</p>
              <ul className="text-sm">
                {request.attachments.map(att => (
                  <li key={att.id}>{att.fileName} ({att.fileSizeFormatted})</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## ? Testing con cURL

### Mis Solicitudes
```bash
curl -X GET "https://localhost:7001/api/v1/benefits/requests/my-history" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Aprobaciones Pendientes
```bash
curl -X GET "https://localhost:7001/api/v1/benefits/approvals/pending" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Detalle de Solicitud
```bash
curl -X GET "https://localhost:7001/api/v1/benefits/requests/123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ?? Recomendaciones de UI

### Tabla de Solicitudes

```html
<table>
  <thead>
    <tr>
      <th>Código</th>
      <th>Beneficio</th>
      <th>Fecha</th>
      <th>Estado</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <!-- Para cada solicitud -->
    <tr>
      <td>BEN-20250115-A1B2C3D4</td>
      <td>Medio día para ti</td>
      <td>15/01/2025</td>
      <td>
        <span class="badge badge-warning">Pendiente</span>
      </td>
      <td>
        <button onclick="verDetalle(123)">Ver</button>
      </td>
    </tr>
  </tbody>
</table>
```

### Badges de Estado

```javascript
function getStatusBadge(status) {
  const badges = {
    1: '<span class="badge badge-warning">? Pendiente</span>',
    2: '<span class="badge badge-success">? Aprobado</span>',
    3: '<span class="badge badge-danger">? Rechazado</span>',
    4: '<span class="badge badge-success">? Aprobado por RH</span>',
    5: '<span class="badge badge-danger">? Rechazado por RH</span>'
  };
  return badges[status] || '<span class="badge badge-secondary">-</span>';
}
```

---

## ?? Filtros y Ordenamiento

### En Frontend (Recomendado)

```javascript
// Filtrar por estado
const pendientes = solicitudes.filter(s => s.status === 1);
const aprobadas = solicitudes.filter(s => s.status === 2);

// Filtrar por beneficio
const medioDia = solicitudes.filter(s => s.benefitId === 3);

// Ordenar por fecha (más recientes primero)
const ordenadas = solicitudes.sort((a, b) => 
  new Date(b.requestDate) - new Date(a.requestDate)
);

// Filtrar por año (usando requestDate)
const anio2025 = solicitudes.filter(s => 
  new Date(s.requestDate).getFullYear() === 2025
);

// Filtrar por mes (usando requestDate)
const enero = solicitudes.filter(s => {
  const date = new Date(s.requestDate);
  return date.getMonth() === 0 && date.getFullYear() === 2025;
});
```

---

## ?? Endpoints Relacionados

| Endpoint | Descripción |
|----------|-------------|
| `POST /api/v1/benefits/requests` | Crear solicitud |
| `POST /api/v1/benefits/requests/{id}/attachments` | Subir adjunto |
| `GET /api/v1/benefits/attachments/{attachmentId}/download` | Descargar adjunto |
| `DELETE /api/v1/benefits/attachments/{attachmentId}` | Eliminar adjunto |
| `POST /api/v1/benefits/approvals/{id}/approve` | Aprobar solicitud |
| `POST /api/v1/benefits/approvals/{id}/reject` | Rechazar solicitud |

---

## ?? Notas Importantes

1. **Ordenamiento Predeterminado:**
   - `my-history`: Más recientes primero
   - `pending`: Más antiguas primero (FIFO)

2. **Adjuntos:**
   - Solo se incluyen en la respuesta si existen
   - El `blobUrl` es la ruta completa en Azure Blob Storage

3. **Fechas:**
   - Todas las fechas están en formato ISO 8601 (UTC)
   - En frontend, convertir a zona horaria local

4. **Estados:**
   - `Pending (1)`: Esperando aprobación del jefe
   - `Approved (2)`: Aprobada por jefe (listo para disfrutar)
   - `Rejected (3)`: Rechazada por jefe
   - `ApprovedByHR (4)`: Aprobada por RH (segundo nivel)
   - `RejectedByHR (5)`: Rechazada por RH

---

**Última actualización:** Enero 2025  
**Versión:** 1.0  
**Estado:** ? Implementado

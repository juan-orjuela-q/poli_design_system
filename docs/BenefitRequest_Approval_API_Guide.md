# ? API de Aprobación de Solicitudes de Beneficios

## ?? Descripción General

Esta API permite a los jefes aprobar o rechazar solicitudes de beneficios de sus empleados. El sistema implementa un flujo de aprobación con validaciones de permisos y registro de historial.

**Características:**
- ? Solo el jefe asignado puede aprobar/rechazar
- ? Solo solicitudes en estado `Pending` pueden ser procesadas
- ? Registro automático de historial de cambios
- ? Almacenamiento de comentarios del aprobador

---

## ?? Estados de Solicitud

| Estado | Valor | Descripción | Flujo |
|--------|-------|-------------|-------|
| **Pending** | 1 | Solicitud creada, esperando aprobación | Estado inicial |
| **Approved** | 2 | Aprobada completamente | Final (exitoso) |
| **Rejected** | 3 | Rechazada por el jefe | Final (rechazado) |
| **Cancelled** | 4 | Cancelada por el empleado | Final (cancelado) |
| **Used** | 5 | Beneficio utilizado/disfrutado | Final (consumido) |
| **Expired** | 6 | Expirada sin usar | Final (expirado) |
| **PendingHRApproval** | 7 | Esperando aprobación de RH | Intermedio |
| **PendingManagerApproval** | 8 | Esperando aprobación del jefe | Intermedio |
| **ManagerApproved** | 9 | Aprobada por jefe, falta RH | Intermedio |
| **HRApproved** | 10 | Aprobada por RH, falta jefe | Intermedio |

---

## ?? Diagrama de Flujo de Estados

```
       ???????????????
       ?   Pending   ? (1)
       ???????????????
              ?
        ?????????????
        ?           ?
   ???????????  ????????????
   ?Approved ?  ? Rejected ?
   ?   (2)   ?  ?   (3)    ?
   ???????????  ????????????
        ?
        ?
   ???????????
   ?  Used   ? (5)
   ???????????
```

**Flujo Simple (Aprobación de Jefe Solamente):**
```
Pending ? Approved ? Used
   ?
Rejected
```

---

## ?? Endpoints

### 1?? Aprobar Solicitud

```http
POST /api/v1/benefits/approvals/{requestId}/approve
Content-Type: application/json
Authorization: Bearer {token}
```

**Path Parameter:**
- `requestId` (int) - ID de la solicitud a aprobar

---

#### ?? Entrada (Request Body)

```json
{
  "requestId": 123,
  "approverComments": "Aprobado. Beneficio válido."
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `requestId` | int | ? Sí | ID de la solicitud (debe coincidir con URL) |
| `approverComments` | string | ? No | Comentarios del jefe |

---

#### ?? Salida Exitosa (200)

```json
{
  "succeeded": true,
  "data": null,
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

**Estado inválido (400):**
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "BenefitRequest.InvalidStatus",
    "description": "Solo se pueden aprobar solicitudes pendientes."
  }
}
```

**Sin permisos (403):**
```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "BenefitRequest.Unauthorized",
    "description": "No tiene permisos para aprobar esta solicitud."
  }
}
```

**Jefe no encontrado (404):**
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

### 2?? Rechazar Solicitud

```http
POST /api/v1/benefits/approvals/{requestId}/reject
Content-Type: application/json
Authorization: Bearer {token}
```

**Path Parameter:**
- `requestId` (int) - ID de la solicitud a rechazar

---

#### ?? Entrada (Request Body)

```json
{
  "requestId": 123,
  "approverComments": "Rechazado. El empleado no cumple con los requisitos."
}
```

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| `requestId` | int | ? Sí | ID de la solicitud (debe coincidir con URL) |
| `approverComments` | string | ? No | Comentarios del jefe (recomendado explicar el motivo) |

---

#### ?? Salida Exitosa (200)

```json
{
  "succeeded": true,
  "data": null,
  "error": null
}
```

---

#### ? Errores (mismos que aprobar)

Los mismos errores de validación aplican para rechazar.

---

## ?? Validaciones de Seguridad

### **1. Autenticación**
- ? Requiere token JWT válido
- ? El email del token debe existir en la tabla `Employees`

### **2. Autorización**
- ? Solo el jefe asignado (`ApproverId`) puede aprobar/rechazar
- ? Verificación estricta: `benefitRequest.ApproverId == approver.Id`

### **3. Estado de la Solicitud**
- ? Solo se procesan solicitudes en estado `Pending`
- ? Previene aprobaciones/rechazos duplicados

### **4. Integridad de Datos**
- ? Registro automático en historial (`RequestStatusHistory`)
- ? Almacenamiento de fecha y comentarios
- ? Transacciones atómicas con `UnitOfWork`

---

## ?? Historial de Cambios (RequestStatusHistory)

Cada aprobación o rechazo crea un registro de historial:

```csharp
RequestStatusHistory {
    BenefitRequestId: 123,
    FromStatus: Pending,
    ToStatus: Approved,
    ChangedDate: "2025-01-16T10:30:00Z",
    ChangedBy: "maria.gonzalez@empresa.com",
    Comments: "Aprobado. Beneficio válido.",
    Reason: "Aprobación del jefe"
}
```

**Campos del historial:**
- `FromStatus` - Estado anterior (ej: Pending)
- `ToStatus` - Estado nuevo (ej: Approved o Rejected)
- `ChangedDate` - Fecha y hora del cambio
- `ChangedBy` - Email del jefe que aprobó/rechazó
- `Comments` - Comentarios del aprobador
- `Reason` - Razón del cambio ("Aprobación del jefe" o "Rechazo del jefe")

---

## ?? Ejemplos de Código

### JavaScript / Fetch

#### Aprobar Solicitud

```javascript
async function aprobarSolicitud(requestId, comentarios, token) {
  const response = await fetch(`/api/v1/benefits/approvals/${requestId}/approve`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requestId: requestId,
      approverComments: comentarios
    })
  });
  
  const result = await response.json();
  
  if (result.succeeded) {
    console.log('? Solicitud aprobada');
    return true;
  } else {
    console.error('? Error:', result.error.description);
    throw new Error(result.error.description);
  }
}

// Uso
try {
  await aprobarSolicitud(123, 'Aprobado. Todo en orden.', token);
  alert('Solicitud aprobada exitosamente');
} catch (error) {
  alert(`Error: ${error.message}`);
}
```

---

#### Rechazar Solicitud

```javascript
async function rechazarSolicitud(requestId, motivoRechazo, token) {
  const response = await fetch(`/api/v1/benefits/approvals/${requestId}/reject`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      requestId: requestId,
      approverComments: motivoRechazo
    })
  });
  
  const result = await response.json();
  
  if (result.succeeded) {
    console.log('? Solicitud rechazada');
    return true;
  } else {
    console.error('? Error:', result.error.description);
    throw new Error(result.error.description);
  }
}

// Uso
try {
  await rechazarSolicitud(
    123, 
    'Rechazado. El empleado no ha completado 6 meses en la empresa.',
    token
  );
  alert('Solicitud rechazada');
} catch (error) {
  alert(`Error: ${error.message}`);
}
```

---

### TypeScript / Angular

```typescript
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApprovalCommand {
  requestId: number;
  approverComments?: string;
}

export interface ApiResponse<T> {
  succeeded: boolean;
  data: T;
  error: { code: string; description: string } | null;
}

@Injectable({ providedIn: 'root' })
export class BenefitApprovalService {
  private baseUrl = '/api/v1/benefits/approvals';
  
  constructor(private http: HttpClient) {}
  
  // Aprobar solicitud
  approve(requestId: number, comments?: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${this.baseUrl}/${requestId}/approve`,
      { requestId, approverComments: comments }
    );
  }
  
  // Rechazar solicitud
  reject(requestId: number, comments?: string): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(
      `${this.baseUrl}/${requestId}/reject`,
      { requestId, approverComments: comments }
    );
  }
}
```

**Uso en Componente:**
```typescript
export class ApprovalComponent {
  constructor(private approvalService: BenefitApprovalService) {}
  
  onApprove(requestId: number) {
    const comments = prompt('Comentarios (opcional):');
    
    this.approvalService.approve(requestId, comments || undefined).subscribe({
      next: (response) => {
        if (response.succeeded) {
          alert('? Solicitud aprobada');
          this.reloadPendingRequests();
        }
      },
      error: (err) => {
        console.error('Error:', err);
        alert('? Error al aprobar');
      }
    });
  }
  
  onReject(requestId: number) {
    const reason = prompt('Motivo del rechazo (recomendado):');
    
    if (!reason) {
      alert('Se recomienda agregar un motivo de rechazo');
      return;
    }
    
    this.approvalService.reject(requestId, reason).subscribe({
      next: (response) => {
        if (response.succeeded) {
          alert('? Solicitud rechazada');
          this.reloadPendingRequests();
        }
      },
      error: (err) => {
        console.error('Error:', err);
        alert('? Error al rechazar');
      }
    });
  }
}
```

---

### React

```typescript
import axios from 'axios';

interface ApprovalCommand {
  requestId: number;
  approverComments?: string;
}

export async function approveBenefitRequest(
  requestId: number,
  comments: string | undefined,
  token: string
): Promise<void> {
  const response = await axios.post(
    `/api/v1/benefits/approvals/${requestId}/approve`,
    { requestId, approverComments: comments },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.data.succeeded) {
    throw new Error(response.data.error?.description || 'Error al aprobar');
  }
}

export async function rejectBenefitRequest(
  requestId: number,
  comments: string | undefined,
  token: string
): Promise<void> {
  const response = await axios.post(
    `/api/v1/benefits/approvals/${requestId}/reject`,
    { requestId, approverComments: comments },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.data.succeeded) {
    throw new Error(response.data.error?.description || 'Error al rechazar');
  }
}
```

**Uso en Componente:**
```tsx
import { useState } from 'react';
import { approveBenefitRequest, rejectBenefitRequest } from './api';

export function ApprovalButtons({ requestId, token, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  
  const handleApprove = async () => {
    const comments = prompt('Comentarios (opcional):');
    
    setLoading(true);
    try {
      await approveBenefitRequest(requestId, comments || undefined, token);
      alert('? Solicitud aprobada');
      onSuccess();
    } catch (error) {
      alert(`? Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const handleReject = async () => {
    const reason = prompt('Motivo del rechazo:');
    
    if (!reason) {
      alert('?? Se recomienda agregar un motivo');
      return;
    }
    
    setLoading(true);
    try {
      await rejectBenefitRequest(requestId, reason, token);
      alert('? Solicitud rechazada');
      onSuccess();
    } catch (error) {
      alert(`? Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex gap-2">
      <button 
        onClick={handleApprove} 
        disabled={loading}
        className="btn btn-success"
      >
        ? Aprobar
      </button>
      
      <button 
        onClick={handleReject} 
        disabled={loading}
        className="btn btn-danger"
      >
        ? Rechazar
      </button>
    </div>
  );
}
```

---

## ? Testing con cURL

### Aprobar
```bash
curl -X POST "https://localhost:7001/api/v1/benefits/approvals/123/approve" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "requestId": 123,
    "approverComments": "Aprobado. Todo en orden."
  }'
```

### Rechazar
```bash
curl -X POST "https://localhost:7001/api/v1/benefits/approvals/123/reject" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "requestId": 123,
    "approverComments": "Rechazado. Motivo: ..."
  }'
```

---

## ?? Recomendaciones de UI

### Modal de Confirmación

```html
<!-- Aprobar -->
<div class="modal">
  <h3>¿Aprobar solicitud?</h3>
  <p><strong>Empleado:</strong> Juan Pérez</p>
  <p><strong>Beneficio:</strong> Medio día para ti</p>
  <p><strong>Fecha:</strong> 15/02/2025 - Jornada PM</p>
  
  <label>Comentarios (opcional):</label>
  <textarea id="comments" placeholder="Aprobado. Todo en orden."></textarea>
  
  <button onclick="aprobar()">? Aprobar</button>
  <button onclick="cerrarModal()">Cancelar</button>
</div>

<!-- Rechazar -->
<div class="modal">
  <h3>¿Rechazar solicitud?</h3>
  <p><strong>Empleado:</strong> Juan Pérez</p>
  <p><strong>Beneficio:</strong> Medio día para ti</p>
  
  <label>Motivo del rechazo (recomendado):</label>
  <textarea id="comments" placeholder="Rechazado porque..."></textarea>
  
  <button onclick="rechazar()" class="btn-danger">? Rechazar</button>
  <button onclick="cerrarModal()">Cancelar</button>
</div>
```

---

### Tabla de Solicitudes Pendientes

```html
<table>
  <thead>
    <tr>
      <th>Empleado</th>
      <th>Beneficio</th>
      <th>Fecha</th>
      <th>Detalles</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Juan Pérez</td>
      <td>Medio día para ti</td>
      <td>15/01/2025</td>
      <td>
        <button onclick="verDetalle(123)">??? Ver</button>
      </td>
      <td>
        <button onclick="aprobar(123)" class="btn-success">?</button>
        <button onclick="rechazar(123)" class="btn-danger">?</button>
      </td>
    </tr>
  </tbody>
</table>
```

---

## ?? Endpoints Relacionados

| Endpoint | Descripción |
|----------|-------------|
| `GET /api/v1/benefits/approvals/pending` | Ver solicitudes pendientes |
| `GET /api/v1/benefits/requests/{id}` | Ver detalle de solicitud |
| `GET /api/v1/benefits/attachments/{id}/download` | Descargar adjunto |

---

## ?? Flujo Completo de Aprobación

```javascript
// 1. Obtener solicitudes pendientes
const pendientes = await fetch('/api/v1/benefits/approvals/pending', {
  headers: { 'Authorization': `Bearer ${token}` }
});

// 2. Ver detalle de una solicitud
const detalle = await fetch(`/api/v1/benefits/requests/${requestId}`, {
  headers: { 'Authorization': `Bearer ${token}` }
});

// 3. Descargar adjuntos si existen
if (detalle.attachments.length > 0) {
  for (const att of detalle.attachments) {
    await descargarArchivo(att.id, att.fileName, token);
  }
}

// 4. Aprobar o rechazar
if (confirm('¿Aprobar solicitud?')) {
  await aprobarSolicitud(requestId, 'Aprobado', token);
} else {
  const motivo = prompt('Motivo del rechazo:');
  await rechazarSolicitud(requestId, motivo, token);
}
```

---

## ?? Notas Importantes

1. **Comentarios Recomendados:**
   - En aprobaciones: Opcional pero recomendado
   - En rechazos: **Muy recomendado** explicar el motivo

2. **Estados Finales:**
   - `Approved` y `Rejected` son estados finales
   - No se pueden cambiar una vez aplicados

3. **Historial:**
   - Cada cambio se registra en `StatusHistory`
   - Útil para auditoría y trazabilidad

4. **Notificaciones:**
   - Actualmente comentado en el código (`// TODO`)
   - Se puede implementar para notificar al empleado

---

## ?? Errores y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| `Unauthorized` | No eres el jefe asignado | Verificar `ApproverId` en BD |
| `InvalidStatus` | La solicitud ya fue procesada | Verificar estado actual |
| `Employee.NotFound` | Email del token no existe en BD | Verificar email en tabla Employees |

---

**Última actualización:** Enero 2025  
**Versión:** 1.0  
**Estado:** ? Implementado

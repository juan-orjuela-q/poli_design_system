# ?? API de Adjuntos de Solicitudes de Beneficios

## ?? Descripción General

El sistema permite visualizar y descargar archivos adjuntos de las solicitudes de beneficios. Los adjuntos se obtienen automáticamente cuando consultas una solicitud específica.

---

## ?? Endpoints Disponibles

### 1?? Obtener Solicitud con Adjuntos

```http
GET /api/v1/benefits/requests/{requestId}
Authorization: Bearer {token}
```

**Descripción:** Obtiene los detalles completos de una solicitud, **incluyendo la lista de adjuntos**.

---

#### ?? Salida Exitosa (200)

```json
{
  "succeeded": true,
  "data": {
    "id": 123,
    "requestCode": "BEN-20250116-A1B2C3D4",
    "employeeId": 456,
    "employeeName": "Juan Pérez",
    "employeeEmail": "juan.perez@empresa.com",
    "benefitId": 10,
    "benefitName": "Celebra tu matri",
    "requestDate": "2025-01-16T14:30:00Z",
    "status": 1,
    "statusName": "Pendiente",
    "employeeComments": "Me caso el 20 de junio",
    "formDataJson": "{\"fechaMatrimonio\": \"2025-06-20\"}",
    "attachments": [
      {
        "id": 42,
        "fileName": "acta_matrimonio.pdf",
        "contentType": "application/pdf",
        "fileSize": 524288,
        "fileSizeFormatted": "512 KB",
        "uploadDate": "2025-01-16T14:35:00Z",
        "uploadedBy": "juan.perez@empresa.com",
        "blobUrl": "https://starchivospolidev.blob.core.windows.net/cuponera/solicitudes/123_20250116143500_a1b2c3d4_acta_matrimonio.pdf"
      },
      {
        "id": 43,
        "fileName": "foto_boda.jpg",
        "contentType": "image/jpeg",
        "fileSize": 1048576,
        "fileSizeFormatted": "1 MB",
        "uploadDate": "2025-01-16T14:36:00Z",
        "uploadedBy": "juan.perez@empresa.com",
        "blobUrl": "https://starchivospolidev.blob.core.windows.net/cuponera/solicitudes/123_20250116143600_b2c3d4e5_foto_boda.jpg"
      }
    ]
  }
}
```

**? Los adjuntos vienen incluidos en el array `attachments`**

---

### 2?? Descargar Adjunto

```http
GET /api/v1/benefits/attachments/{attachmentId}/download
Authorization: Bearer {token}
```

**Descripción:** Descarga un archivo adjunto específico.

**Path Parameter:**
- `attachmentId` (int) - ID del adjunto

---

#### ?? Salida Exitosa (200)

**Headers de respuesta:**
```
Content-Type: application/pdf  (o el tipo del archivo)
Content-Disposition: attachment; filename="acta_matrimonio.pdf"
```

**Body:** Stream del archivo (binario)

---

#### ? Errores Comunes

**Adjunto no encontrado (404):**
```json
{
  "succeeded": false,
  "error": {
    "code": "BenefitRequest.AttachmentNotFound",
    "description": "No se encontró el archivo adjunto"
  }
}
```

**Sin permisos (403):**
```json
{
  "succeeded": false,
  "error": {
    "code": "BenefitRequest.UnauthorizedAccess",
    "description": "No tienes permisos para descargar este archivo"
  }
}
```

---

## ?? Permisos de Descarga

**¿Quién puede descargar un adjunto?**

1. ? **El empleado que creó la solicitud** (dueño)
2. ? **El jefe asignado como aprobador**
3. ? Otros empleados (sin permiso)

---

## ?? Ejemplos de Código Frontend

### **Paso 1: Obtener Solicitud con Adjuntos**

#### JavaScript / Fetch

```javascript
async function obtenerSolicitudConAdjuntos(requestId, token) {
  const response = await fetch(`/api/v1/benefits/requests/${requestId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const result = await response.json();
  
  if (result.succeeded) {
    console.log('? Solicitud obtenida:', result.data);
    console.log('?? Adjuntos:', result.data.attachments);
    return result.data;
  } else {
    console.error('? Error:', result.error.description);
    throw new Error(result.error.description);
  }
}

// Uso
const solicitud = await obtenerSolicitudConAdjuntos(123, token);

// Listar adjuntos
solicitud.attachments.forEach(adjunto => {
  console.log(`?? ${adjunto.fileName} (${adjunto.fileSizeFormatted})`);
});
```

---

### **Paso 2: Descargar Adjunto**

#### JavaScript / Fetch

```javascript
async function descargarAdjunto(attachmentId, fileName, token) {
  try {
    const response = await fetch(
      `/api/v1/benefits/attachments/${attachmentId}/download`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Error al descargar archivo');
    }
    
    // Convertir respuesta a blob
    const blob = await response.blob();
    
    // Crear URL temporal
    const url = window.URL.createObjectURL(blob);
    
    // Crear enlace de descarga
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    // Limpiar
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    console.log('? Archivo descargado:', fileName);
  } catch (error) {
    console.error('? Error al descargar:', error);
    alert('Error al descargar el archivo');
  }
}

// Uso
await descargarAdjunto(42, 'acta_matrimonio.pdf', token);
```

---

#### JavaScript / Con Axios

```javascript
import axios from 'axios';

async function descargarAdjunto(attachmentId, fileName, token) {
  try {
    const response = await axios.get(
      `/api/v1/benefits/attachments/${attachmentId}/download`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'blob' // ? Importante para archivos binarios
      }
    );
    
    // Crear enlace de descarga
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    link.remove();
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error('Error al descargar:', error);
    alert('Error al descargar el archivo');
  }
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
  employeeName: string;
  benefitName: string;
  requestDate: string;
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

@Injectable({ providedIn: 'root' })
export class BenefitRequestService {
  private baseUrl = '/api/v1/benefits';
  
  constructor(private http: HttpClient) {}
  
  // Obtener solicitud con adjuntos
  getRequestById(id: number): Observable<ApiResponse<BenefitRequestDto>> {
    return this.http.get<ApiResponse<BenefitRequestDto>>(
      `${this.baseUrl}/requests/${id}`
    );
  }
  
  // Descargar adjunto
  downloadAttachment(attachmentId: number, fileName: string): void {
    this.http.get(
      `${this.baseUrl}/attachments/${attachmentId}/download`,
      { responseType: 'blob' }
    ).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar:', err);
        alert('Error al descargar el archivo');
      }
    });
  }
}
```

**Uso en Componente:**
```typescript
export class RequestDetailComponent implements OnInit {
  request: BenefitRequestDto | null = null;
  
  constructor(
    private requestService: BenefitRequestService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit() {
    const requestId = +this.route.snapshot.params['id'];
    this.loadRequest(requestId);
  }
  
  loadRequest(id: number) {
    this.requestService.getRequestById(id).subscribe({
      next: (response) => {
        if (response.succeeded) {
          this.request = response.data;
          console.log('Adjuntos:', this.request.attachments);
        }
      }
    });
  }
  
  downloadFile(attachment: AttachmentDto) {
    this.requestService.downloadAttachment(
      attachment.id,
      attachment.fileName
    );
  }
}
```

---

### React

```typescript
import axios from 'axios';

export async function getRequestWithAttachments(
  requestId: number,
  token: string
): Promise<BenefitRequestDto> {
  const response = await axios.get(
    `/api/v1/benefits/requests/${requestId}`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  
  if (!response.data.succeeded) {
    throw new Error(response.data.error?.description || 'Error');
  }
  
  return response.data.data;
}

export async function downloadAttachment(
  attachmentId: number,
  fileName: string,
  token: string
): Promise<void> {
  const response = await axios.get(
    `/api/v1/benefits/attachments/${attachmentId}/download`,
    {
      headers: { 'Authorization': `Bearer ${token}` },
      responseType: 'blob'
    }
  );
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}
```

**Uso en Componente:**
```tsx
import { useState, useEffect } from 'react';
import { getRequestWithAttachments, downloadAttachment } from './api';

export function RequestDetail({ requestId, token }: Props) {
  const [request, setRequest] = useState<BenefitRequestDto | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadRequest();
  }, [requestId]);
  
  const loadRequest = async () => {
    try {
      const data = await getRequestWithAttachments(requestId, token);
      setRequest(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownload = async (attachment: AttachmentDto) => {
    try {
      await downloadAttachment(attachment.id, attachment.fileName, token);
    } catch (error) {
      alert('Error al descargar el archivo');
    }
  };
  
  if (loading) return <div>Cargando...</div>;
  if (!request) return <div>No se encontró la solicitud</div>;
  
  return (
    <div className="request-detail">
      <h2>{request.benefitName}</h2>
      <p>Código: {request.requestCode}</p>
      
      {request.attachments.length > 0 && (
        <div className="attachments">
          <h3>?? Adjuntos ({request.attachments.length})</h3>
          <ul>
            {request.attachments.map(att => (
              <li key={att.id}>
                <span>{att.fileName}</span>
                <span className="text-muted">({att.fileSizeFormatted})</span>
                <button onClick={() => handleDownload(att)}>
                  ?? Descargar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## ?? Recomendaciones de UI

### **Lista de Adjuntos**

```html
<div class="attachments-section">
  <h4>?? Adjuntos (3)</h4>
  
  <ul class="attachment-list">
    <li class="attachment-item">
      <div class="attachment-info">
        <span class="file-icon">??</span>
        <div class="file-details">
          <span class="file-name">acta_matrimonio.pdf</span>
          <span class="file-meta">PDF • 512 KB • Subido el 16/01/2025</span>
        </div>
      </div>
      <button class="btn-download" onclick="descargarAdjunto(42, 'acta_matrimonio.pdf')">
        ?? Descargar
      </button>
    </li>
    
    <li class="attachment-item">
      <div class="attachment-info">
        <span class="file-icon">???</span>
        <div class="file-details">
          <span class="file-name">foto_boda.jpg</span>
          <span class="file-meta">JPG • 1 MB • Subido el 16/01/2025</span>
        </div>
      </div>
      <button class="btn-download" onclick="descargarAdjunto(43, 'foto_boda.jpg')">
        ?? Descargar
      </button>
    </li>
  </ul>
</div>
```

---

### **Iconos por Tipo de Archivo**

```javascript
function getFileIcon(contentType) {
  if (contentType.includes('pdf')) return '??';
  if (contentType.includes('image')) return '???';
  if (contentType.includes('word') || contentType.includes('document')) return '??';
  if (contentType.includes('excel') || contentType.includes('spreadsheet')) return '??';
  return '??';
}
```

---

### **Vista Previa de Imágenes**

```html
<div class="attachment-preview">
  <!-- Para imágenes -->
  <img 
    :src="attachment.blobUrl" 
    :alt="attachment.fileName"
    @click="abrirModal(attachment)"
  />
  
  <!-- Para PDFs -->
  <iframe 
    :src="attachment.blobUrl"
    width="100%"
    height="600px"
  ></iframe>
  
  <!-- Para otros archivos -->
  <button @click="descargar(attachment)">
    ?? Descargar {{ attachment.fileName }}
  </button>
</div>
```

---

## ?? Flujo Completo

```javascript
// 1. Obtener solicitud con adjuntos
const request = await fetch('/api/v1/benefits/requests/123', {
  headers: { 'Authorization': `Bearer ${token}` }
}).then(r => r.json());

console.log('Solicitud:', request.data);
console.log('Adjuntos:', request.data.attachments);

// 2. Mostrar lista de adjuntos
request.data.attachments.forEach(att => {
  console.log(`?? ${att.fileName} (${att.fileSizeFormatted})`);
});

// 3. Descargar un adjunto específico
const attachmentId = request.data.attachments[0].id;
const fileName = request.data.attachments[0].fileName;

await descargarAdjunto(attachmentId, fileName, token);
```

---

## ? Testing con cURL

### Obtener Solicitud con Adjuntos
```bash
curl -X GET "https://localhost:7001/api/v1/benefits/requests/123" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Descargar Adjunto
```bash
curl -X GET "https://localhost:7001/api/v1/benefits/attachments/42/download" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  --output acta_matrimonio.pdf
```

---

## ?? Checklist de Implementación Frontend

### **Vista de Detalle de Solicitud:**
- [ ] Mostrar información básica de la solicitud
- [ ] Mostrar sección de adjuntos si existen
- [ ] Mostrar contador de adjuntos (ej: "?? 3 adjuntos")
- [ ] Listar cada adjunto con:
  - [ ] Icono según tipo de archivo
  - [ ] Nombre del archivo
  - [ ] Tamaño formateado
  - [ ] Fecha de subida
  - [ ] Botón de descarga
- [ ] Mostrar mensaje si no hay adjuntos

### **Funcionalidad de Descarga:**
- [ ] Implementar función de descarga
- [ ] Manejar errores de red
- [ ] Mostrar indicador de carga
- [ ] Validar permisos
- [ ] Mostrar mensaje de éxito/error

### **Vista Previa (Opcional):**
- [ ] Vista previa de imágenes
- [ ] Vista previa de PDFs (iframe)
- [ ] Modal de vista previa
- [ ] Zoom para imágenes

---

## ?? Manejo de Errores

### **Errores Comunes y Soluciones:**

| Error | Causa | Solución |
|-------|-------|----------|
| **404 - AttachmentNotFound** | ID de adjunto incorrecto | Verificar ID en BD |
| **403 - UnauthorizedAccess** | Usuario sin permisos | Solo empleado/jefe puede descargar |
| **500 - DownloadFailed** | Error en Azure Blob | Verificar conectividad y permisos |
| **CORS Error** | Frontend en otro dominio | Configurar CORS en backend |

---

## ?? Notas Importantes

1. **Los adjuntos vienen incluidos:**
   - Al consultar `GET /api/v1/benefits/requests/{id}`, los adjuntos ya vienen en el array `attachments`
   - No necesitas un endpoint separado para listar adjuntos

2. **Descarga directa:**
   - El endpoint de descarga retorna el archivo directamente (stream)
   - El navegador manejará la descarga automáticamente

3. **Permisos:**
   - Solo el empleado dueño o el jefe asignado pueden descargar
   - Otros usuarios recibirán error 403

4. **BlobUrl:**
   - El campo `blobUrl` contiene la URL completa en Azure Blob Storage
   - Puedes usarlo para vista previa de imágenes/PDFs
   - **Nota:** Las URLs SAS expiran después de cierto tiempo

---

## ?? Ejemplo de Datos Completos

```json
{
  "id": 123,
  "requestCode": "BEN-20250116-A1B2C3D4",
  "employeeName": "Juan Pérez",
  "benefitName": "Celebra tu matri",
  "status": 1,
  "statusName": "Pendiente",
  "attachments": [
    {
      "id": 42,
      "fileName": "acta_matrimonio.pdf",
      "contentType": "application/pdf",
      "fileSize": 524288,
      "fileSizeFormatted": "512 KB",
      "uploadDate": "2025-01-16T14:35:00Z",
      "uploadedBy": "juan.perez@empresa.com",
      "blobUrl": "https://starchivospolidev.blob.core.windows.net/cuponera/..."
    }
  ]
}
```

---

**Última actualización:** Enero 2025  
**Versión:** 1.0  
**Estado:** ? Documentado

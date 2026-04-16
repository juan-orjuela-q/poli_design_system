# ?? API de Tarjetas de Beneficios - Guía de Uso

## ?? Descripción

Endpoint para obtener las tarjetas de beneficios del portal del empleado con información de disponibilidad, uso y estado visual.

---

## ?? Información del Endpoint

**URL:** `GET /api/v1/benefits/cards`  
**Autenticación:** Bearer Token (requerido)  
**Permisos:** Ninguno específico (cualquier empleado autenticado)

---

## ?? Autenticación

```http
GET /api/v1/benefits/cards HTTP/1.1
Host: api.ejemplo.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ?? Request

**No requiere parámetros en el body o query string.**

El endpoint identifica automáticamente al empleado por el token JWT y devuelve solo los beneficios disponibles para su perfil.

---

## ?? Response Exitosa (200 OK)

```json
{
  "succeeded": true,
  "data": [
    {
      "benefitId": 3,
      "code": "FLEX_MED",
      "name": "Medio día para ti",
      "shortDescription": "Tómate medio día libre para descansar, hacer algo que disfrutes o cuidar de ti. Disponible hasta 4 veces al año.",
      "gridImageSasUrl": "https://storage.blob.core.windows.net/cuponera/imagenes/FLEX_MED_grid.jpg?sv=2021-06-08&...",
      "typeCode": 3,
      "typeName": "Mediodía Flexible",
      "statusCode": "DISPONIBLE",
      "statusName": "Disponible",
      "statusColor": "info",
      "usedCount": 1,
      "usageLimit": 4,
      "usageText": "1 de 4 usados. 3 restantes.",
      "canRequest": true,
      "cannotRequestReason": null,
      "lastRequestDate": "2023-12-10T14:20:00Z",
      "pendingRequestId": null
    }
  ],
  "error": null
}
```

---

## ?? Campos de la Respuesta

### **Información Básica**

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `benefitId` | `int` | ID único del beneficio | `3` |
| `code` | `string` | Código del beneficio | `"FLEX_MED"` |
| `name` | `string` | Nombre del beneficio | `"Medio día para ti"` |
| `shortDescription` | `string` | Descripción breve | `"Tómate medio día libre..."` |
| `gridImageSasUrl` | `string?` | URL temporal de imagen (válida 1 hora) | `"https://..."` o `null` |

### **Tipología**

| Campo | Tipo | Descripción | Valores |
|-------|------|-------------|---------|
| `typeCode` | `int` | Código numérico del tipo | `1-9` |
| `typeName` | `string` | Nombre del tipo de beneficio | `"Mediodía Flexible"`, `"Trabajo Remoto"`, etc. |

### **Estado**

| Campo | Tipo | Descripción | Valores Posibles |
|-------|------|-------------|------------------|
| `statusCode` | `string` | Código del estado | `DISPONIBLE`, `PENDIENTE_APROBACION`, `REDIMIDO`, `RECHAZADO`, `AGOTADO` |
| `statusName` | `string` | Nombre legible | `"Disponible"`, `"Pendiente de aprobación"`, etc. |
| `statusColor` | `string` | Color Bootstrap para badge | `info`, `warning`, `success`, `danger`, `secondary` |

### **Uso**

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `usedCount` | `int` | Veces usadas por el empleado | `1` |
| `usageLimit` | `int?` | Límite máximo de uso | `4` o `null` (sin límite) |
| `usageText` | `string` | Texto descriptivo | `"1 de 4 usados. 3 restantes."` |

### **Disponibilidad**

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `canRequest` | `bool` | Si puede solicitar actualmente | `true` / `false` |
| `cannotRequestReason` | `string?` | Razón de no disponibilidad | `"Ya agotaste este beneficio"` o `null` |
| `lastRequestDate` | `DateTime?` | Última solicitud aprobada | `"2023-12-10T14:20:00Z"` o `null` |
| `pendingRequestId` | `int?` | ID de solicitud pendiente | `456` o `null` |

---

## ?? Posibles Estados

### **DISPONIBLE** (`statusColor: info`)
- ? El empleado puede solicitar el beneficio
- Puede tener o no un límite de uso
- Puede haber sido usado previamente

**Ejemplo:**
```json
{
  "statusCode": "DISPONIBLE",
  "statusName": "Disponible",
  "statusColor": "info",
  "canRequest": true,
  "usageText": "1 de 4 usados. 3 restantes."
}
```

---

### **PENDIENTE_APROBACION** (`statusColor: warning`)
- ? Existe una solicitud pendiente
- No puede hacer nuevas solicitudes hasta que se resuelva
- Incluye `pendingRequestId` para consultar detalles

**Ejemplo:**
```json
{
  "statusCode": "PENDIENTE_APROBACION",
  "statusName": "Pendiente de aprobación",
  "statusColor": "warning",
  "canRequest": false,
  "cannotRequestReason": "Tienes una solicitud pendiente de aprobación",
  "pendingRequestId": 456
}
```

---

### **AGOTADO** (`statusColor: success`)
- ?? Ya alcanzó el límite de uso
- No puede volver a solicitarlo
- Muestra cuántas veces lo usó

**Ejemplo:**
```json
{
  "statusCode": "AGOTADO",
  "statusName": "Redimido",
  "statusColor": "success",
  "usedCount": 1,
  "usageLimit": 1,
  "canRequest": false,
  "cannotRequestReason": "Ya agotaste este beneficio",
  "usageText": "Ya usaste este beneficio."
}
```

---

### **RECHAZADO** (`statusColor: danger`)
- ? Su última solicitud fue rechazada
- Cooldown de 7 días antes de volver a solicitar
- Muestra días transcurridos desde el rechazo

**Ejemplo:**
```json
{
  "statusCode": "RECHAZADO",
  "statusName": "Rechazado",
  "statusColor": "danger",
  "canRequest": false,
  "cannotRequestReason": "Tu solicitud fue rechazada hace 3 día(s). Intenta nuevamente más tarde.",
  "usageText": "Tu solicitud fue rechazada. Consulta el motivo y vuelve a intentar."
}
```

---

## ? Respuestas de Error

### **401 Unauthorized**
Usuario no autenticado o token inválido.

```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Auth.Unauthorized",
    "description": "Usuario no autenticado"
  }
}
```

---

### **404 Not Found**
El empleado no existe en el sistema.

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

### **400 Bad Request**
El empleado no tiene un perfil asignado.

```json
{
  "succeeded": false,
  "data": null,
  "error": {
    "code": "Employee.NoProfile",
    "description": "El empleado no tiene un perfil asignado"
  }
}
```

---

## ?? Ejemplos de Uso

### **cURL**

```bash
curl -X GET "https://api.ejemplo.com/api/v1/benefits/cards" \
  -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### **JavaScript (Fetch)**

```javascript
fetch('https://api.ejemplo.com/api/v1/benefits/cards', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(response => response.json())
.then(data => {
  if (data.succeeded) {
    console.log('Beneficios:', data.data);
  }
});
```

---

### **TypeScript (Angular)**

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

getBenefitCards(): Observable<ApiResponse<BenefitCard[]>> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });
  
  return this.http.get<ApiResponse<BenefitCard[]>>(
    'https://api.ejemplo.com/api/v1/benefits/cards',
    { headers }
  );
}
```

---

### **C# (HttpClient)**

```csharp
using System.Net.Http;
using System.Net.Http.Headers;

var client = new HttpClient();
client.DefaultRequestHeaders.Authorization = 
    new AuthenticationHeaderValue("Bearer", token);

var response = await client.GetAsync(
    "https://api.ejemplo.com/api/v1/benefits/cards"
);

if (response.IsSuccessStatusCode)
{
    var content = await response.Content.ReadAsStringAsync();
    var result = JsonSerializer.Deserialize<ApiResponse<List<BenefitCard>>>(content);
}
```

---

### **Python (Requests)**

```python
import requests

headers = {
    'Authorization': f'Bearer {token}'
}

response = requests.get(
    'https://api.ejemplo.com/api/v1/benefits/cards',
    headers=headers
)

if response.status_code == 200:
    data = response.json()
    print(data['data'])
```

---

## ?? Mapeo de Colores Bootstrap

Para mostrar badges visuales en el frontend:

| Estado | Color Bootstrap | Clase CSS |
|--------|-----------------|-----------|
| DISPONIBLE | `info` | `badge bg-info` |
| PENDIENTE_APROBACION | `warning` | `badge bg-warning` |
| AGOTADO | `success` | `badge bg-success` |
| RECHAZADO | `danger` | `badge bg-danger` |

**Ejemplo HTML:**
```html
<span class="badge bg-{{card.statusColor}}">
  {{ card.statusName }}
</span>
```

---

## ?? Ciclo de Vida de un Beneficio

```
???????????????????
?   DISPONIBLE    ? ? Estado inicial
???????????????????
         ? (Empleado solicita)
         ?
???????????????????
?   PENDIENTE_    ? ? Esperando aprobación
?   APROBACION    ?
???????????????????
         ? (Jefe aprueba)
         ?
???????????????????
?   DISPONIBLE    ? ? Aprobado, usado 1 vez
?   (1 de 4)      ?
???????????????????
         ? (Solicita nuevamente)
         ?
???????????????????
?   AGOTADO       ? ? Alcanzó el límite
???????????????????

         ??????????????????
         ?   RECHAZADO    ? ? Si el jefe rechaza
         ?   (7 días)     ?
         ??????????????????
```

---

## ? Consideraciones Importantes

### **1. URL de Imágenes**
- Las URLs de `gridImageSasUrl` son temporales (válidas 1 hora)
- Se regeneran en cada petición al endpoint
- Si una imagen no existe, el campo será `null`

### **2. Cooldown de Rechazo**
- Si una solicitud es rechazada, el empleado no puede volver a solicitar el mismo beneficio durante **7 días**
- Después de 7 días, el estado vuelve a `DISPONIBLE`

### **3. Límites de Uso**
- Si `usageLimit` es `null`, el beneficio no tiene límite
- Si `usedCount >= usageLimit`, el estado será `AGOTADO`

### **4. Solicitudes Pendientes**
- Solo puede haber **una solicitud pendiente** por beneficio
- No puede hacer nuevas solicitudes hasta que se apruebe o rechace la pendiente

---

## ?? Casos de Uso Comunes

### **Mostrar Grilla de Beneficios**
```typescript
// Obtener y mostrar todas las tarjetas
this.benefitService.getBenefitCards().subscribe(response => {
  if (response.succeeded) {
    this.cards = response.data;
  }
});
```

### **Filtrar Solo Disponibles**
```typescript
const availableCards = cards.filter(card => card.canRequest);
```

### **Filtrar Pendientes**
```typescript
const pendingCards = cards.filter(
  card => card.statusCode === 'PENDIENTE_APROBACION'
);
```

### **Contar Beneficios Usados**
```typescript
const totalUsed = cards.reduce(
  (sum, card) => sum + card.usedCount, 0
);
```

---

## ?? Rate Limiting

**No hay límites específicos**, pero se recomienda:
- No hacer más de 1 petición por segundo
- Implementar caché local de 5 minutos
- Usar refresh manual en lugar de polling automático

---

## ?? Soporte Responsive

Las imágenes están optimizadas para diferentes tamaños:
- **Grid Image:** 400x300px (proporción 4:3)
- Formato: JPEG, PNG, WebP
- Tamaño máximo: 500KB

---

## ? Checklist de Implementación

- [ ] Obtener token de autenticación
- [ ] Hacer GET a `/api/v1/benefits/cards`
- [ ] Manejar respuesta exitosa (200)
- [ ] Manejar errores (401, 404, 400)
- [ ] Mostrar tarjetas en grilla
- [ ] Implementar badges de estado
- [ ] Manejar imágenes no disponibles
- [ ] Implementar indicadores de uso
- [ ] Agregar botones según estado
- [ ] Mostrar mensajes de no disponibilidad

---

**?? Documentación relacionada:**
- [Guía completa de implementación frontend](./BENEFIT_CARDS_API_DOCUMENTATION.md)
- [Resumen ejecutivo](./BENEFIT_CARDS_SUMMARY.md)

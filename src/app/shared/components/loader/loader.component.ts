import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * **Loader**
 *
 * Componente de carga del sistema de diseño del Politécnico Grancolombiano.
 * Muestra un indicador visual de carga con un mensaje personalizable.
 * Ideal para usar durante operaciones asíncronas o cuando se está esperando
 * una respuesta del servidor.
 *
 * ### Buenas prácticas
 * - Usa este componente cuando una operación tome más de 1 segundo
 * - Proporciona un mensaje descriptivo que indique qué se está cargando
 * - Para cargas largas, considera agregar información adicional sobre el progreso
 * - Usa **`size='small'`** para loaders inline, **`size='large'`** para pantallas completas
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  /** Mensaje que se muestra debajo del spinner */
  @Input() message = 'Cargando...';

  /** Tamaño del loader */
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  /** Si es true, el loader ocupa toda la pantalla con overlay */
  @Input() fullScreen = false;

  /** Cuando es true, muestra solo el spinner sin mensaje */
  @Input() minimal = false;
}

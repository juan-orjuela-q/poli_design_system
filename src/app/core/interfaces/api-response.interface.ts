// Interfaces basadas en la documentación del backend PoliAccess.Back

/**
 * Respuesta exitosa del API - Basada en ApiResponse<T>
 */
export interface ApiResponse<T = any> {
  succeeded: boolean;
  message?: string | null;
  errors?: string[] | null;
  data?: T | null;
}

/**
 * Respuesta de error del API - Basada en ProblemDetails (RFC 7807)
 */
export interface ProblemDetails {
  status: number;
  title: string;
  detail: string;
  instance?: string;
  traceId?: string;
  errors?: ValidationError[];
  debug?: DebugInfo;
}

/**
 * Error de validación específico
 */
export interface ValidationError {
  propertyName: string;
  errorMessage: string;
}

/**
 * Información de debug (solo en desarrollo/QA)
 */
export interface DebugInfo {
  type: string;
  message: string;
  source: string;
  stackTrace: string[];
  innerException?: any;
}

/**
 * Tipo unión para manejar ambos tipos de respuesta
 */
export type ApiResponseOrError<T = any> = ApiResponse<T> | ProblemDetails;

/**
 * Tipos de mensajes para el componente
 */
export type MessageType = 'success' | 'error' | 'warning' | 'info';

/**
 * Configuración del mensaje para mostrar
 */
export interface MessageConfig {
  type: MessageType;
  title?: string;
  message: string;
  details?: string[];
  traceId?: string;
  autoClose?: boolean;
  duration?: number;
}

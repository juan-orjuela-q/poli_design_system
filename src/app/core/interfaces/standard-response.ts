export interface StandardResponse<Interface> {
  title: string;
  status: number;
  detail: string;
  data?: Interface;
  instance: string;
  traceId: string;
  debug?: DebugInfo;
  succeeded: boolean;
}

export interface DebugInfo {
  type: string;
  message: string;
  source: string;
  stackTrace: string[];
  innerException?: DebugInfo | null;
}

import { RoutePermissions } from "./route-permissions .interface";

export interface RouteDefinition {
  label: string;
  route?: string;
  icon: string;
  moduleKey?: string;
  permissions?: RoutePermissions;
  children?: RouteDefinition[];
}
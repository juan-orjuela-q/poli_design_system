import { RouteDefinition } from "@layout/interfaces/route-definition.interface";

export const SYSTEM_ROUTES = {
  dashboard: {
    label: 'Dashboard',
    route: '/admin/dashboard',
    icon: 'dashboard',
    permissions: {
    }
  }
} satisfies Record<string, RouteDefinition>;

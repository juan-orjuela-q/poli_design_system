export interface RoutePermissions {
  access?: string;
  list?: string;
  create?: string;
  update?: string;
  delete?: string;
  [key: string]: string | undefined;
}
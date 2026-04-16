export interface NavLink {
    label: string;
    route?: string;
    icon?: string;
    children?: NavLink[];
    moduleKey?: string; // para agrupación jerárquica
    permissions?: {
        access?: string;      // permiso base para mostrar la ruta
        list?: string;
        create?: string;
        update?: string;
        delete?: string;
        [key: string]: string | undefined; // para que sea dinámico y poder crear permisos personalizados como "export, etc.."
    };
}

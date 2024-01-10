import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'home',
        icon: 'fal fa-home',
        label: 'Dashboard'
    },
    {
        routeLink: 'statistics',
        icon: 'fal fa-chart-bar',
        label: 'Statistics'
    },
    // {
    //     routeLink: 'coupens',
    //     icon: 'fal fa-tags',
    //     label: 'Coupens',
    //     items: [
    //         {
    //             routeLink: 'coupens/list',
    //             label: 'List Coupens'
    //         },
    //         {
    //             routeLink: 'coupens/create',
    //             label: 'Create Coupens'
    //         }
    //     ]
    // },
    {
        routeLink: 'paginas',
        icon: 'fal fa-file',
        label: 'Pages'
    },
    {
        routeLink: 'media',
        icon: 'fal fa-camera',
        label: 'Media'
    },
    {
        routeLink: 'Ajustes',
        icon: 'fal fa-cog',
        label: 'Ajustes',
        expanded: true,
        items: [
            {
                routeLink: 'settings/profile',
                label: 'Perfil'
            },
            {
                routeLink: 'settings/customize',
                label: 'Configuración'
            }
        ]
    },
    {
    routeLink: 'login',
    icon: 'fal fa-sign-out',
    label: 'Cerrar sesion',
    }
];

import { ComponentType } from 'react';
import { MdHome, MdLayers } from 'react-icons/md';
import { FaSchool } from 'react-icons/fa6';

export interface IRoute {
    path: string;
    name: string;
    icon?: ComponentType<{ width: string; height: string; color: string; }>;
    collapse?: boolean;
}

export const routes: IRoute[] = [
    {
        name: 'Dialogue Generator',
        path: '/dialogue-generator',
        icon: MdHome,
        collapse: false
    },
    {
        name: 'My Content',
        path: '/my-content',
        icon: MdLayers,
        collapse: false
    },
    {
        name: 'My School',
        path: '/my-school',
        icon: FaSchool,
        collapse: false
    }
];

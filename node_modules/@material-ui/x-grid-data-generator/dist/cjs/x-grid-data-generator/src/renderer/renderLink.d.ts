import * as React from 'react';
import { CellParams } from '@material-ui/x-grid';
interface DemoLinkProps {
    href: string;
    children: string;
}
export declare const DemoLink: React.NamedExoticComponent<DemoLinkProps>;
export declare function renderLink(params: CellParams): JSX.Element;
export {};

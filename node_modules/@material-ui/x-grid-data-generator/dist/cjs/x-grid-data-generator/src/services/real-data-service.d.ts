import { ColDef, RowId } from '@material-ui/x-grid';
export interface DataRowModel {
    id: RowId;
    [field: string]: any;
}
export interface GridData {
    columns: ColDef[];
    rows: DataRowModel[];
}
export declare function getRealData(rowLength: number, columns: any[]): Promise<GridData>;

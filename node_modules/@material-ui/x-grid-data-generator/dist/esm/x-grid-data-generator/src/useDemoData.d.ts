import { GridData } from './services/real-data-service';
export declare type DemoDataReturnType = {
    data: GridData;
    setRowLength: (count: number) => void;
    loadNewData: () => void;
};
declare type DataSet = 'Commodity' | 'Employee';
export interface DemoDataOptions {
    dataSet: DataSet;
    rowLength: number;
    maxColumns?: number;
}
export declare const useDemoData: (options: DemoDataOptions) => DemoDataReturnType;
export {};

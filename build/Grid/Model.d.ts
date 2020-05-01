/// <reference types="react" />
export interface ICatodcolumnDefs<T> {
    title: React.FunctionComponent | React.ReactNode | string | number;
    key: string;
    sortable?: boolean;
    displayValue(data: T): React.FunctionComponent | React.ReactNode | string | number | boolean;
}
export interface ICatodActions<T> {
    title: string;
    icon: string;
    actionFn?(data?: T): void;
}
export interface ICattodGridProps<T> {
    columnDef: Array<ICatodcolumnDefs<T>>;
    dataRow: T[];
    actions?: ICatodActions<T>[];
    message?: string | React.ReactElement | React.ReactNode;
    direction?: "right" | "left";
    onSort?(sorts: IDefaultSort[]): void;
    defaultSort?: IDefaultSort[];
    multiSort?: boolean;
    className?: string;
}
export interface IDefaultSort {
    sortType: "ascending" | "descending" | "none";
    columnKey: string;
}
export interface ISort {
    sortType: "ascending" | "descending" | "none";
}

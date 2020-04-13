import * as React from "react";
import { ICatodcolumnDefs, ICatodActions, ICattodGridProps, IDefaultSort } from "./Grid/Model";
export interface Catodcolumn<T> extends ICatodcolumnDefs<T> {
}
export interface CatodActions<T> extends ICatodActions<T> {
}
export interface CatodDefaultSort extends IDefaultSort {
}
export declare class CatodGrid<T> extends React.Component<ICattodGridProps<T>> {
    render(): JSX.Element;
}

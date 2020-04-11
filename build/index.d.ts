import * as React from "react";
import { ICatodcolumnDefs, ICatodActions, ICattodGridProps } from "./Grid/Model";
export interface Catodcolumn<T> extends ICatodcolumnDefs<T> {
}
export interface CatodActions<T> extends ICatodActions<T> {
}
export declare class CatodGrid<T> extends React.Component<ICattodGridProps<T>> {
    render(): JSX.Element;
}

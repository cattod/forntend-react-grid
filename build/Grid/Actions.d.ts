import { Component } from "react";
import { ICatodActions, ICatodcolumnDefs } from "./Model";
interface IProps<T> {
    rowData: T;
    colDef: ICatodcolumnDefs<T>;
    actionsCatod: ICatodActions<T>[];
}
export declare class Actions<T> extends Component<IProps<T>> {
    render(): JSX.Element;
}
export {};

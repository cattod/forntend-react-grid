import { Component } from "react";
import { ICatodActions, ICatodcolumnDefs } from "./Model";
import "./grid.scss";
interface IProps<T> {
    columnDef?: Array<ICatodcolumnDefs<T>>;
    dataRow?: T[];
    actions?: ICatodActions<T>[];
    message?: string;
}
interface IState<T> {
    loading: boolean;
    headerDef: Array<ICatodcolumnDefs<T>> | undefined;
    message: string;
    textAlign: boolean;
}
export declare class Grid<T> extends Component<IProps<T>, IState<T>> {
    _textAlign: boolean;
    constructor(props: IProps<T>);
    componentDidMount(): void;
    createHeader: (newData: T[]) => ICatodcolumnDefs<T>[];
    tableRow<T, K extends keyof T>(rowData: T, colDef: ICatodcolumnDefs<T>, key: K, actions?: ICatodActions<T>[]): {} | null | undefined;
    render(): JSX.Element;
}
export {};

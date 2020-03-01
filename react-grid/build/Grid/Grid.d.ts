import { Component } from "react";
import { ICatodActions, ICatodcolumnDefs, ISort } from "./Model";
import "./grid.scss";
interface IProps<T> {
    columnDef?: Array<ICatodcolumnDefs<T>>;
    dataRow?: T[];
    actions?: ICatodActions<T>[];
    message?: string;
}
interface IState<T> {
    dataRow?: T[];
    loading: boolean;
    headerDef: Array<ICatodcolumnDefs<T>> | undefined;
    message: string;
    textAlign: boolean;
    sortType: ISort;
}
export declare class Grid<T> extends Component<IProps<T>, IState<T>> {
    _textAlign: boolean;
    constructor(props: IProps<T>);
    componentDidUpdate(prevProps: IProps<T>): void;
    componentDidMount(): void;
    createHeader: (newData: T[]) => ICatodcolumnDefs<T>[];
    tableRow(rowData: T, colDef: ICatodcolumnDefs<T>, key: string, actions?: ICatodActions<T>[]): {} | null | undefined;
    sortHandle: (sortType: ISort, onSort: ((sortType: "none" | "ascending" | "descending") => T[]) | undefined) => void;
    selectSortType: (data: ICatodcolumnDefs<T>) => string | JSX.Element | undefined;
    sortSvg: (data: ICatodcolumnDefs<T>) => JSX.Element;
    upSvg: (data: ICatodcolumnDefs<T>) => JSX.Element;
    downSvg: (data: ICatodcolumnDefs<T>) => JSX.Element;
    render(): JSX.Element;
}
export {};

import React, { Component } from "react";
import { ICatodActions, ICatodcolumnDefs, ISort, ICattodGridProps, IDefaultSort } from "./Model";
import "./grid.scss";
interface IProps<T> extends ICattodGridProps<T> {
}
interface IState<T> {
    headerDef: Array<ICatodcolumnDefs<T>> | undefined;
    message: string;
    textAlign: boolean;
    sortType: IDefaultSort[];
    lastSortType: IDefaultSort[];
}
declare class Grid1<T> extends Component<IProps<T>, IState<T>> {
    constructor(props: IProps<T>);
    /**
  * prepare component after mounting componet.
  * fix direction of the component for stylesheet
  * prepare actions column if there is actions in props
  *
  * @remarks
  * This method is part of the {@link core-library#React | React subsystem}.
  *
  *
  * @beta
  */
    componentDidMount(): void;
    /**
   * Returns cell value to display
.
   *
   * @remarks
   * This method is part of the {@link core-library#Grid | Grid subsystem}.
   *
   * @param rowData - The first input <T>
   * @param colDef - The second input ICatodcolumnDefs<T>
   * @param key - The third input string
   * @param actions - The forth input ICatodActions<T>[]
   * @returns - The displayable value
   *
   * @beta
   */
    rowCell: (rowData: T, colDef: ICatodcolumnDefs<T>, key: string, actions?: ICatodActions<T>[] | undefined) => string | number | boolean | {} | React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | React.ReactNodeArray | React.ReactPortal | React.FunctionComponent<{}> | null | undefined;
    /**
  * Run onSort function in props and update sort type for column.
  *
  * @remarks
  * This method is called when sort icon clicked.
  *
  * @param sortType - The first input ISort
  * @param key - The second input string
  *
  * @beta
  */
    sortHandle(sortType: ISort, key: string): Promise<void>;
    /**
  * Returns header value to display.
  * Add sort icon to header of table for sortable column and set header title
  *
  * @remarks
  * This method is part of the {@link core-library#Grid | Grid subsystem}.
  *
  * @param data - The first input  ICatodcolumnDefs<T>
  * @returns - The displayable value in the header of every column
  *
  * @beta
  */
    selectSortType: (data: ICatodcolumnDefs<T>) => {} | null | undefined;
    /**
* Returns svg for unsort icon.
*
* @remarks
* This method is part of the {@link core-library#Grid | Grid subsystem}.
*
* @param data - The first input  ICatodcolumnDefs<T>
* @returns - The svg for unsort icon.
*
* @beta
*/
    unsortSVG: (data: ICatodcolumnDefs<T>) => JSX.Element;
    /**
* Returns svg for descending sort icon.
*
* @remarks
* This method is part of the {@link core-library#Grid | Grid subsystem}.
*
* @param data - The first input  ICatodcolumnDefs<T>
* @returns - The svg for descending sort icon.
*
* @beta
*/
    upSvg: (data: ICatodcolumnDefs<T>) => JSX.Element;
    /**
* Returns svg for ascending sort icon.
*
* @remarks
* This method is part of the {@link core-library#Grid | Grid subsystem}.
*
* @param data - The first input  ICatodcolumnDefs<T>
* @returns - The svg for ascending sort icon.
*
* @beta
*/
    downSvg: (data: ICatodcolumnDefs<T>) => JSX.Element;
    /**
* Returns the displayable xhtml for different condition.
*
* @remarks
* This method is part of the {@link core-library#Grid | Grid subsystem}.
*
* @returns - The displayable xhtml for different condition.
*
* @beta
*/
    displayGrid: () => JSX.Element;
    /**
* Returns the displayable data table.
*
* @remarks
* This method is part of the {@link core-library#Grid | Grid subsystem}.
*
* @returns - The displayable data table.
*
* @beta
*/
    tableGrid: () => JSX.Element;
    render(): JSX.Element;
}
export declare const Grid: React.MemoExoticComponent<typeof Grid1>;
export {};

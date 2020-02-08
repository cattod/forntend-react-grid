import * as React from "react";
import Grid from "./components/Grid"
import {ICattodGridProps, IMessage,ICatodcolumnDefs , ICatodActions} from "./components/Models"
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
// import "@ag-grid-community/all-modules/dist/styles/ag-theme-bootstrap.css";
// import "./styles/GridStyle.scss"

export interface CatodGridProps<T> extends ICattodGridProps<T>{}
export interface Message extends IMessage{}
export interface Cattodcolumn<T> extends ICatodcolumnDefs<T>{}
export interface CattodActions<T> extends ICatodActions<T>{}


export class CatodGrid<T> extends React.Component<ICattodGridProps<T>> {
  render() {
   

    return <Grid 
    columnDef = {this.props.columnDef}
    dataRow = {this.props.dataRow}
    actions = {this.props.actions}
    rowNumber = {this.props.rowNumber}
    height = {this.props.height}
    message = {this.props.message}
    />;
  }
}

export class gholi {

}
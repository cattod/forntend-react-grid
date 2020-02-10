import * as React from "react";
import Grid from "./Grid/Grid"
import {ICattodGridProps, IMessage,ICatodcolumnDefs , ICatodActions} from "./Grid/Models"

export interface CatodGridProps<T> extends ICattodGridProps<T>{}
export interface Message extends IMessage{}
export interface Catodcolumn<T> extends ICatodcolumnDefs<T>{}
export interface CatodActions<T> extends ICatodActions<T>{}


export class CatodGrid<T> extends React.Component<ICattodGridProps<T>> {
  render() {
   

    return (
<Grid 
    columnDef = {this.props.columnDef}
    dataRow = {this.props.dataRow}
    actions = {this.props.actions}
    rowNumber = {this.props.rowNumber}
    height = {this.props.height}
    message = {this.props.message}
    />
    ) ;
  }
}

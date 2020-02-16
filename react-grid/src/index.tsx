import * as React from "react";
import {Grid} from "./Grid/Grid"
import {ICatodcolumnDefs , ICatodActions, ICattodGridProps} from "./Grid/Model"


export interface Catodcolumn<T> extends ICatodcolumnDefs<T>{}
export interface CatodActions<T> extends ICatodActions<T>{}


export class CatodGrid<T> extends React.Component<ICattodGridProps<T>> {
  render() {
   

    return (
<Grid 
    columnDef = {this.props.columnDef}
    dataRow = {this.props.dataRow}
    actions = {this.props.actions}
    message = {this.props.message}
    />
    ) ;
  }
}

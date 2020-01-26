import React , {Component} from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import {columnDefs, IActions} from "./model"
import {defineCol, addActionToGrid,defineColAction} from "./utils"
 import { AllCommunityModules } from "@ag-grid-community/all-modules";
//import {AllModules} from '@ag-grid-enterprise/all-modules';
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import {Actions} from "./Actions"
import { Module } from '@ag-grid-community/core';
import "./style.scss"

interface IState<T,P>{
    columnDefs:Array <columnDefs<T>> 
    rowData: T[]
    frameworkComponents?:any
    modules: any//Module[]|undefined
}

interface IProps<T,P>{
    columnDefs?:Array <columnDefs<T>>  
    rowData?:T[]
    frameworkComponents?:P|undefined
    actions ?: IActions<T>[]
  
}

export class CatodGrid<T,P> extends Component<IProps<T,P>,IState<T,P>> {
    constructor(props:IProps<T,P>) {
        super(props);
        this.state = {
          modules:AllCommunityModules,
          columnDefs: [],
          rowData: [],
          frameworkComponents: this.props.frameworkComponents

        }
      }

    

      componentDidMount() {
       this.checkActions()
        
      }




checkCOlDef(hasChanged:boolean) {
  if (hasChanged && this.props.columnDefs){
    let result = defineColAction(this.props.columnDefs, this.props.actions)
    this.setState({columnDefs:  result})
  }

   else if (!hasChanged && this.props.columnDefs){
   return
  }

   else if (hasChanged && this.props.columnDefs===undefined){
    let result= addActionToGrid(this.props.rowData, this.props.actions)
    this.setState({ columnDefs:  result})
  }
   else if (!hasChanged && this.props.columnDefs===undefined) {
    let result = defineCol(this.props.rowData)
       this.setState({columnDefs:  result})
  }

}
checkActions() {
  let hasChanged:boolean = false
  if (this.props.actions) {

    hasChanged = true
  } 
  this.checkCOlDef(hasChanged)



}

fixRendered = () => {
  let newss = this.props.frameworkComponents
  if (this.props.actions)
return  {...newss,Actions:Actions}
else {
    return newss
}
}
    render() {

        return(
            <div className="ag-theme-balham catod-grid-size">
     
            <AgGridReact
             modules={this.state.modules}
             rowClass ="hoverRow"
                columnDefs={this.state.columnDefs}
               rowData={this.props.rowData}
              frameworkComponents={this.fixRendered()}
              >
            </AgGridReact>
          </div>
        )
    }

}







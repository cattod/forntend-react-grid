import React , {Component} from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import {ICatodcolumnDefs, IActions,IColumnDefs} from "./model"
import {defineColByRow, addActionToGrid, changeCatodColDefToAG, definItem} from "./utils"
 import { AllCommunityModules } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";
import {Actions} from "./Actions"
import { Module } from '@ag-grid-community/core';
import "./style.scss"

interface IState<T>{
    columnDefs:Array<IColumnDefs<T>>|undefined
    rowData: Array<T|T&{[x:string]:string|boolean|number}>
    frameworkComponents?:{[key:string]:React.FunctionComponent|React.ReactNode}

}

interface IProps<T>{
  columnDef?:Array <ICatodcolumnDefs<T>>  
    dataRow:T[]
    actions ?: IActions<T>[]
    footer?:React.FunctionComponent|React.ReactNode
    rowNumber?: number

}

export class CatodGrid<T> extends Component<IProps<T>,IState<T>> {
    constructor(props:IProps<T>) {
        super(props);
        this.state = {
         // modules:AllCommunityModules,
          columnDefs: [],
          rowData: this.props.dataRow,
          frameworkComponents: undefined

        }
      }

    

      componentDidMount() {
     //  this.checkActions()
     //  console.log(  this.fixColumnDef(this.props.columnDef))
        this.fixColumnDef(this.props.columnDef)
      }

      fixColumnDef = (data:Array<ICatodcolumnDefs<T>>|undefined):void=>{
        
        let aa = definItem(this.props.dataRow)
        let newData:Array<T|T&{[x:string]:string|boolean|number}> = this.state.rowData
        let newFrame :{[key:string]:React.FunctionComponent|React.ReactNode}|undefined |{}= this.state.frameworkComponents
        // if (newData[0]) {
          let newCol:Array<IColumnDefs<T>>|undefined = data?.map((item:ICatodcolumnDefs<T>,index:number)=>{
            
            if (item.valueGetter){
             
             newData =  newData.map((item1:T|T&{[x:string]:string|boolean|number},index:number)=>{
              if (item.valueGetter) {
                return {...item1,[item.key]: item.valueGetter(item1)}
              }
         
              return {...item1}
        
            })
            
            this.setState({rowData:newData})
            // return({headerName:item.title,  field : item.key})  
              
            }
            if (item.displayValue) {
            //  {...newFrame,[item.key]:definItem.displayValue()}
            newFrame = {...newFrame, [item.key]:item.displayValue()}
              return({headerName:item.title,  field : item.key,   cellRenderer: item.key})
            
            }
            return({headerName:item.title,  field : item.key})   
                    
          })
          console.log(newCol,newFrame)
      this.setState({columnDefs:newCol, frameworkComponents:newFrame})
        //  return newCol
        // }
    

      }




checkCOlDef(hasChanged:boolean) {

  if (hasChanged && this.props.columnDef!==undefined){

    let result = changeCatodColDefToAG(this.props.columnDef)
    this.setState({columnDefs:  result})
  }

   else if (!hasChanged && this.props.columnDef!==undefined){
   return
  }

   else if (hasChanged && this.props.columnDef===undefined){
    let result= addActionToGrid(this.props.dataRow, this.props.actions)
    this.setState({ columnDefs:  result})
  }
   else if (!hasChanged && this.props.columnDef===undefined) {
   
    let result =defineColByRow (this.props.dataRow)
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
  let newFrame :{[key:string]:React.FunctionComponent|React.ReactNode}|undefined |{} = this.state.frameworkComponents
    let newCol:Array<IColumnDefs<T>>|undefined = this.props.columnDef?.map((item:ICatodcolumnDefs<T>,index:number)=>{
      
     
      if (item.displayValue) {
      newFrame = {...newFrame, [item.key]:item.displayValue()}
        return({headerName:item.title,  field : item.key,   cellRenderer: item.key})
      
      }
      return({headerName:item.title,  field : item.key})   
              
    })
return newFrame
}
    render() {
        return(
            <div className="ag-theme-balham catod-grid-size">
     
            <AgGridReact
             //modules={this.state.modules}
            columnDefs={this.state.columnDefs}
               rowData={this.state.rowData}
              frameworkComponents={this.fixRendered()}
              suppressMenuHide={true}
              >
            </AgGridReact>
          </div>
        )
    }

}







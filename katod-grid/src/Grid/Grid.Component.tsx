import React , {Component} from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import {columnDefs} from "./model"
import {defineCol} from "./utils"

interface IState<T>{
    columnDefs:Array <columnDefs> 
    rowData: T[]
}

interface IProps<T,P>{
    columnDefs?:Array <columnDefs>  
    rowData?:T[]
    frameworkComponents:P
}

export class CatodGrid<T,P> extends Component<IProps<T,P>,IState<T>> {
    constructor(props:IProps<T,P>) {
        super(props);
        this.state = {
          columnDefs: [],
          rowData: []
        }
      }


      componentDidMount() {
        if (this.props.columnDefs) {
          this.setState({columnDefs:this.props.columnDefs})
        } else{
          this.setState({columnDefs: defineCol(this.props.rowData)})
        }
        
      }


    render() {
        return(
            <div className="ag-theme-balham" style={ {height: '200px', width: '600px'} }>
            <AgGridReact
                columnDefs={this.state.columnDefs}
               rowData={this.props.rowData}
              frameworkComponents={this.props.frameworkComponents}
              >
            </AgGridReact>
          </div>
        )
    }

}







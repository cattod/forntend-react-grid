import React, { Component } from "react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import { ICatodcolumnDefs, ICatodActions, IAgColumnDefs, IMessage } from "./model"
import { AllCommunityModules, GridReadyEvent } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-bootstrap.css";
import { Actions } from "./Actions"
import { Module, GridApi, ColumnApi } from '@ag-grid-community/core';

import "./style.scss"


interface IGridApi extends GridApi {

  setDomLayout(domLayout: string): void;

}

interface IState<T> {
  columnDefs: Array<IAgColumnDefs<T>> | undefined
  rowData: Array<T | T & { [x: string]: string | boolean | number }>
  frameworkComponents?: { [key: string]: React.FunctionComponent | React.ReactNode }
  modules?: Module[] | undefined | any
  messageEmptyData:string 
  messageLoading:string
}

interface IProps<T> {
  columnDef?: Array<ICatodcolumnDefs<T>>
  dataRow?: T[]
  actions?: ICatodActions<T>[]
  rowNumber?: number
  height?: string
  message?:IMessage

}

export class CatodGrid<T> extends Component<IProps<T>, IState<T>> {
  gridApi: GridApi | null | undefined;
  gridColumnApi: ColumnApi | null | undefined;
  constructor(props: IProps<T>) {
    super(props);
    this.state = {
      modules: AllCommunityModules,
      columnDefs: [],
      rowData: this.props.dataRow?this.props.dataRow:[],
      frameworkComponents: undefined,
      messageEmptyData:this.props.message?.emptyData?this.props.message.emptyData:"There is not any data",
      messageLoading:this.props.message?.loading?this.props.message.loading:"Loading ..."

    }
  }



  componentDidMount() {
    this.fixColumnDef(this.props.columnDef)
  }
  componentDidUpdate(prevProps:IProps<T>, prevState:IState<T>) {
    
    if (this.props.dataRow !== prevProps.dataRow) {
      this.fixColumnDef(this.props.columnDef)
  
      
    }
  }

  fixColumnDef = (data: Array<ICatodcolumnDefs<T>> | undefined): void => {
    let newData: Array<T | T & { [x: string]: string | boolean | number }>|undefined = this.props.dataRow
    let newFrame: { [key: string]: React.FunctionComponent | React.ReactNode } | undefined | {} = this.state.frameworkComponents
    let newCol: Array<IAgColumnDefs<T>> | undefined = data?.map((item: ICatodcolumnDefs<T>, index: number) => {

      if (item.valueGetter&& newData) {

        newData = newData.map((item1: T | T & { [x: string]: string | boolean | number }, index: number) => {
          if (item.valueGetter) {
            return { ...item1, [item.key]: item.valueGetter(item1) }
          }

          return { ...item1 }

        })

        this.setState({ rowData: newData })

      }
      if (item.displayValue) {
        newFrame = { ...newFrame, [item.key]: item.displayValue() }
        return ({ headerName: item.title, field: item.key, cellRenderer: item.key })

      }
      return ({ headerName: item.title, field: item.key })

    })
    if (this.props.actions) {
      newFrame = { ...newFrame, actions: Actions }
      newCol?.push({
        headerName: "", field: "actions", cellRenderer: "actions",
        cellEditorFramework: this.props.actions
      })
    }

    this.setState({ columnDefs: newCol, frameworkComponents: newFrame })

  }





  fixRendered = () => {
    let newFrame: { [key: string]: React.FunctionComponent | React.ReactNode } | undefined | {} = this.state.frameworkComponents
    this.props.columnDef?.map((item: ICatodcolumnDefs<T>) => {
      if (item.displayValue) {
        newFrame = { ...newFrame, [item.key]: item.displayValue() }
      }
    })
    if (this.props.actions) {
      newFrame = { ...newFrame, actions: Actions }
    }
    return newFrame
  }
  onGridReady = (event: GridReadyEvent | any): void => {
    this.gridColumnApi = event.columnApi;
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;
    if (this.gridApi)
      this.gridApi.setDomLayout("normal");
    event.api.sizeColumnsToFit();
    window.addEventListener("resize", function () {
      setTimeout(function () {
        event.api.sizeColumnsToFit();
      });
    });

    event.api.sizeColumnsToFit();

  };

  render() {
    const element :any= document.querySelector('.parent-style')
    // var element:any = document.querySelector('.jsCSS');
//var con = element?.computedStyleMap().get('margin');
// console.log(element,"css");

 const style:any = element?getComputedStyle(element):""

console.log(style.direction)
    return (
      <div
      className="ag-theme-bootstrap parent-style">
        <div className="catod-container" style={{ height: this.props.height ? this.props.height : "400px" }}>


          <div id="center">
            <div
              id="myGrid"
              className="catod-grid-size"
            >
              <AgGridReact
                modules={this.state.modules}
                columnDefs={this.state.columnDefs}
                rowData={this.state.rowData}
                frameworkComponents={this.fixRendered()}
                animateRows={true}
                enableRtl={style.direction==="rtl"?true:false}
                onGridReady={this.onGridReady}
                overlayLoadingTemplate={this.state.messageLoading}
                overlayNoRowsTemplate={this.state.messageEmptyData}
              />
            </div>
          </div>

        </div>
      </div>
    )
  }

}


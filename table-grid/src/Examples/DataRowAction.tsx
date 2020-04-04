import React from 'react';
import {Grid} from "../Grid/Grid"
import {ICatodActions} from "../Grid/Model"

interface IDataRow{
    make:string,
    model:string,
    price:number,
    date: string,
    rate: number
}

interface IProps{
}

interface IState {
    dataRow:IDataRow[]
    action:ICatodActions<IDataRow>[] 
}


class DataRowAction extends React.Component <IProps,IState>{
    constructor(props:IProps){
        super(props)
        this.state = {
            dataRow :[
                { make: "Toyota", model: "Camery", price: 62000, date:"2020/01/01", rate:4},
                { make: "Ford", model: "Mondeo", price: 32000 , date:"2018/01/01", rate:5},
                { make: "Porsche", model: "Boxter", price: 72000, date:"20190/01/01", rate:3 }],
                action:[  {title:"Delete" , key : "Delete" , icon: "trash-alt"},
                {title:"Add"  , icon: "trash-alt"},
                {title:"Refresh" ,  icon: "edit", actionFn:(data:IDataRow)=>{this.addRow(data)}},
                {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:IDataRow)=>{this.addRow(data)}},
             ]
        }
    }

    addRow = (data:IDataRow)=>{
        console.log(data)
      
      }
      
  render() {
    return (
    <div></div>
        
            // <Grid
            // dataRow={this.state.dataRow}
            // actions={this.state.action}
            // />
      
     
    );
  }

}
export {DataRowAction}
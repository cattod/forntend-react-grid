import React from 'react';
import {Grid} from "../Grid/Grid"

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
}


class DataRowExample extends React.Component <IProps,IState>{
    constructor(props:IProps){
        super(props)
        this.state = {
            dataRow :[
                { make: "Toyota", model: "Camery", price: 62000, date:"2020/01/01", rate:4},
                { make: "Ford", model: "Mondeo", price: 32000 , date:"2018/01/01", rate:5},
                { make: "Porsche", model: "Boxter", price: 72000, date:"20190/01/01", rate:3 }],
        }
    }
  render() {
    return (
    
        
            // <Grid
            // dataRow={this.state.dataRow}
            // />
      <div></div>
     
    );
  }

}
export {DataRowExample}
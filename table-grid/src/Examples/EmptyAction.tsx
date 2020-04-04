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
    actions:Array<ICatodActions<{}>>
}


class EmptyAction extends React.Component <IProps,IState>{
    constructor(props:IProps){
        super(props)
        this.state = {
            actions: [
                {title:"Delete" , key : "Delete" , icon: "trash-alt"
            },
                {title:"Edit" , key : "edit" , icon: "edit"
            },
                
                ],
        }
    }
  render() {
    return (
    
        <div></div>
            // <Grid
            // actions={this.state.actions}
            // />
      
     
    );
  }

}
export {EmptyAction}
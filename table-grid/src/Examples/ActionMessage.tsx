import React from 'react';
import {Grid} from "../Grid/Grid"
import {ICatodActions} from "../Grid/Model"



interface IProps{
}

interface IState {
    
    action:ICatodActions<{}>[] 
}


class ActionMessage extends React.Component <IProps,IState>{
    constructor(props:IProps){
        super(props)
        this.state = {
                action:[  {title:"Delete" , key : "Delete" , icon: "trash-alt"},
                {title:"Add"  , icon: "trash-alt"},
                {title:"Refresh" ,  icon: "edit", actionFn:(data:{})=>{this.addRow(data)}},
                {title:"Edit" , key : "edit" , icon: "edit", actionFn:(data:{})=>{this.addRow(data)}},
             ]
        }
    }

    addRow = (data:{})=>{
        console.log(data)
      
      }
      
  render() {
      const message = "there is not any data!!!"
    return (
    <div></div>
        
            // <Grid
            // actions={this.state.action}
            // message = {message}
            // />
      
     
    );
  }

}
export {ActionMessage}
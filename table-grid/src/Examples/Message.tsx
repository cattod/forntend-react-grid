import React from 'react';
import {Grid} from "../Grid/Grid"

interface IProps{
}

interface IState {
}


 
class Message extends React.Component <IProps,IState>{
  render() {
  
      const message = "هیچ داده ای وجود ندارد!"
    return (
    <div></div>
        
            // <Grid
            // message={message}
            // />
      
     
    );
  }

}
export {Message}
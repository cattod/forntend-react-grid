import React from 'react';
import {Grid} from "../Grid/Grid"

interface IProps{
}

interface IState {
}


class EmptyGrid extends React.Component <IProps,IState>{
  render() {
    return (
    
        <div></div>
            // <Grid/>
      
     
    );
  }

}
export {EmptyGrid}
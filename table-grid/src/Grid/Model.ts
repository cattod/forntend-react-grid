export interface ICatodcolumnDefs<T> {
    title:string,
     icon?: string,
     key: string,
      valueGetter?(data:T):string|number|boolean|undefined,
       displayValue?(data:T):React.FunctionComponent | React.ReactNode//(aa:(data:T)=>string|number|boolean):void
  }
  
  
  export interface ICatodActions<T> {
    title:string,
    key?: string,
    icon :string,
    actionFn ?(data?: T):void,
  
  }
  
  export interface IMessage{
    emptyData?:string
    loading?:string
  }
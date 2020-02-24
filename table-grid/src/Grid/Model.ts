export interface ICatodcolumnDefs<T> {
    title:string,
     icon?: string,
     key: string,
     onSort?(sortType:'ascending'|'descending'|'none'):void
      valueGetter?(data:T):string|number|boolean|undefined,
       displayValue(data:T):React.FunctionComponent | React.ReactNode|string|number|boolean//(aa:(data:T)=>string|number|boolean):void
  }
  
  
  export interface ICatodActions<T> {
    title:string,
    key?: string,
    icon :string,
    actionFn ?(data?: T):void,
  
  }
  
export interface ICatodcolumnDefs<T> {
    title:string,
     icon?: string,
     key: string,
     onSort?(sortType:'ascending'|'descending'|'none'):T[]
      valueGetter?(data:T):string|number|boolean|undefined,
       displayValue(data:T):React.FunctionComponent | React.ReactNode | string | number//(aa:(data:T)=>string|number|boolean):void
  }
  
  
  export interface ICatodActions<T> {
    title:string,
    key?: string,
    icon :string,
    actionFn ?(data?: T):void,
  
  }

  export interface ICattodGridProps<T>{
    columnDef?: Array<ICatodcolumnDefs<T>>
    dataRow?: T[]
    actions?: ICatodActions<T>[]
    message?: string
  }

  export interface ISort{
    sortType: "ascending"|"descending"|"none"
}
  
  
export interface ICatodcolumnDefs<T> {
    title:string,
     icon?: string,
     key: string,
     sortable?:boolean
    // onSort?(sortType:'ascending'|'descending'|'none'):T[]
      valueGetter?(data:T):string|number|boolean|undefined,
       displayValue(data:T):React.FunctionComponent | React.ReactNode|string|number|boolean//(aa:(data:T)=>string|number|boolean):void
  }
  
  
  export interface ICatodActions<T> {
    title:string,
    key?: string,
    icon :string,
    actionFn ?(data?: T):void,
  
  }

  export interface ISort{
    sortType: "ascending"|"descending"|"none"
}

export interface ICattodGridProps<T> {
  columnDef: Array<ICatodcolumnDefs<T>>
  dataRow: T[]
  actions?: ICatodActions<T>[]
  message?: string|React.ReactElement|React.ReactNode
  direction?:"right"|"left"
  onSort?(columnKey?:string, sortType?:string):void
}
  
// export interface IDataRow {
//   [key: string]: any
// }

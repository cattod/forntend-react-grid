export interface ICatodcolumnDefs<T> {
  title:string,
   icon?: string,
   key: string,
    valueGetter?(data:T):any,
     displayValue? ():void
}


export interface IAgColumnDefs<T> {
    headerName ?: string,
     field ?: string
     cellRenderer?:string,
     width ?: number
     headerComponent ?: any
     headerComponentParams ?:any
     suppressMenu?:boolean
     frameworkComponents?: any
     cellEditorFramework? : ICatodActions<T>[]|undefined
     sortable?: boolean
     pinned?: string
     suppressSizeToFit?:boolean
     minWidth?: number,
     maxWidth?:number
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
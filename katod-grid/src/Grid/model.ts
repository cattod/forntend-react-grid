export interface ICatodcolumnDefs<T> {
  title:string,
   icon?: string,
   key: string
    valueGetter?(data:T):any,
     displayValue? ():void
    // headerName ?: string,
    //  field ?: string
    //  cellRenderer?:string,
    //  width ?: number
    //  headerComponent ?: any
    //  headerComponentParams ?:any
    //  suppressMenu?:boolean
    //  frameworkComponents?: any
    //  cellEditorFramework? : IActions<T>[]|undefined
    //  sortable?: boolean
}


export interface IColumnDefs<T> {

    headerName ?: string,
     field ?: string
     cellRenderer?:string,
     width ?: number
     headerComponent ?: any
     headerComponentParams ?:any
     suppressMenu?:boolean
     frameworkComponents?: any
     cellEditorFramework? : IActions<T>[]|undefined
     sortable?: boolean
}


export interface IActions<T> {
  title:string,
  key?: string,
  icon ?:string,
  actionFa ?(data?: T):void,

}
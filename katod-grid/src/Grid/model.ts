export interface columnDefs<T> {
    headerName ?: string,
     field ?: string
     cellRenderer?:string,
     width ?: number
     cellEditorFramework? : IActions<T>[]|undefined
}

export interface IActions<T> {
  title:string,
  key?: string,
  icon ?:string,
  actionFa ?(data?: T):void,

}
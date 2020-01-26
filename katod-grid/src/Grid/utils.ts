import {columnDefs, IActions} from "./model"

export function defineCol<T>(data: T[]|undefined): columnDefs<T>[]{
    let newItem = definItem(data)
            return newItem.map((item:string)=>{
               return { headerName:_capitalize(item), field: item ,cellRenderer: "" }
            })
}

export function addActionToGrid<T>(data: T[]|undefined,actions: IActions<T>[]|undefined): columnDefs<T>[] {
  let newGrid: columnDefs<T>[]  = defineCol(data)
  newGrid.push(
    { headerName:"Actions", field: "Actions" ,cellRenderer: "Actions" ,
    cellEditorFramework:actions}
   )
   return newGrid
}

export function defineColAction<T>(data: Array <columnDefs<T>>,actions: IActions<T>[]|undefined)  : columnDefs<T>[] {
    
    data.push(
      { headerName:"Actions", field: "Actions" ,cellRenderer: "Actions" ,cellEditorFramework:actions}
     )
     return data
  }

function definItem<T>(data: T[]|undefined){
        let fields :string[][]= []
    let flatFields:string[] = []
    if (data)
    for (let item of data){
        fields.push(Object.keys(item))
        flatFields = fields.flat()
    
     
     // return item
    }
    let finalField :any = new Set(flatFields) //Set<string>
    return [...finalField]

}

const _capitalize = (s:string): string=>{
    return s[0].toUpperCase() + s.slice(1);
}
 
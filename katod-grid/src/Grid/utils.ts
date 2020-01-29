import {ICatodcolumnDefs, IActions, IColumnDefs} from "./model"

export function defineColByRow<T>(data: T[]|undefined): IColumnDefs<T>[]{
    let newItem = definItem(data)
  //return newItem
            return newItem.map((item:string)=>{
               return { headerName:_capitalize(item), field: item ,cellRenderer: "" }
            })
}

export function addActionToGrid<T>(data: T[]|undefined,actions: IActions<T>[]|undefined): IColumnDefs<T>[] {
  let newGrid: IColumnDefs<T>[]  = defineColByRow(data)
  newGrid.push(
    { headerName:"Actions", field: "Actions" ,cellRenderer: "Actions" ,
    cellEditorFramework:actions}
   )
   return newGrid
}

export function  changeCatodColDefToAG<T>(data:Array <ICatodcolumnDefs<T>>  ): IColumnDefs<T>[] {
  return data.map((item:ICatodcolumnDefs<T>,index:number)=>{
    return { headerName : item.title,
       field : item.title
      // cellRenderer?:string,
      // width ?: number
      // headerComponent ?: any
      // headerComponentParams ?:any
      // suppressMenu?:boolean
      // frameworkComponents?: any
      // cellEditorFramework? : IActions<T>[]|undefined
      // sortable?: boolean
    }
  })
}

// export function defineColAction<T>(data: Array <ICatodcolumnDefs<T>>,actions: IActions<T>[]|undefined)  : IColumnDefs<T>[] {
    
//     // data.push(
//     //   { headerName:"Actions", field: "Actions" ,cellRenderer: "Actions" ,cellEditorFramework:actions}
//     //  )
//      return data
//   }

export function definItem<T>(data: T[]|undefined){
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
 
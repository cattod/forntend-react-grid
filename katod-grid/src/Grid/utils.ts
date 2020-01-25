import {columnDefs} from "./model"

export function defineCol<T>(data: T[]|undefined): columnDefs[]{
    let newItem = definItem(data)
            return newItem.map((item:string,index:number)=>{
               return { headerName:_capitalize(item), field: item ,cellRenderer: "action" }
            })
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

const _capitalize = (s:string)=>{
    return s[0].toUpperCase() + s.slice(1);
}
 
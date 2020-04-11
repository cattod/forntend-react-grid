import * as React from "react";
import {CatodGrid, Catodcolumn} from "../index";
import {create} from "react-test-renderer";
import {EnumConsts} from "../Grid/Consts"
// let i = 0;
// afterEach(() => {
//   i++;
//   return console.log(i);
// });

// afterEach(cleanup)

test("Component should show 'red' text 'Hello World'", () => {
  const component = create(<CatodGrid columnDef={[]} dataRow={[]} message="Hello World"/>);
  const testInstance = component.root;

  expect(testInstance.findByType(CatodGrid).props.message).toBe("Hello World");

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test(`Component should show ${EnumConsts.ThereIsNotAnyDataToShowInGrid}`, () => {
  const component = create(<CatodGrid columnDef={[]} dataRow={[]} />);
  const testInstance = component.root;

  expect(testInstance.findByProps({className: "empty-grid"}).children).toEqual([EnumConsts.ThereIsNotAnyDataToShowInGrid]);

  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

test(`Component should show the table whith 2 column which the titles are "Make" and "Model" and message ${EnumConsts.ThereIsNotAnyDataToShowInGrid}`, () => {
  interface IRowData{
    make ?:string,
    model ?: string,
    price ?: number,
    }
  let columns:Catodcolumn<IRowData>[] = [{title:"Make",
      
  key:"Make",
  displayValue: (rowData:IRowData) =>{return rowData?.make}
  },
  {title:"Model",
 
  key:"Model",
  displayValue:(rowData:IRowData)=>{return rowData?.model},
  valueGetter:(rowData:IRowData)=>{return rowData?.model}
  },]
  const component = create(<CatodGrid columnDef={columns} dataRow={[]} />);
  const testInstance = component.root;
  let dataZero = testInstance.findByType(CatodGrid).props.dataRow[0]
  expect(testInstance.findByType(CatodGrid).props.columnDef[0].key).toBe("Make");
  expect(testInstance.findByType(CatodGrid).props.columnDef[1].key).toBe("Model");
  expect(testInstance.findByType(CatodGrid).props.columnDef[0].displayValue(dataZero)).toBeUndefined();
  expect(testInstance.findByProps({className: "empty-grid"}).children).toEqual([EnumConsts.ThereIsNotAnyDataToShowInGrid]);
 
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});

test(`Component should show the table whith 2 column which the titles are "Make" and "Model" whith sort icon`, () => {
  interface IRowData{
    make ?:string,
    model ?: string,
    price ?: number,
    }
  let columns:Catodcolumn<IRowData>[] = [{title:"Make",
      sortable:true,
  key:"Make",
  displayValue: (rowData:IRowData) =>{return rowData?.make}
  
  },
  {title:"Model",
 
  key:"Model",
  displayValue:(rowData:IRowData)=>{return rowData?.model},
  valueGetter:(rowData:IRowData)=>{return rowData?.model}
  },]
  const component = create(<CatodGrid columnDef={columns} dataRow={[]} />);
  const testInstance = component.root;
  let dataZero = testInstance.findByType(CatodGrid).props.dataRow[0]
  expect(testInstance.findByType(CatodGrid).props.columnDef[0].key).toBe("Make");
  expect(testInstance.findByType(CatodGrid).props.columnDef[1].key).toBe("Model");
  // expect(testInstance.findByProps({className:"sort-svg"}).children).toBeCalled();
  expect(testInstance.findByType(CatodGrid).props.columnDef[0].displayValue(dataZero)).toBeUndefined();
  expect(testInstance.findByProps({className: "empty-grid"}).children).toEqual([EnumConsts.ThereIsNotAnyDataToShowInGrid]);
 
  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
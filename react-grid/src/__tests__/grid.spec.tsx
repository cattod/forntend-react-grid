import * as React from "react";
import {CatodGrid} from "../index";
import {create} from "react-test-renderer";

test("Component should show 'red' text 'Hello World'", () => {
  const component = create(<CatodGrid columnDef={[]} dataRow={[]} message="Hello World"/>);
  const testInstance = component.root;

  expect(testInstance.findByType(CatodGrid).props.message).toBe("Hello World");

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
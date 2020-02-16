import * as React from "react";
import {CatodGrid} from "../index";
import {create} from "react-test-renderer";

test("Component should show 'red' text 'Hello World'", () => {
  const component = create(<CatodGrid  message="400px"/>);
  const testInstance = component.root;

  expect(testInstance.findByType(CatodGrid).props.message).toBe("400px");

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
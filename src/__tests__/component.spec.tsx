import * as React from "react";
import {CatodGrid} from "..";
import {create} from "react-test-renderer";

test("Component should show 'red' text 'Hello World'", () => {
  const component = create(<CatodGrid  height="400px"/>);
  const testInstance = component.root;

  expect(testInstance.findByType(CatodGrid).props.height).toBe("400px");

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
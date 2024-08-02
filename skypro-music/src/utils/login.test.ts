import renderer from "react-test-renderer";
import Home from "../app/login/page"

it("renders correctly", () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});
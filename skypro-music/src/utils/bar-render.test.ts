import { render } from "@testing-library/react";
import Soundbar from "../../components/bar"; 

it("renders correctly", () => {
  const { asFragment } = render(<Soundbar />);
  expect(asFragment()).toMatchSnapshot();
});

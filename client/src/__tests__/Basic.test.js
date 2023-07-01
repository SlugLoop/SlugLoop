import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import App from "../App";

test("Basic", () => {
  render(<App />);
  const map = screen.getByTestId("map");
  expect(map).toBeInTheDocument();
});

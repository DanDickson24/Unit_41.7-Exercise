import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

test("renders an unlit cell correctly", () => {
  const { container } = render(<Cell isLit={false} />);
  const cellElement = container.firstChild;
  expect(cellElement).toHaveClass("Cell");
  expect(cellElement).not.toHaveClass("Cell-lit");
});

test("renders a lit cell correctly", () => {
  const { container } = render(<Cell isLit={true} />);
  const cellElement = container.firstChild;
  expect(cellElement).toHaveClass("Cell");
  expect(cellElement).toHaveClass("Cell-lit");
});


test("renders the starter board correctly", () => {
    const nrows = 3;
    const ncols = 3;
    const chanceLightStartsOn = 0.25; // Set a predictable initial state
  
    const { getAllByTestId } = render(
      <Board nrows={nrows} ncols={ncols} chanceLightStartsOn={chanceLightStartsOn} />
    );
  
    // Assuming your cells have a "data-testid" attribute for easier selection
    const cells = getAllByTestId("cell");
    
    // You can assert specific cell states here based on the known initial state.
    // For example, check if certain cells are lit and others are not.
    
    // Example assertions:
    expect(cells[0]).toHaveClass("Cell-lit");
    expect(cells[1]).not.toHaveClass("Cell-lit");
    // ...
  });


  test("handles cell-clicking correctly", () => {
    const nrows = 3;
    const ncols = 3;
    const chanceLightStartsOn = 0.25;
  
    const { getAllByTestId } = render(
      <Board nrows={nrows} ncols={ncols} chanceLightStartsOn={chanceLightStartsOn} />
    );
  
    // Assuming your cells have a "data-testid" attribute for easier selection
    const cells = getAllByTestId("cell");
  
    // Trigger a click on a cell
    fireEvent.click(cells[0]);
  
    // Assert that the clicked cell and its adjacent cells have toggled their state correctly
    expect(cells[0]).toHaveClass("Cell");
    expect(cells[1]).toHaveClass("Cell-lit"); // Adjacent cell
    // ...
  
    // You may want to test other scenarios, such as clicking multiple cells, to ensure the toggling works as expected.
  });


  test("checks for a win and shows 'You Won!' message", () => {
    const nrows = 3;
    const ncols = 3;
    const chanceLightStartsOn = 0; // All lights are off initially
  
    const { getAllByTestId, getByText } = render(
      <Board nrows={nrows} ncols={ncols} chanceLightStartsOn={chanceLightStartsOn} />
    );
  
    // Assuming your cells have a "data-testid" attribute for easier selection
    const cells = getAllByTestId("cell");
  
    // Trigger clicks to turn off all lights
    cells.forEach((cell) => {
      fireEvent.click(cell);
    });
  
    // Ensure the "You Won!" message is displayed
    const winMessage = getByText("You Won!");
    expect(winMessage).toBeInTheDocument();
  });
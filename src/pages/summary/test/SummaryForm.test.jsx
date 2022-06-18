import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("Initial conditions", () => {
  render(<SummaryForm />);

  const checkBox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  expect(checkBox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /Confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("inital checkBox disabled with submitButton", () => {
  render(<SummaryForm />);

  // get checkBox and button
  const checkBox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /Confirm order/i });

  // click checkBox
  fireEvent.click(checkBox);
  // expect confirmButton will be enabled
  expect(confirmButton).toBeEnabled();

  // click checkBox again
  fireEvent.click(checkBox);
  // expect confirmButton will be disabled
  expect(confirmButton).toBeDisabled();
});

import React from "react";
import {
  renderWithProvider,
  screen,
  act,
  fireEvent,
  waitFor,
} from "../../src/services/testUtils";
import Snackbar from "../../src/components/Snackbar";
import "@testing-library/jest-dom";
import { showSnackbar } from "../../src/features/snackbar/snackbarSlice";
import appStore from "../../src/store/appStore";

describe("SnackBar component", () => {
  it("should not render when open is false", () => {
    renderWithProvider(<Snackbar />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("should display message when snackbar is open", async () => {
    renderWithProvider(<Snackbar />);

    await act(async () =>
      appStore.dispatch(
        showSnackbar({ message: "I'm a Snackbar", severity: "info" })
      )
    );

    expect(screen.getByText("I'm a Snackbar")).toBeInTheDocument();
  });

  it("should hide snackbar on close button click", async () => {
    renderWithProvider(<Snackbar />);

    await act(async () =>
      appStore.dispatch(showSnackbar({ message: "Close me", severity: "info" }))
    );

    expect(screen.getByText("Close me")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(appStore.getState().snackBar.open).toBe(false);
    });
  });
});

import React from "react";
import {
  act,
  fireEvent,
  renderWithProvider,
  screen,
} from "../../src/services/testUtils";
import Campaign from "../../src/features/campaigns/Campaign";
import TABLE_MOCK_DATA from "../../mocks/campaigns.json";
import MOCK_USERS from "../../mocks/users.json";
import appStore from "../../src/store/appStore";
import { campaignsFetchSuccess } from "../../src/features/campaigns/campaignSlice";
import "@testing-library/jest-dom";

global.fetch = jest.fn(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(MOCK_USERS),
    }) as unknown as Promise<Response>
);

describe("Campaign Page", () => {
  it("should render the loading state of Campaign page", () => {
    renderWithProvider(<Campaign />);

    expect(screen.getByTestId("global-loader")).toBeInTheDocument();
  });

  it("should render the campaign page with data", async () => {
    renderWithProvider(<Campaign />);

    await act(async () => {
      appStore.dispatch(
        campaignsFetchSuccess({ campaigns: TABLE_MOCK_DATA, users: MOCK_USERS })
      );
    });

    expect(
      screen.getByRole("button", { name: "ADD CAMPAIGNS" })
    ).toBeInTheDocument();

    expect(screen.getByTestId("campaign-form-row")).toBeInTheDocument();
  });

  it("should render search button as disabled", async () => {
    renderWithProvider(<Campaign />);

    await act(async () => {
      appStore.dispatch(
        campaignsFetchSuccess({ campaigns: TABLE_MOCK_DATA, users: MOCK_USERS })
      );
    });

    expect(screen.getByTestId("search-campaigns-button")).toBeDisabled();
  });

  it("should replicate the filter campaigns flow", async () => {
    renderWithProvider(<Campaign />);

    await act(async () => {
      appStore.dispatch(
        campaignsFetchSuccess({ campaigns: TABLE_MOCK_DATA, users: MOCK_USERS })
      );
    });

    const searchInput = screen.getByTestId("search-campaigns-input");

    fireEvent.click(searchInput);
    fireEvent.change(searchInput, { target: { value: "realbridge" } });

    const searchButton = screen.getByTestId("search-campaigns-button");

    fireEvent.click(searchButton);

    const tableRecord = screen.getByTestId("name-0");

    expect(tableRecord).toBeInTheDocument();
    expect(tableRecord.textContent).toBe("Realbridge");
  });
});

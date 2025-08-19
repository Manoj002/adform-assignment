import React from "react";
import {
  renderWithProvider,
  screen,
  act,
  fireEvent,
} from "../../src/services/testUtils";
import Campaign from "../../src/features/campaigns/Campaign";
import { campaignsFetchSuccess } from "../../src/features/campaigns/campaignSlice";
import TABLE_MOCK_DATA from "../../mocks/campaigns.json";
import USERS_MOCK_DATA from "../../mocks/users.json";
import appStore from "../../src/store/appStore";
import "@testing-library/jest-dom";

describe("Add Campaign modal", () => {
  it("should render the Add Campaign modal", async () => {
    renderWithProvider(<Campaign />);

    await act(async () => {
      appStore.dispatch(
        campaignsFetchSuccess({
          campaigns: TABLE_MOCK_DATA,
          users: USERS_MOCK_DATA,
        })
      );
    });

    const addCampaignsButton = screen.getByRole("button", {
      name: "ADD CAMPAIGNS",
    });

    expect(addCampaignsButton).toBeInTheDocument();

    fireEvent.click(addCampaignsButton);

    expect(
      screen.getByTestId("add-campaigns-content-container")
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "SUBMIT" })).toBeDisabled();
  });
});

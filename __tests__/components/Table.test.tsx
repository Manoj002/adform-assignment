import React from "react";
import { render, screen } from "@testing-library/react";
import CampaignTable from "../../src/components/Table";
import { campaignsColumnDef } from "../../src/features/campaigns/campaign.constants";
import TABLE_MOCK_DATA from "../../mocks/campaigns.json";
import { TCampaignColDef } from "../../src/global.types/campaigns.types";
import dayjs from "dayjs";

describe("CampaignTable", () => {
  it("should render 'No records found' when rows are empty", () => {
    render(<CampaignTable columns={campaignsColumnDef} rows={[]} />);
    expect(screen.getByText(/No records found/i)).toBeInTheDocument();
  });

  it("should render table headers correctly", () => {
    render(
      <CampaignTable columns={campaignsColumnDef} rows={TABLE_MOCK_DATA} />
    );
    campaignsColumnDef.forEach((col: TCampaignColDef) => {
      expect(screen.getByText(col.headerName)).toBeInTheDocument();
    });
  });

  it("should render campaign rows with formatted dates", () => {
    render(
      <CampaignTable columns={campaignsColumnDef} rows={TABLE_MOCK_DATA} />
    );

    expect(screen.getByText("Divavu")).toBeInTheDocument();
    expect(
      screen.getByText(
        dayjs(TABLE_MOCK_DATA[0].startDate, "M/D/YYYY").format("MM/DD/YYYY")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        dayjs(TABLE_MOCK_DATA[0].endDate, "M/D/YYYY").format("MM/DD/YYYY")
      )
    ).toBeInTheDocument();
  });
});

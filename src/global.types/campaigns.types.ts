import type { JSX } from "react";

export type TCampaign = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;
  userId: number;
  isActive?: string;
};

export type TCampaigns = TCampaign[];

export type TCampaignColDef = {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (arg1: TCampaign) => JSX.Element;
};

export type TAddCampaignsParams = {
  campaigns: TCampaigns;
};

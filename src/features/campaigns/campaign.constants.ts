import type { TCampaignColDef } from "../../global.types/campaigns.types";

export const campaignsColumnDef: TCampaignColDef[] = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "userName",
    headerName: "User name",
  },
  {
    field: "startDate",
    headerName: "Start date",
  },
  {
    field: "endDate",
    headerName: "End date",
  },
  {
    field: "isActive",
    headerName: "Active",
  },
  {
    field: "displayBudget",
    headerName: "Budget",
  },
];

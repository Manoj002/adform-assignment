export type TCampaign = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  Budget: number;
  userId: number;
};

export type TCampaigns = TCampaign[];

export type TCampaignColDef = {
  field: string;
  headerName: string;
  width?: number;
};

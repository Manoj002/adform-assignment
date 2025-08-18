import type { TCampaignColDef } from "../../global.types/campaigns.types";

const COLUMN_WIDTHS = {
  name: "15%",
  userName: "25%",
  startDate: "12%",
  endDate: "12%",
  isActive: "20%",
  budget: "16%",
};

const StatusIndicator = ({ status }: { status: string }) => {
  const isActive = status === "Active";
  return (
    <div className="flex items-center">
      <span
        className={`inline-block h-4 w-4 rounded-full mr-2 ${
          isActive ? "bg-green-500" : "bg-red-500"
        }`}
      />
      {status}
    </div>
  );
};

export const campaignsColumnDef: TCampaignColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: COLUMN_WIDTHS.name,
  },
  {
    field: "userName",
    headerName: "User name",
    width: COLUMN_WIDTHS.userName,
  },
  {
    field: "startDate",
    headerName: "Start date",
    width: COLUMN_WIDTHS.startDate,
  },
  {
    field: "endDate",
    headerName: "End date",
    width: COLUMN_WIDTHS.endDate,
  },
  {
    field: "isActive",
    headerName: "Active",
    width: COLUMN_WIDTHS.isActive,
    renderCell: (params) => (
      <StatusIndicator status={params.isActive as string} />
    ),
  },
  {
    field: "displayBudget",
    headerName: "Budget",
    width: COLUMN_WIDTHS.budget,
  },
];

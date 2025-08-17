import type {
  TCampaign,
  TCampaignColDef,
} from "../../global.types/campaigns.types";

export const campaignsColumnDef: TCampaignColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: "15%",
  },
  {
    field: "userName",
    headerName: "User name",
    width: "25%",
  },
  {
    field: "startDate",
    headerName: "Start date",
    width: "12%",
  },
  {
    field: "endDate",
    headerName: "End date",
    width: "12%",
  },
  {
    field: "isActive",
    headerName: "Active",
    width: "20%",
    renderCell: (params: TCampaign) => {
      const isActive = params.isActive === "Active";
      return (
        <div className="flex items-center">
          <span
            className={`inline-block h-[16px] w-[16px] rounded-[8px] mr-2 ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {params.isActive}
        </div>
      );
    },
  },
  {
    field: "displayBudget",
    headerName: "Budget",
    width: "16%",
  },
];

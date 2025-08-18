import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type {
  TCampaign,
  TCampaignColDef,
  TCampaigns,
} from "../global.types/campaigns.types";
import dayjs from "dayjs";

type TCampaignTableProps = {
  columns: any;
  rows: TCampaigns;
};

export default function CampaignTable({ columns, rows }: TCampaignTableProps) {
  if (!rows.length) {
    return (
      <div className="flex justify-center items-center h-[200px]">
        No records found
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((col: TCampaignColDef) => (
              <TableCell
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                  width: col.width,
                  borderRight: "1px solid #e0e0e0",
                }}
                key={col.field}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row: TCampaign) => (
            <TableRow key={row.name}>
              {columns.map((col: TCampaignColDef) => {
                let value = row[col.field as keyof TCampaign];
                if (col.field === "startDate" || col.field === "endDate") {
                  value = dayjs(value, "M/D/YYYY").format("MM/DD/YYYY");
                }
                if (col.renderCell) {
                  // @ts-ignore
                  value = col.renderCell(row);
                }
                return (
                  <TableCell
                    sx={{ borderRight: "1px solid #e0e0e0" }}
                    key={col.field}
                  >
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

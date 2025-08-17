import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { TCampaign, TCampaigns } from "../global.types/campaigns.types";

type TCampaignTableProps = {
  columns: any;
  rows: TCampaigns;
};

export default function CampaignTable({ columns, rows }: TCampaignTableProps) {
  console.log({ rows });

  if (!rows.length) {
    return (
      <div className="flex justify-center items-center">No records found</div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                sx={{ fontWeight: "bold" }}
                key={col.field}
                style={{ width: col.width }}
              >
                {col.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row: TCampaign) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((col) => {
                // Handle valueGetter
                let value = row[col.field];
                if (col.valueGetter) {
                  value = col.valueGetter(row);
                }
                // Handle renderCell
                if (col.renderCell) {
                  value = col.renderCell(row);
                }
                return <TableCell key={col.field}>{value}</TableCell>;
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

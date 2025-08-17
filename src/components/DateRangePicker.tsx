import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { MultiInputDateRangeField } from "@mui/x-date-pickers-pro/MultiInputDateRangeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function MultiInputDateRangePicker({ ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MultiInputDateRangeField"]}>
        <DateRangePicker
          slotProps={{ field: { dateSeparator: "" } }}
          slots={{ field: MultiInputDateRangeField }}
          {...props}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

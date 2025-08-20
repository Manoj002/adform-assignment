import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateRangePicker,
  MultiInputDateRangeField,
} from "@mui/x-date-pickers-pro";

export default function DateRangePickerComp({ ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateRangePicker slots={{ field: MultiInputDateRangeField }} {...props} />
    </LocalizationProvider>
  );
}

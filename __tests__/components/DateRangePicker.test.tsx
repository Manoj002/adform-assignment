import React from "react";
import { render, screen } from "@testing-library/react";
import DateRangePickerComp from "../../src/components/DateRangePicker";
import { MultiInputDateRangeField } from "@mui/x-date-pickers-pro";

const DateRangePicker = ({ ...props }) => {
  return (
    <DateRangePickerComp
      slotProps={{
        field: { dateSeparator: "" },
        textField: ({ position }: { position: string }) => ({
          variant: "outlined",
          size: "small",
          label: position === "start" ? "Start date" : "End date",
          sx: { borderRadius: "0.5rem" },
        }),
      }}
      slots={{ field: MultiInputDateRangeField }}
      value={props.value}
      onChange={props.onChange}
      {...props}
    />
  );
};

describe("DateRangePickerComp", () => {
  it("should render the two input fields", () => {
    render(<DateRangePicker />);

    const startInput = screen.getByRole("group", { name: /Start date/i });
    const endInput = screen.getByRole("group", { name: /End date/i });

    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();
  });
});

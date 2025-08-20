import React, { useEffect, useState, useCallback } from "react";
import { CircularProgress, Modal } from "@mui/material";
import DateRangePickerComp from "../../components/DateRangePicker";
import {
  type DateRange,
} from "@mui/x-date-pickers-pro";
import type { Dayjs } from "dayjs";
import { addCampaignsInit, resetAddCampaigns } from "./campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store.types";
import { addCampaigns } from "./campaignSelectors";
import { showSnackbar } from "../snackbar/snackbarSlice";
import { dateFormatter } from "../../services/global.utils";

type TAddCampaignsModalProps = {
  handleOnClose: () => void;
};

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

type TAddCampaignsFormData = {
  name: string;
  budget: string;
  startEndDateRange: DateRange<Dayjs>;
};

const AddCampaignsModal = ({ handleOnClose }: TAddCampaignsModalProps) => {
  const [campaignsData, setCampaignsData] = useState<TAddCampaignsFormData>({
    name: "",
    budget: "",
    startEndDateRange: [null, null],
  });

  const dispatch = useDispatch<AppDispatch>();
  const { isAddCampaignsLoading, isAddCampaignsSuccess } =
    useSelector(addCampaigns);

  const handleInputChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setCampaignsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = useCallback((newRange: DateRange<Dayjs>) => {
    setCampaignsData((prev) => ({ ...prev, startEndDateRange: newRange }));
  }, []);

  const handleAddCampaigns = useCallback(() => {
    const [startDate, endDate] = campaignsData.startEndDateRange;
    dispatch(
      addCampaignsInit({
        campaigns: [
          {
            id: Math.floor(Math.random() * 1000),
            name: campaignsData.name,
            startDate: dateFormatter(startDate as Dayjs),
            endDate: dateFormatter(endDate as Dayjs),
            Budget: Number(campaignsData.budget),
            userId: Math.floor(Math.random() * 1000),
          },
        ],
      })
    );
  }, [campaignsData]);

  useEffect(() => {
    if (!isAddCampaignsLoading && isAddCampaignsSuccess) {
      dispatch(
        showSnackbar({
          message: "Campaigns added successfully!",
          severity: "success",
        })
      );
      handleOnClose();
    }

    return () => {
      dispatch(resetAddCampaigns());
    };
  }, [isAddCampaignsLoading, isAddCampaignsSuccess]);

  const isSubmitDisabled =
    isAddCampaignsLoading ||
    !campaignsData.name ||
    !campaignsData.budget ||
    !campaignsData.startEndDateRange[0] ||
    !campaignsData.startEndDateRange[1];

  return (
    <Modal open onClose={handleOnClose}>
      <div
        data-testid="add-campaigns-content-container"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg w-[400px]"
      >
        <h2 className="font-bold text-lg mb-4">Add Campaign</h2>

        <input
          className="mb-4 py-2 px-2 w-full border border-gray-400 rounded-md"
          placeholder="Campaign name"
          type="text"
          value={campaignsData.name}
          name="name"
          onChange={handleInputChange}
        />

        <DateRangePickerComp
          value={campaignsData.startEndDateRange}
          onChange={handleDateChange}
          slotProps={{
            field: { dateSeparator: "" },
            textField: (ownerState: { position: string }) => ({
              variant: "outlined",
              size: "small",
              label:
                ownerState.position === "start" ? "Start date" : "End date",
              sx: { borderRadius: "0.5rem" },
            }),
          }}
        />

        <input
          className="mt-4 py-2 px-2 w-full border border-gray-400 rounded-md"
          placeholder="Budget"
          type="number"
          value={campaignsData.budget}
          name="budget"
          onChange={handleInputChange}
        />

        <div className="flex justify-end mt-8">
          <button
            onClick={handleOnClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-sm font-thin cursor-pointer"
          >
            CLOSE
          </button>
          <button
            onClick={handleAddCampaigns}
            disabled={isSubmitDisabled}
            className={`px-4 py-2 ml-4 rounded-sm font-thin text-white ${
              isSubmitDisabled
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 cursor-pointer"
            }`}
          >
            {isAddCampaignsLoading ? (
              <CircularProgress size={20} sx={{ color: "#2b7fff" }} />
            ) : (
              "SUBMIT"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddCampaignsModal;

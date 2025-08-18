import { useEffect, useState } from "react";
import { CircularProgress, Modal } from "@mui/material";
import DateRangePickerComp from "../../components/DateRangePicker";
import {
  MultiInputDateRangeField,
  type DateRange,
} from "@mui/x-date-pickers-pro";
import type { Dayjs } from "dayjs";
import { addCampaignsInit, resetAddCampaigns } from "./campaignSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store.types";
import { addCampaigns, campaignList } from "./campaignSelectors";
import { showSnackbar } from "../snackbar/snackbarSlice";
import { dateFormatter } from "../../services/global.utils";

type TAddCampaignsModalProps = {
  handleOnClose: () => void;
};

type InputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

const AddCampaignsModal = ({ handleOnClose }: TAddCampaignsModalProps) => {
  const [campaignsData, setCampaignsData] = useState({
    name: "",
    budget: "",
  });
  const [startEndDateRange, setStartEndDateRange] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);
  const dispatch = useDispatch<AppDispatch>();
  const { isAddCampaignsLoading, isAddCampaignsSuccess } =
    useSelector(addCampaigns);
  const { campaigns } = useSelector(campaignList);

  const handleOnChange = (event: InputChangeEvent) => {
    const { name, value } = event.target;
    setCampaignsData((prev) => ({
      ...prev,
      [name || "startEndDateRange"]: value,
    }));
  };

  const handleAddCampaigns = () => {
    dispatch(
      addCampaignsInit({
        campaigns: [
          {
            id: Math.floor(Math.random() * 1000),
            name: campaignsData.name,
            startDate: dateFormatter(startEndDateRange[0] as Dayjs),
            endDate: dateFormatter(startEndDateRange[1] as Dayjs),
            Budget: Number(campaignsData.budget),
            userId: Math.floor(Math.random() * 1000),
          },
        ],
      })
    );
  };

  useEffect(() => {
    if (!isAddCampaignsLoading && isAddCampaignsSuccess) {
      dispatch(
        showSnackbar({
          open: true,
          message: "Campaigns added successfully!",
          severity: "success",
        })
      );
      handleOnClose();
    }

    return () => {
      dispatch(resetAddCampaigns());
    };
  }, [campaigns]);

  return (
    <Modal open onClose={handleOnClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-[2px] p-8">
        <div className="font-bold text-lg mt-1 mb-2">Add Campaigns</div>
        <input
          className="mt-4 mb-4 py-2 px-2 w-full border border-gray-400 rounded-md"
          placeholder="Campaign name"
          type="text"
          value={campaignsData.name}
          name="name"
          onChange={handleOnChange}
        />
        <DateRangePickerComp
          value={startEndDateRange}
          onChange={(newDateRange: DateRange<Dayjs>) =>
            setStartEndDateRange(newDateRange)
          }
          slotProps={{
            field: { dateSeparator: "" },
            textField: (ownerState: { position: string }) => ({
              variant: "outlined",
              size: "small",
              label:
                ownerState.position === "start" ? "Start date" : "End date",
              sx: {
                borderRadius: "0.5rem",
              },
            }),
          }}
          slots={{ field: MultiInputDateRangeField, size: "small" }}
        />
        <input
          className="mt-4 py-2 px-2 w-full border border-gray-400 rounded-md"
          placeholder="Budget"
          type="number"
          value={campaignsData.budget}
          name="budget"
          onChange={handleOnChange}
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
            className={`px-4 py-2 ml-4 ${
              isAddCampaignsLoading
                ? "bg-blue-100 cursor-not-allowed px-8"
                : "bg-blue-500 cursor-pointer px-4"
            } text-white rounded-sm font-thin disabled:bg-gray-600 disabled:cursor-not-allowed`}
            disabled={
              isAddCampaignsLoading ||
              !campaignsData.name ||
              !campaignsData.budget ||
              !startEndDateRange[0] ||
              !startEndDateRange[1]
            }
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

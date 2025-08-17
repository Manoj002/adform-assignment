import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCampaignsInit,
  filterCampaigns,
  getCampaigns,
} from "./campaignSlice";
import CampaignTable from "../../components/Table";
import { campaignsColumnDef } from "./campaign.constants.tsx";
import PageLayout from "../../components/Layout";
import { campaignList } from "./campaignSelectors";
import DateRangePickerComp from "../../components/DateRangePicker";
import {
  MultiInputDateRangeField,
  type DateRange,
} from "@mui/x-date-pickers-pro";
import type { Dayjs } from "dayjs";
import { CircularProgress } from "@mui/material";
import type { AppDispatch } from "../../store/store.types.ts";

const Campaign = () => {
  const [campaignSearchValue, setCampaignSearchValue] = useState("");
  const [startEndDateRange, setStartEndDateRange] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);
  const [isFiltered, setIsFiltered] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, campaigns, isError, filteredCampaigns } =
    useSelector(campaignList);

  const handleCampaignNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCampaignSearchValue(event.target.value);
    if (!campaignSearchValue) setIsFiltered(false);
  };

  const handleAddCampaigns = () => {
    dispatch(
      addCampaignsInit({
        campaigns: [
          {
            id: 11,
            name: "New Campaign",
            startDate: "3/6/2021",
            endDate: "10/3/2026",
            Budget: 505001,
            userId: 12,
          },
        ],
      })
    );
  };

  const handleFilterCampaigns = () => {
    setIsFiltered(true);
    dispatch(filterCampaigns(campaignSearchValue));
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleFilterCampaigns();
  };

  const fetchData = () => {
    dispatch(getCampaigns());
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="absolute flex top-0 left-0 w-[100%] h-[100%] bg-transparent justify-center items-center">
        <CircularProgress size={40} sx={{ color: "#2b7fff" }} />
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="w-[100%] h-[100%]  flex flex-row justify-between">
        <div className="flex w-auto h-[40px]">
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
        </div>

        <div className="h-[40px]">
          <input
            className="px-2 h-full border-l border-t border-b border-solid border-black font-md rounded-tl-sm rounded-bl-sm focus:rounded-tr-none focus:rounded-br-none focus:cursor-text"
            name="search_campaign"
            placeholder="Search by name"
            type="text"
            onChange={handleCampaignNameChange}
            onKeyDown={handleOnKeyDown}
          />
          <button
            className="px-2 h-full font-thin rounded-tr rounded-br bg-blue-500 text-white  cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-100"
            onClick={handleFilterCampaigns}
            disabled={!campaignSearchValue}
          >
            SEARCH
          </button>
        </div>
      </div>
      <div className="justify-end flex mt-4">
        <button
          onClick={handleAddCampaigns}
          className="px-4 py-2 bg-blue-500 text-white rounded-sm font-thin cursor-pointer"
        >
          ADD CAMPAIGNS
        </button>
      </div>
      <div className="mt-12">
        <CampaignTable
          columns={campaignsColumnDef}
          rows={
            campaignSearchValue && isFiltered ? filteredCampaigns : campaigns
          }
        />
      </div>
    </PageLayout>
  );
};

export default Campaign;

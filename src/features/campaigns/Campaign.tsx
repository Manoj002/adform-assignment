import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCampaignsInit,
  filterCampaigns,
  filterWithDateSelection,
  getCampaigns,
} from "./campaignSlice";
import CampaignTable from "../../components/Table";
import { campaignsColumnDef } from "./campaign.constants.tsx";
import PageLayout from "../../components/Layout";
import { campaignList } from "./campaignSelectors";
import DateRangePickerComp from "../../components/DateRangePicker";
import { type DateRange } from "@mui/x-date-pickers-pro";
import type { Dayjs } from "dayjs";
import { CircularProgress } from "@mui/material";
import type { AppDispatch } from "../../store/store.types.ts";
import AddCampaignsModal from "./AddCampaignsModal.tsx";
import type { TAddCampaignsParams } from "../../global.types/campaigns.types.ts";
import appStore from "../../store/appStore.ts";

const Campaign = () => {
  // @ts-ignore
  window.addCampaigns = (payload: TAddCampaignsParams) =>
    appStore.dispatch(addCampaignsInit(payload));

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, campaigns, filteredCampaigns } = useSelector(campaignList);

  const [campaignSearchValue, setCampaignSearchValue] = useState("");
  const [shouldShowAddCampaignsModal, setShouldShowAddCampaignsModal] =
    useState(false);
  const [startEndDateRange, setStartEndDateRange] = useState<DateRange<Dayjs>>([
    null,
    null,
  ]);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleCampaignNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCampaignSearchValue(value);
      if (!value) setIsFiltered(false);
    },
    []
  );

  // const handleFilterCampaigns = useCallback(() => {
  //   if (!campaignSearchValue) return;
  //   setIsFiltered(true);
  //   dispatch(filterCampaigns(campaignSearchValue));
  // }, [campaignSearchValue]);

  const handleDateRangeSelection = useCallback(
    (newDateRange: DateRange<Dayjs>) => {
      setStartEndDateRange(newDateRange);
      if (!newDateRange[0] || !newDateRange[1]) return;

      setIsFiltered(true);
      dispatch(
        filterWithDateSelection({
          start: newDateRange[0],
          end: newDateRange[1],
        })
      );
    },
    []
  );

  const handleDateRangeClearSelection = useCallback(() => {
    setStartEndDateRange([null, null]);
    setIsFiltered(false);
  }, []);

  // const handleOnKeyDown = useCallback(
  //   (event: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (event.key === "Enter") handleFilterCampaigns();
  //   },
  //   [handleFilterCampaigns]
  // );

  const handleAddCampaigns = useCallback(() => {
    setShouldShowAddCampaignsModal(true);
  }, []);

  const handleOnAddCampaignsModalClose = useCallback(() => {
    setShouldShowAddCampaignsModal(false);
  }, []);

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);

  const displayedCampaigns = useMemo(
    () => (isFiltered ? filteredCampaigns : campaigns),
    [isFiltered, filteredCampaigns, campaigns]
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (campaignSearchValue) {
      timer = setTimeout(() => {
        setIsFiltered(true);
        dispatch(filterCampaigns(campaignSearchValue));
      }, 200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [campaignSearchValue]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-transparent">
        <CircularProgress
          data-testid="global-loader"
          size={40}
          sx={{ color: "#2b7fff" }}
        />
      </div>
    );
  }

  return (
    <PageLayout>
      <div
        data-testid="campaign-form-row"
        className="w-full flex justify-between"
      >
        <div className="flex h-[40px]">
          <DateRangePickerComp
            value={startEndDateRange}
            onChange={handleDateRangeSelection}
            slotProps={{
              field: { dateSeparator: "" },
              textField: ({ position }: { position: string }) => ({
                variant: "outlined",
                size: "small",
                label: position === "start" ? "Start date" : "End date",
                sx: { borderRadius: "0.5rem" },
              }),
            }}
          />
          <button
            onClick={handleDateRangeClearSelection}
            className="px-2 h-full font-thin rounded-sm ml-4 bg-blue-500 text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-100"
            disabled={!startEndDateRange[0] || !startEndDateRange[1]}
          >
            CLEAR DATE <span className="font-bold ml-1">X</span>
          </button>
        </div>

        <div className="h-[40px] flex items-center">
          <input
            type="text"
            name="search_campaign"
            placeholder="Search by name"
            data-testid="search-campaigns-input"
            value={campaignSearchValue}
            onChange={handleCampaignNameChange}
            // onKeyDown={handleOnKeyDown}
            className="px-2 h-full border border-black rounded-sm focus:outline-none focus:cursor-text"
          />
          {/* <button
            data-testid="search-campaigns-button"
            onClick={handleFilterCampaigns}
            disabled={!campaignSearchValue}
            className="px-2 h-full bg-blue-500 text-white rounded-r-sm font-thin cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            SEARCH
          </button> */}
          <button
            role="button"
            onClick={handleAddCampaigns}
            className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-sm font-thin cursor-pointer"
          >
            ADD CAMPAIGNS
          </button>
        </div>
      </div>

      <div className="mt-12">
        <CampaignTable columns={campaignsColumnDef} rows={displayedCampaigns} />
      </div>

      {shouldShowAddCampaignsModal && (
        <AddCampaignsModal handleOnClose={handleOnAddCampaignsModalClose} />
      )}
    </PageLayout>
  );
};

export default Campaign;

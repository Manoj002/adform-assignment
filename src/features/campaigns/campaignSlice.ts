import { createSlice } from "@reduxjs/toolkit";
import type { TCampaign, TCampaigns } from "../../global.types/campaigns.types";
import type { TUser } from "../../global.types/users.types";
import { formatUSD, isDateRangeValid } from "../../services/global.utils";

type TCampaignsState = {
  isLoading: boolean;
  campaigns: TCampaigns;
  filteredCampaigns: TCampaigns;
  isError: boolean;
};

type TUserMapAccumulator = {
  [id: number]: string;
};

const initialState: TCampaignsState = {
  isLoading: false,
  campaigns: [],
  filteredCampaigns: [],
  isError: false,
};

const campaignSlice = createSlice({
  name: "CAMPAIGN",
  initialState,
  reducers: {
    getCampaigns: (state) => {
      state.isLoading = true;
      state.campaigns = [];
      state.isError = false;
      state.filteredCampaigns = [];
    },

    campaignsFetchSuccess: (state, action) => {
      const usersMap = action.payload.users.reduce(
        (accumulator: TUserMapAccumulator, currentValue: TUser) => {
          accumulator[currentValue.id] = currentValue.name;
          return accumulator;
        },
        {}
      );

      state.isLoading = false;
      state.campaigns = action.payload.campaigns.map((campaign: TCampaign) => ({
        ...campaign,
        userName: usersMap[campaign.userId] || "Unknown user",
        isActive: isDateRangeValid(campaign.startDate, campaign.endDate)
          ? "Active"
          : "Inactive",
        displayBudget: formatUSD(campaign.Budget),
      }));
      state.isError = false;
      state.filteredCampaigns = [];
    },

    campaignsFetchError: (state) => {
      state.isLoading = false;
      state.campaigns = [];
      state.isError = true;
      state.filteredCampaigns = [];
    },

    filterCampaigns: (state, action) => {
      state.filteredCampaigns = state.campaigns.filter(
        (campaign) =>
          campaign.name.toLowerCase() === action.payload.toLowerCase()
      );
    },

    addCampaign: (state, action) => {
      state.isLoading = false;
      state.campaigns = action.payload; // append
      state.isError = false;
    },
  },
});

export const {
  getCampaigns,
  campaignsFetchSuccess,
  campaignsFetchError,
  addCampaign,
  filterCampaigns,
} = campaignSlice.actions;

export default campaignSlice.reducer;

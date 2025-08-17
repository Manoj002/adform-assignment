import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TAddCampaignsParams,
  TCampaign,
  TCampaigns,
} from "../../global.types/campaigns.types";
import {
  formatUSD,
  isDateRangeValid,
  usersMap,
} from "../../services/global.utils";

type TCampaignsState = {
  isLoading: boolean;
  campaigns: TCampaigns;
  filteredCampaigns: TCampaigns;
  isError: boolean;
  isAddCampaignsLoading: boolean;
  isAddCampaignsError: boolean;
};

const initialState: TCampaignsState = {
  isLoading: false,
  campaigns: [],
  filteredCampaigns: [],
  isError: false,
  isAddCampaignsLoading: false,
  isAddCampaignsError: false,
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
      state.isLoading = false;
      state.campaigns = action.payload.campaigns.map((campaign: TCampaign) => ({
        ...campaign,
        userName:
          usersMap(action.payload.users)[campaign.userId] || "Unknown user",
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

    addCampaignsInit: (state, _action: PayloadAction<TAddCampaignsParams>) => {
      state.isAddCampaignsLoading = true;
      state.isAddCampaignsError = false;
    },

    addCampaignsSuccess: (state, action) => {
      state.isAddCampaignsLoading = false;
      state.isAddCampaignsError = false;
      state.campaigns = [
        ...state.campaigns,
        ...action.payload.campaigns.map((campaign: TCampaign) => ({
          ...campaign,
          userName:
            usersMap(action.payload.users)[campaign.userId] || "Unknown user",
          isActive: isDateRangeValid(campaign.startDate, campaign.endDate)
            ? "Active"
            : "Inactive",
          displayBudget: formatUSD(campaign.Budget),
        })),
      ];
    },

    addCampaignsError: (state) => {
      state.isAddCampaignsLoading = false;
      state.isAddCampaignsError = true;
    },
  },
});

export const {
  getCampaigns,
  campaignsFetchSuccess,
  campaignsFetchError,
  addCampaignsInit,
  filterCampaigns,
  addCampaignsSuccess,
  addCampaignsError,
} = campaignSlice.actions;

export default campaignSlice.reducer;

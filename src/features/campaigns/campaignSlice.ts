import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  TAddCampaignsParams,
  TCampaign,
  TCampaigns,
} from "../../global.types/campaigns.types";
import {
  dateFormatter,
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
  isAddCampaignsSuccess: boolean;
  isAddCampaignsError: boolean;
};

const initialState: TCampaignsState = {
  isLoading: false,
  campaigns: [],
  filteredCampaigns: [],
  isError: false,
  isAddCampaignsLoading: false,
  isAddCampaignsSuccess: false,
  isAddCampaignsError: false,
};

const formatCampaign = (
  campaign: TCampaign,
  users: Record<string, string>
) => ({
  ...campaign,
  userName: users[campaign.userId] || "Unknown user",
  isActive: isDateRangeValid(campaign.startDate, campaign.endDate)
    ? "Active"
    : "Inactive",
  displayBudget: formatUSD(campaign.Budget),
});

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
      const { campaigns, users } = action.payload;
      const mappedUsers = usersMap(users);

      state.isLoading = false;
      state.campaigns = campaigns
        .filter((campaign: TCampaign) => campaign.endDate < campaign.startDate)
        .map((campaign: TCampaign) => formatCampaign(campaign, mappedUsers));
      state.isError = false;
      state.filteredCampaigns = [];
    },

    campaignsFetchError: (state) => {
      state.isLoading = false;
      state.campaigns = [];
      state.isError = true;
      state.filteredCampaigns = [];
    },

    filterCampaigns: (state, action: PayloadAction<string>) => {
      const search = action.payload.toLowerCase();
      state.filteredCampaigns = state.campaigns.filter((campaign) =>
        campaign.name.toLowerCase().includes(search)
      );
    },

    filterWithDateSelection: (
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      const { start, end } = action.payload;
      state.filteredCampaigns = state.campaigns.filter(
        (campaign) =>
          (dateFormatter(campaign.startDate) > start &&
            dateFormatter(campaign.startDate) < end) ||
          (dateFormatter(campaign.endDate) > start &&
            dateFormatter(campaign.endDate) < end)
      );
    },

    addCampaignsInit: (state, _action: PayloadAction<TAddCampaignsParams>) => {
      state.isAddCampaignsLoading = true;
      state.isAddCampaignsError = false;
      state.isAddCampaignsSuccess = false;
    },

    addCampaignsSuccess: (state, action) => {
      const { campaigns, users } = action.payload;
      const mappedUsers = usersMap(users);

      state.isAddCampaignsLoading = false;
      state.isAddCampaignsSuccess = true;
      state.isAddCampaignsError = false;
      state.campaigns.push(
        ...campaigns.map((campaign: TCampaign) =>
          formatCampaign(campaign, mappedUsers)
        )
      );
    },

    addCampaignsError: (state) => {
      state.isAddCampaignsLoading = false;
      state.isAddCampaignsError = true;
      state.isAddCampaignsSuccess = false;
    },

    resetAddCampaigns: (state) => {
      state.isAddCampaignsLoading = false;
      state.isAddCampaignsError = false;
      state.isAddCampaignsSuccess = false;
    },
  },
});

export const {
  getCampaigns,
  campaignsFetchSuccess,
  campaignsFetchError,
  addCampaignsInit,
  filterCampaigns,
  filterWithDateSelection,
  addCampaignsSuccess,
  addCampaignsError,
  resetAddCampaigns,
} = campaignSlice.actions;

export default campaignSlice.reducer;

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store.types";

export const selectCampaign = (state: RootState) => state.campaign;

export const campaignList = createSelector([selectCampaign], (campaign) => ({
  campaigns: campaign.campaigns,
  isLoading: campaign.isLoading,
  isError: campaign.isError,
  filteredCampaigns: campaign.filteredCampaigns,
}));

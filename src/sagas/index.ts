import { takeLatest } from "redux-saga/effects";
import {
  addCampaignsInit,
  getCampaigns,
} from "../features/campaigns/campaignSlice";
import {
  addCampaignsSaga,
  campaignSaga,
} from "../features/campaigns/campaignSaga";

function* watchers() {
  yield takeLatest(getCampaigns.type, campaignSaga);
  yield takeLatest(addCampaignsInit.type, addCampaignsSaga);
}

export default watchers;

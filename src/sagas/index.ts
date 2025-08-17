import { takeLatest } from "redux-saga/effects";
import { getCampaigns } from "../features/campaigns/campaignSlice";
import campaignSaga from "../features/campaigns/campaignSaga";

function* watchers() {
  yield takeLatest(getCampaigns.type, campaignSaga);
}

export default watchers;

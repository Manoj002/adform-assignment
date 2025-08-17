import { call, put } from "redux-saga/effects";
import { fetchCampaign, fetchUsers } from "../../services/apiService";
import { campaignsFetchError, campaignsFetchSuccess } from "./campaignSlice";
import type { TCampaigns } from "../../global.types/campaigns.types";
import type { TUsers } from "../../global.types/users.types";

function* campaignSaga() {
  try {
    const campaigns: TCampaigns = yield call(fetchCampaign);
    const users: TUsers = yield call(fetchUsers);
    yield put(campaignsFetchSuccess({ campaigns, users }));
  } catch (error: any) {
    yield put(campaignsFetchError(error.message));
  }
}

export default campaignSaga;

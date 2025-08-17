import { call, put } from "redux-saga/effects";
import { fetchCampaign, fetchUsers } from "../../services/apiService";
import {
  addCampaignsError,
  addCampaignsSuccess,
  campaignsFetchError,
  campaignsFetchSuccess,
} from "./campaignSlice";
import type {
  TAddCampaignsParams,
  TCampaigns,
} from "../../global.types/campaigns.types";
import type { TUsers } from "../../global.types/users.types";
import type { PayloadAction } from "@reduxjs/toolkit";

function* campaignSaga() {
  try {
    const campaigns: TCampaigns = yield call(fetchCampaign);
    const users: TUsers = yield call(fetchUsers);
    yield put(campaignsFetchSuccess({ campaigns, users }));
  } catch (error: any) {
    yield put(campaignsFetchError(error.message));
  }
}

function* addCampaignsSaga(action: PayloadAction<TAddCampaignsParams>) {
  console.log({ action });
  try {
    const users: TUsers = yield call(fetchUsers);
    yield put(
      addCampaignsSuccess({ campaigns: action.payload.campaigns, users })
    );
  } catch (error: any) {
    console.log({ error });
    yield put(addCampaignsError(error.message));
  }
}

export { campaignSaga, addCampaignsSaga };

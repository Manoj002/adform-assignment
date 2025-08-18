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
import { showSnackbar } from "../snackbar/snackbarSlice";

function* campaignSaga() {
  try {
    const campaigns: TCampaigns = yield call(fetchCampaign);
    const users: TUsers = yield call(fetchUsers);
    yield put(campaignsFetchSuccess({ campaigns, users }));
  } catch (error: any) {
    yield put(campaignsFetchError(error.message));
    yield put(
      showSnackbar({
        message: "Failed to fetch campaigns",
        severity: "error",
      })
    );
  }
}

function* addCampaignsSaga(action: PayloadAction<TAddCampaignsParams>) {
  try {
    const users: TUsers = yield call(fetchUsers);
    yield put(
      addCampaignsSuccess({ campaigns: action.payload.campaigns, users })
    );
  } catch (error: any) {
    yield put(addCampaignsError(error.message));
    yield put(
      showSnackbar({
        message: "Add Campaign failed",
        severity: "error",
      })
    );
  }
}

export { campaignSaga, addCampaignsSaga };

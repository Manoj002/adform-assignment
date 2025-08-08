import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    campaigns: {
        data: "Campaign 1"
    }
};

const campaignSlice = createSlice({
    name: "CAMPAIGN",
    initialState,
    reducers: {}
})

export default campaignSlice.reducer;
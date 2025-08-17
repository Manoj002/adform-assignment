import MOCK_CAMPAIGN_DATA from "../../mocks/campaigns.json";
import type { TCampaigns } from "../global.types/campaigns.types";
import type { TUsers } from "../global.types/users.types";
import { GET_USERS_URL } from "./apiUrls";

export const fetchCampaign = (): TCampaigns => {
  let campaignsResult = new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CAMPAIGN_DATA);
    }, 500);
  });

  return campaignsResult as unknown as TCampaigns;
};

export const fetchUsers = async (): Promise<TUsers> => {
  const usersPromise = await fetch(GET_USERS_URL);

  const usersList = await usersPromise.json();
  return usersList;
};

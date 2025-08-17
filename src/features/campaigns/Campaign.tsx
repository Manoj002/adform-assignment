import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import MultiInputDateRangePicker from "../../components/DateRangePicker";
import { filterCampaigns, getCampaigns } from "./campaignSlice";
import CampaignTable from "../../components/Table";
import { campaignsColumnDef } from "./campaign.constants";
import PageLayout from "../../components/Layout";
import { campaignList } from "./campaignSelectors";

const Campaign = () => {
  const [campaignSearchValue, setCampaignSearchValue] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const dispatch = useDispatch();
  const { isLoading, campaigns, isError, filteredCampaigns } =
    useSelector(campaignList);

  const handleCampaignNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCampaignSearchValue(event.target.value);
    if (!campaignSearchValue) setIsFiltered(false);
  };

  const handleFilterCampaigns = () => {
    setIsFiltered(true);
    dispatch(filterCampaigns(campaignSearchValue));
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleFilterCampaigns();
  };

  const fetchData = () => {
    dispatch(getCampaigns());
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="absolute flex top-0 left-0 w-[100%] h-[100%] bg-transparent text-white justify-center items-center">
        <div className="border-8 border-solid border-blue-500 w-[100px] h-[100px] rounded-[50px] animate-spin" />
      </div>
    );
  }

  return (
    <PageLayout>
      <div className="w-[100%] h-[100%]  flex flex-row justify-between">
        <div className="flex w-[50%]">
          {/* <MultiInputDateRangePicker autoFocus disablePast /> */}
        </div>

        <div>
          <input
            className="px-2 py-1 border-l border-t border-b border-solid border-black font-md rounded-tl-sm rounded-bl-sm focus:rounded-tr-none focus:rounded-br-none"
            name="search_campaign"
            placeholder="Search by name"
            type="text"
            onChange={handleCampaignNameChange}
            onKeyDown={handleOnKeyDown}
          />
          <button
            className="px-2 py-1 font-thin border border-solid border-black rounded-tr rounded-br bg-blue-500 text-white tracking-wide cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-100"
            onClick={handleFilterCampaigns}
            disabled={!campaignSearchValue}
          >
            SEARCH
          </button>
        </div>
      </div>
      <div className="mt-12">
        <CampaignTable
          columns={campaignsColumnDef}
          rows={
            campaignSearchValue && isFiltered ? filteredCampaigns : campaigns
          }
        />
      </div>
    </PageLayout>
  );
};

export default Campaign;

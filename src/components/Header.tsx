import { headerIconUrl } from "../services/apiUrls";

const Header = () => {
  return (
    <div className="p-4 flex flex-row shadow-sm">
      <img src={headerIconUrl} alt="adform-log" className="w-20 mx-4" />
    </div>
  );
};

export default Header;

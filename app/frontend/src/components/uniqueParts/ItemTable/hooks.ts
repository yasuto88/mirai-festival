import { useSelector } from "react-redux";
import { RootState } from "../../../reducks/store";

export const useItemTable = () => {
  const items = useSelector((state: RootState) => state.user.user?.items);
  console.log(items);

  return {
    items: items || [],
  };
};

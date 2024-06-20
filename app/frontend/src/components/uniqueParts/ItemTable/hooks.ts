import { useSelector } from "react-redux";
import { RootState } from "../../../reducks/store";

export const useItemTable = () => {
  const items = useSelector((state: RootState) => {
    const possessionList = state.user.possession_list;
    if (typeof possessionList === "string") {
      try {
        return JSON.parse(possessionList);
      } catch (error) {
        console.error("Failed to parse possession list:", error);
        return [];
      }
    }
    return possessionList || [];
  });
  console.log(items);

  return {
    items,
  };
};

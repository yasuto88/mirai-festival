import React from "react";
import ItemTablePresenter from "./presenter";
import { useItemTable } from "./hooks";

const ItemTableContainer: React.FC = () => {
  const { items } = useItemTable();

  return <ItemTablePresenter items={items} />;
};

export default ItemTableContainer;

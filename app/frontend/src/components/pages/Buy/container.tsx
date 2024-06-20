import React from "react";
import BuyPagePresenter from "./presenter";
import { useBuy } from "./hooks";

const BuyPageContainer: React.FC = () => {
  const {
    product,
    quantity,
    setQuantity,
    handleAddItem,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    snackbarColor,
  } = useBuy();

  return (
    <BuyPagePresenter
      product={product}
      quantity={quantity}
      setQuantity={setQuantity}
      handleAddItem={handleAddItem}
      snackbarOpen={snackbarOpen}
      setSnackbarOpen={setSnackbarOpen}
      snackbarMessage={snackbarMessage}
      snackbarColor={snackbarColor}
    />
  );
};

export default BuyPageContainer;

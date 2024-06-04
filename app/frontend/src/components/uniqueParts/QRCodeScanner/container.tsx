import React from "react";
import QRCodeScannerPresenter from "./presenter";
import { useQRCodeScanner } from "./hooks";

const QRCodeScannerContainer: React.FC = () => {
  const { handleScan } = useQRCodeScanner();

  return <QRCodeScannerPresenter onScan={handleScan} />;
};

export default QRCodeScannerContainer;

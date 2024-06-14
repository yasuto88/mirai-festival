import React, { useState } from "react";
import QRCodeScannerPresenter from "./presenter";
import { useQRCodeScanner } from "./hooks";

const QRCodeScannerContainer: React.FC = () => {
  const { handleScan, videoRef, canvasRef, error, stopScan } =
    useQRCodeScanner();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    handleScan();
  };

  const handleClose = () => {
    setOpen(false);
    stopScan();
  };

  return (
    <QRCodeScannerPresenter
      onScan={handleOpen}
      videoRef={videoRef}
      canvasRef={canvasRef}
      error={error}
      open={open}
      onClose={handleClose}
    />
  );
};

export default QRCodeScannerContainer;

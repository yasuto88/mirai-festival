import React from "react";
import { Box, Button } from "@mui/joy";

type Props = {
  onScan: () => void;
};

const QRCodeScannerPresenter: React.FC<Props> = ({ onScan }) => (
  <Box sx={{ padding: 2 }}>
    <Button variant="outlined" color="primary" onClick={onScan}>
      QRコードを読む
    </Button>
  </Box>
);

export default QRCodeScannerPresenter;

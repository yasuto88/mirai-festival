import React from "react";
import { Box, Table, Typography } from "@mui/joy";

type Item = {
  name: string;
  quantity: number;
};

type Props = {
  items: Item[];
};

const ItemTablePresenter: React.FC<Props> = ({ items }) => (
  <Box sx={{ padding: 2, mb: 2 }}>
    <Typography level="title-md" sx={{ mb: 1 }}>
      所持物
    </Typography>
    <Table variant="soft">
      <thead>
        <tr>
          <th>所持物</th>
          <th>個数</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <th>{item.name}</th>
            <th>{item.quantity}</th>
          </tr>
        ))}
      </tbody>
    </Table>
  </Box>
);

export default ItemTablePresenter;

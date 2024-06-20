import React from "react";
import { Box, Table, Typography } from "@mui/joy";
import { Item } from "../../../reducks/user/types";

type Props = {
  items: Item[];
};

const ItemTablePresenter: React.FC<Props> = ({ items }) => (
  <Box sx={{ padding: 2, mb: 2 }}>
    <Typography level="title-md" sx={{ mb: 1 }}>
      所持品
    </Typography>
    <Table variant="soft">
      <thead>
        <tr>
          <th>所持品</th>
          <th>個数</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.product_name}</td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Box>
);

export default ItemTablePresenter;

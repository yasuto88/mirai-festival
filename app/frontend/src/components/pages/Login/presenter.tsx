import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import { Sheet } from "@mui/joy";

interface Props {
  studentNumber: string;
  adminPassword: string;
  isPersistent: boolean;
  handleChangeStudentNumber: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeAdminPassword: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleChangeIsPersistent: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginPresenter: React.FC<Props> = ({
  studentNumber,
  adminPassword,
  isPersistent,
  handleChangeStudentNumber,
  handleChangeAdminPassword,
  handleChangeIsPersistent,
  handleSubmit,
}) => {
  return (
    <Sheet>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          width: "100%",
          px: 2,
        }}
      >
        <Box
          component="main"
          sx={{
            my: "auto",
            py: 2,
            pb: 5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 400,
            maxWidth: "100%",
            mx: "auto",
            borderRadius: "sm",
            "& form": {
              display: "flex",
              flexDirection: "column",
              gap: 2,
            },
            [`& .MuiFormLabel-asterisk`]: {
              visibility: "hidden",
            },
          }}
        >
          <Stack>
            <Typography component="h1" level="h3">
              ログイン
            </Typography>
          </Stack>
          <Divider
            sx={(theme) => ({
              [theme.getColorSchemeSelector("light")]: {
                color: { xs: "#FFF", md: "text.tertiary" },
              },
            })}
          >
            or
          </Divider>
          <Stack gap={4}>
            <Checkbox
              id="persistent"
              name="persistent"
              variant="soft"
              sx={{ display: "flex", alignItems: "center" }}
              label="管理者でログイン"
              checked={isPersistent}
              onChange={handleChangeIsPersistent}
            />
          </Stack>
          <Stack gap={4} sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
              <FormControl required>
                <FormLabel>学籍番号</FormLabel>
                <Input
                  type="number"
                  name="studentNumber"
                  value={studentNumber}
                  onChange={handleChangeStudentNumber}
                />
              </FormControl>
              {isPersistent && (
                <FormControl required>
                  <FormLabel>管理者パスワード</FormLabel>
                  <Input
                    type="password"
                    name="adminPassword"
                    value={adminPassword}
                    onChange={handleChangeAdminPassword}
                  />
                </FormControl>
              )}
              <Stack gap={4} sx={{ mt: 2 }}>
                <Button type="submit" fullWidth variant="outlined">
                  ログイン
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Box>
    </Sheet>
  );
};

export default LoginPresenter;

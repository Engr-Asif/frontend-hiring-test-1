import React from "react";

import {
  Button,
  useTheme,
  Container,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import { TurningLogo } from "@assets";
import { authActions } from "@slices";
import { useDispatch } from "@store";
import { paths } from "@root/paths";
import { useRouter } from "next/navigation";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/material";

function Header(): JSX.Element {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(authActions.logout());
    router.push(paths.auth.login);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.paper",
        boxShadow: theme.shadows[5],
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ p: 1 }}>
          <Box sx={{ flexGrow: 1, display: { lg: "flex" } }}>
            <Link href="/">
              <Image src={TurningLogo} width={matches ? 210 : 430} alt="" />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button size="small" variant="contained" onClick={handleLogout}>
              LogOut
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

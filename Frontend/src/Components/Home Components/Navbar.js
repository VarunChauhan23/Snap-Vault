import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom";
import "./Homecomponents.css";
import notify from "../Notify Components/Notification";
import { useLoadingBar } from "../../context/LoadingBarContext";

const pages = ["MyImages"];

function Navbar() {
  const navigate = useNavigate();
  const { setProgress } = useLoadingBar();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const authToken = localStorage.getItem("authToken");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    notify("Logout successfully", "success");
    setProgress(100);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link className="links" to="/">
              SnapVault
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link key={page} className="links" to={`/${page}`}>
                    <Button
                      textalign="center"
                      sx={{
                        color: "black",
                        fontWeight: 700,
                        fontSize: "15px",
                        width: "100%",
                      }}
                    >
                      {page}
                    </Button>
                  </Link>
                  {!authToken && (
                    <>
                      <Link className="links" to={`/SignUp`}>
                        <Button
                          textalign="center"
                          sx={{
                            color: "black",
                            fontWeight: 700,
                            fontSize: "15px",
                            width: "100%",
                          }}
                        >
                          SignUp
                        </Button>
                      </Link>
                      <Link className="links" to={`/Login`}>
                        <Button
                          textalign="center"
                          sx={{
                            color: "black",
                            fontWeight: 700,
                            fontSize: "15px",
                            width: "100%",
                          }}
                        >
                          Login
                        </Button>
                      </Link>
                    </>
                  )}

                  {authToken && (
                    <Link className="links" to={`/`}>
                      <Button
                        textalign="center"
                        onClick={handleLogout}
                        sx={{
                          color: "black",
                          fontWeight: 700,
                          fontSize: "15px",
                          width: "100%",
                        }}
                      >
                        Log Out
                      </Button>
                    </Link>
                  )}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link className="links" to="/">
              SnapVault
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link className="links" to={`/MyImages`}>
              <Button
                textalign="center"
                sx={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "15px",
                  width: "100%",
                }}
              >
                MyImages
              </Button>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <>
              {!authToken && (
                <>
                  <Link className="links" to={`/SignUp`}>
                    <Button variant="contained" color="success" sx={{ mr: 1 }}>
                      SignUp
                    </Button>
                  </Link>
                  <Link className="links" to={`/Login`}>
                    <Button variant="contained" color="success" sx={{ ml: 1 }}>
                      Login
                    </Button>
                  </Link>
                </>
              )}

              {authToken && (
                  <Button variant="contained" color="success" onClick={handleLogout}>
                    Log Out
                  </Button>
              )}
            </>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

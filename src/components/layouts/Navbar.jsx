import React from "react"
import { Stack, Box, Button, Typography, IconButton, useMediaQuery } from "@mui/material"
import { navHeight, navLinks } from "../../utils/constants"
import { Link } from "react-router-dom"
import { useLogoutMutation, useFetchProfileQuery } from "../../store"
import MenuIcon from "@mui/icons-material/Menu"
import GoogleIcon from "@mui/icons-material/Google"
import { useDispatch } from "react-redux"
import { toggleSidebar } from "../../store"
import { useBackendErrorHandler } from "../../hooks/useBackendErrorHandler"

const Navbar = () => {
  const dispatch = useDispatch()
  const isSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"))
  const [logout, { isLoading }] = useLogoutMutation()
  const {
    data: { data: user = null },
  } = useFetchProfileQuery()
  const { errorHandler } = useBackendErrorHandler()

  const logoutHandler = () => logout().unwrap().catch(errorHandler)

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "fixed",
          zIndex: 1,
          height: navHeight,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(3px)",
          px: {
            xs: "12px",
            sm: "24px",
          },
        }}
      >
        <Link to="/">
          <Box component="img" src="/favicon.svg" height="65px" />
        </Link>

        {user &&
          (isSmall ? (
            <IconButton onClick={() => dispatch(toggleSidebar(true))}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Stack flexDirection="row" gap={2}>
              {navLinks.map((link, idx) => (
                <Stack key={idx} flexDirection="row" alignItems="center" gap={0.3}>
                  <link.Icon />
                  <Link to={link.href}>
                    <Typography fontFamily="Righteous" fontSize="14px">
                      {link.title}
                    </Typography>
                  </Link>
                </Stack>
              ))}

              <Button variant="contained" color="error" onClick={logoutHandler} disabled={isLoading}>
                logout
              </Button>
            </Stack>
          ))}

        {!user && (
          <Button
            startIcon={<GoogleIcon />}
            variant="contained"
            color="primary"
            href={`${import.meta.env.VITE_SERVER_URL}/user/login/google`}
          >
            login
          </Button>
        )}
      </Stack>

      <Box flexShrink={0} height={navHeight} />
    </>
  )
}

export default Navbar

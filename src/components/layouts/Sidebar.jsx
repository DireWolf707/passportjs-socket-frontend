import React, { useEffect } from "react"
import { useMediaQuery, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Button } from "@mui/material"
import { Link } from "react-router-dom"
import { navLinks } from "../../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../../store"
import { useLogoutMutation } from "../../store"
import { useBackendErrorHandler } from "../../hooks/useBackendErrorHandler"

const Sidebar = () => {
  const dispatch = useDispatch()
  const { sidebar: open } = useSelector((store) => store.data)
  const isSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"))
  const [logout, { isLoading }] = useLogoutMutation()
  const { errorHandler } = useBackendErrorHandler()

  const closeSidebar = () => dispatch(toggleSidebar(false))
  const logoutHandler = () => {
    logout().unwrap().catch(errorHandler)
    closeSidebar()
  }

  useEffect(() => {
    if (!isSmall && open) closeSidebar()
  }, [isSmall])

  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={open}
      onClose={closeSidebar}
      PaperProps={{
        sx: {
          bgcolor: "#000",
          gap: 2,
          px: "12px",
          py: "24px",
          width: "260px",
        },
      }}
    >
      <Box component="img" src="logo.svg" height="140px" />

      <List sx={{ overflow: "auto" }}>
        {navLinks.map((link, idx) => (
          <Link key={idx} to={link.href} underline="none" onClick={closeSidebar}>
            <ListItemButton>
              <ListItemIcon>
                <link.Icon />
              </ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItemButton>
          </Link>
        ))}
      </List>

      <Button variant="contained" color="error" onClick={logoutHandler} disabled={isLoading}>
        logout
      </Button>
    </Drawer>
  )
}

export default Sidebar

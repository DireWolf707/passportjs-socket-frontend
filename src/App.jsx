import React from "react"
import { Routes, Route } from "react-router-dom"
import { Stack } from "@mui/material"
import Navbar from "./components/layouts/Navbar"
import Sidebar from "./components/layouts/Sidebar"
import ThreeBars from "./components/loaders/ThreeBars"
import LoggedInRoute from "./components/wrappers/LoggedInRoute"
import { Profile, Home, Chat, Error404, Error500 } from "./pages"
import { useFetchProfileQuery } from "./store"

const App = () => {
  const { data: profile, isLoading, isError } = useFetchProfileQuery()
  const user = profile?.data

  if (isLoading || isError)
    return (
      <Stack height="100vh" width="100vw">
        <ThreeBars />
      </Stack>
    )

  return (
    <Stack minHeight="100vh" width="100vw" bgcolor="brown">
      <Navbar />
      {user && <Sidebar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {/* LoggedIn Routes */}
        <Route element={<LoggedInRoute redirectPath="/" />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
        </Route>
        {/* Server Error (500) */}
        <Route path="/500" element={<Error500 />} />
        {/* Unknown Routes (404) */}
        <Route path="*" element={<Error404 />} />
        {/* End */}
      </Routes>
    </Stack>
  )
}

export default App

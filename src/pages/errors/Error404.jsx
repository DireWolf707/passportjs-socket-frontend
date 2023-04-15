import React from "react"
import { Stack, Box } from "@mui/material"

const Error404 = () => {
  return (
    <Stack flexGrow={1}>
      <Box component="img" height="70vh" width="70vw" m="auto" src="/error404.svg" />
    </Stack>
  )
}

export default Error404

import React from "react"
import { Stack, Box } from "@mui/material"

const Error500 = () => {
  return (
    <Stack flexGrow={1}>
      <Box component="img" height="70vh" width="70vw" m="auto" src="/error500.svg" />
    </Stack>
  )
}

export default Error500

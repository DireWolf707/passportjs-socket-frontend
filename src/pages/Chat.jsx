import React, { useState, useEffect } from "react"
import { Stack, Button } from "@mui/material"
import { io } from "socket.io-client"

const Chat = () => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const URL = import.meta.env.VITE_SERVER_URL
    const socket = io(URL, { withCredentials: true })
    setSocket(socket)

    socket.on("connect", () => {
      console.log("connected")
    })

    socket.on("connect_error", console.log)
    
    socket.on("disconnect", () => {
      console.log("disconnected")
    })

    return () => socket.disconnect()
  }, [])

  const whoAmI = () => {
    socket.emit("whoami")
  }

  return (
    <Stack>
      <Button onClick={whoAmI} variant="contained">
        Who Am I
      </Button>
    </Stack>
  )
}

export default Chat

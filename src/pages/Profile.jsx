import React, { useState, useRef } from "react"
import { Stack, Box, TextField, Button, IconButton } from "@mui/material"
import { useBackendErrorHandler } from "../hooks/useBackendErrorHandler"
import { useSnackbar } from "notistack"
import { toastOptions } from "../utils/toastOptions"
import { useUpdateProfileMutation, useDeleteAvatarMutation, useUpdateAvatarMutation, useFetchProfileQuery } from "../store"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import DeleteIcon from "@mui/icons-material/Delete"
import ThreeBars from "../components/loaders/ThreeBars"

const Profile = () => {
  const { enqueueSnackbar: toast } = useSnackbar()
  const {
    data: { data: user },
    isFetching,
  } = useFetchProfileQuery()
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const [updateAvatar, { isLoading: isAvatarUpdating }] = useUpdateAvatarMutation()
  const [deleteAvatar, { isLoading: isAvatarDeleting }] = useDeleteAvatarMutation()

  const fileRef = useRef(null)
  const nameRef = useRef(null)
  const usernameRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const { errorHandler } = useBackendErrorHandler(setFormErrors)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const name = nameRef.current.value
    const username = usernameRef.current.value

    updateProfile({ name, username })
      .unwrap()
      .then((resp) => {
        setFormErrors({})
        toast(resp.data, toastOptions())
      })
      .catch(errorHandler)
  }

  const handleUpdateAvatar = async (e) => {
    const file = e.target.files[0]
    const avatarData = new FormData()
    avatarData.append("file", file)

    updateAvatar({ avatarData })
      .unwrap()
      .then((resp) => toast(resp.data, toastOptions()))
      .catch(errorHandler)
  }

  const handleDeleteAvatar = async () => {
    deleteAvatar()
      .unwrap()
      .then((resp) => toast(resp.data, toastOptions()))
      .catch(errorHandler)
  }

  if (isFetching) return <ThreeBars />

  return (
    <Stack
      component="form"
      alignItems="center"
      onSubmit={handleSubmit}
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white", width: "320px" }}
    >
      <Stack flexDirection="row" alignItems="end" sx={{ mt: "-106px", mb: "12px" }}>
        <IconButton onClick={handleDeleteAvatar} disabled={isAvatarDeleting} sx={{ mb: "34px", visibility: !user.avatar && "hidden" }}>
          <DeleteIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
        </IconButton>

        <Box
          component="img"
          src={user.avatar || "/blank-profile.svg"}
          sx={{ height: "180px", width: "180px", bgcolor: "whitesmoke", borderRadius: "100%", objectFit: "cover" }}
        />

        <IconButton onClick={() => fileRef.current.click()} sx={{ mb: "34px" }}>
          <input ref={fileRef} onChange={handleUpdateAvatar} disabled={isAvatarUpdating} type="file" hidden />
          <AddAPhotoIcon fontSize="large" sx={{ fill: "red", p: "2px" }} />
        </IconButton>
      </Stack>

      <TextField
        label="Email"
        variant="outlined"
        size="small"
        color="error"
        fullWidth
        type="email"
        defaultValue={user.email}
        disabled={true}
      />

      {[
        { label: "Name", errField: "name", ref: nameRef, type: "text", required: true, initialValue: user.name },
        { label: "Username", errField: "username", ref: usernameRef, type: "text", required: true, initialValue: user.username },
      ].map(({ label, errField, ref, type, required, initialValue, disabled }, idx) => (
        <TextField
          key={idx}
          inputProps={{ ref }}
          label={label}
          variant="outlined"
          size="small"
          color="error"
          fullWidth
          required={required}
          type={type}
          error={Boolean(formErrors[errField])}
          helperText={formErrors[errField]}
          defaultValue={initialValue}
          disabled={disabled}
        />
      ))}

      <Button type="submit" variant="contained" color="error" fullWidth disabled={isLoading || isAvatarUpdating || isAvatarDeleting}>
        Update Details
      </Button>
    </Stack>
  )
}

export default Profile

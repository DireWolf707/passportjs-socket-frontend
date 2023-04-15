import { useSnackbar } from "notistack"
import { useCallback } from "react"
import { capitalize } from "@mui/material"
import { toastOptions as toastDefaultOptions } from "../utils/toastOptions"

const toastOptions = toastDefaultOptions("error")

const defaultHandler = ({ message }, toast) => toast(message, toastOptions)

const handleError400 = ({ message }, toast, setFormErrors) => {
  if (message.indexOf(":") < 0) return toast(message, toastOptions)

  const formError = {}
  message.split(",").map((e) => {
    const [field, value] = e.split(":")
    formError[field] = capitalize(value)
  })
  setFormErrors(formError)
}

export const useBackendErrorHandler = (setFormErrors) => {
  const { enqueueSnackbar: toast } = useSnackbar()

  const errorHandler = useCallback(
    (err) => {
      console.log(err)

      switch (err.status) {
        case 400:
          handleError400(err.data, toast, setFormErrors)
          break

        case "FETCH_ERROR":
          toast("Server is unreachable at the moment!", toastOptions)
          break

        default:
          console.log(err)
          break
      }
    },
    [setFormErrors]
  )

  return { errorHandler }
}

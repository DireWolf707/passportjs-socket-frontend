import { Navigate, Outlet } from "react-router-dom"
import { useFetchProfileQuery } from "../../store"

const LoggedInRoute = ({ redirectPath }) => {
  const {
    data: { data: user = null },
  } = useFetchProfileQuery()

  if (!user) return <Navigate to={redirectPath} replace />
  return <Outlet />
}

export default LoggedInRoute

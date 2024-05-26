import { useDispatch } from "react-redux"
import { updateUser, getUser } from "../redux/actions/users"
import useMessage from "@mod/mobile-common/lib/hooks/utils/useMessage"
import { useState } from "react"

const useHandleUpdateUser = () => {
  const dispatch = useDispatch()

  const [dataNotifications, setDataNotifications] = useState({
    expoPushToken: null,
  })

  const { message, setMessage } = useMessage()

  const handleUpdatePreferences = async (dataNotifications, userId) => {
    try {
      await dispatch(updateUser(dataNotifications, userId))
      await dispatch(getUser(userId))
      setMessage({ success: "Données mise à jour" })
    } catch (error) {
      console.log("handleUpdatePreferences", error)
      setMessage({ error: error.message })
    }
  }
  return {
    handleUpdatePreferences,
    message,
    setMessage,
    dataNotifications,
    setDataNotifications,
  }
}

export default useHandleUpdateUser
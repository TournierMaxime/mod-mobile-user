import { useDispatch } from "react-redux"
import { updateUser, getUser } from "../redux/actions/users"
import { useState } from "react"
import { AppDispatch } from "store"
import { toast } from "modules/mod-mobile-common/lib/toast"

interface Data {
  expoPushToken: string
  isEmailActive: boolean
}

/* interface Props {
  dataNotifications: Data
  setDataNotifications: (dataNotifications: Data) => void
} */

const useHandleUpdateUser = () => {
  const dispatch: AppDispatch = useDispatch()

  const [dataNotifications, setDataNotifications] = useState<Data>({
    expoPushToken: "",
    isEmailActive: false,
  })

  const handleUpdatePreferences = toast(
    async (dataNotifications: Data, userId: string) => {
      try {
        await dispatch(updateUser(dataNotifications, userId))
        await dispatch(getUser(userId))
      } catch (error: any) {
        throw new Error(error)
      }
      return {
        toastMessage: "Update",
      }
    },
  )
  return {
    handleUpdatePreferences,
    dataNotifications,
    setDataNotifications,
  }
}

export default useHandleUpdateUser

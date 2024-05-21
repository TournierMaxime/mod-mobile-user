import React, { useState } from "react"
import { View } from "react-native"
import { updateUser } from "../../../redux/actions/users"
import { setUserWithLocalStorage } from "@mod/mobile-auth/redux/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { AlertMessage } from "@mod/mobile-common/lib/components/utils/AlertMessage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Form from "@mod/mobile-common/lib/class/Form"

const UpdateUserName = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const localStorageData = useSelector((state) => state.auth.data)

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { background } = useDynamicThemeStyles(darkMode)

  const { t } = useTranslation()

  const [data, setData] = useState({
    pseudo: localStorageData.user?.pseudo || "",
  })

  const handleUpdate = async () => {
    const updatedUserData = {
      ...localStorageData,
      user: {
        ...localStorageData.user,
        pseudo: data.pseudo,
      },
    }

    try {
      await dispatch(updateUser({ pseudo: data?.pseudo }, userId))
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData))
      await dispatch(setUserWithLocalStorage(updatedUserData))
      AlertMessage(t("actions.profileUpdated"))
    } catch (error) {
      console.log(error.response.data.errMsg)

      if (error.response.data.errMsg) {
        AlertMessage(error.response.data.errMsg)
      } else {
        AlertMessage(t("errors.anErrorHasOccurred"))
      }
    }
  }

  return (
    <View style={tw`${background} p-4 h-full`}>
      {Form.inputText(
        data,
        setData,
        t("utils.userName"),
        "pseudo",
        data.pseudo,
      )}
      {Form.submit(t("utils.update"), handleUpdate)}
    </View>
  )
}

export default UpdateUserName

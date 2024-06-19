import React, { useState } from "react"
import { View } from "react-native"
import { updateUser } from "../../../redux/actions/users"
import { setUserWithLocalStorage } from "@mod/mobile-auth/redux/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import AsyncStorage from "@react-native-async-storage/async-storage"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Form from "@mod/mobile-common/lib/class/Form"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { toast } from "@mod/mobile-common/lib/toast"
import { RootState, AppDispatch } from "store"
import { NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "navigators/MainStackNavigator"

interface Props {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "UpdateEmail">
  route: any
}

type FormData = {
  [key: string]: any
}

const UpdateEmail: React.FC<Props> = ({ route }) => {
  const { userId } = route.params

  const dispatch: AppDispatch = useDispatch()

  const localStorageData = useSelector((state: RootState) => state.auth.data)

  const { widthAspectRatio } = useResponsive()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const { background } = useDynamicThemeStyles(darkMode)

  const { t } = useTranslation()

  const [data, setData] = useState<FormData>({
    email: localStorageData.user?.email || "",
  })

  const handleUpdate = toast(async () => {
    const updatedUserData = {
      ...localStorageData,
      user: {
        ...localStorageData.user,
        email: data.email,
      },
    }

    try {
      await dispatch(updateUser({ email: data?.email }, userId)).then(
        async () => {
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(updatedUserData),
          )
          await dispatch(setUserWithLocalStorage(updatedUserData))
        },
      )
    } catch (error: any) {
      if (error.response.data.errMsg) {
        throw new Error(error.response.data.errMsg)
      } else {
        throw new Error(t("errors.anErrorHasOccurred"))
      }
    }
    return {
      toastMessage: t("actions.profileUpdated"),
    }
  })

  return (
    <View style={tw`items-center`}>
      <View style={widthAspectRatio()}>
        <View style={tw`${background} p-4 h-full`}>
          {Form.inputText(
            data,
            setData,
            t("utils.email"),
            "email",
            data.email,
            false,
          )}
          {Form.submit(t("utils.update"), handleUpdate, false)}
        </View>
      </View>
    </View>
  )
}

export default UpdateEmail

import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"
import Form from "@mod/mobile-common/lib/class/Form"
import useHandleUpdateUser from "../../hooks/useHandleUpdateUser"
import { getUser } from "../../redux/actions/users"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState, AppDispatch } from "store"
import { NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "navigators/MainStackNavigator"

interface NotificationsProps {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "Notifications">
  route: any
}

const Notifications: React.FC<NotificationsProps> = ({ route }) => {
  const { userId } = route.params

  const dispatch: AppDispatch = useDispatch()
  const { t } = useTranslation()

  const { fontSize } = useResponsive()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  const oneUser = useSelector((state: RootState) => state.oneUser.data?.user)

  const { handleUpdatePreferences, dataNotifications, setDataNotifications } =
    useHandleUpdateUser()

  const handleSwitchChange = async (key: string, value: string | boolean) => {
    let update: {
      isEmailActive: boolean
      expoPushToken: string
    } = {
      ...dataNotifications,
    }

    if (key === "expoPushToken") {
      const newValue = value ? await registerForPushNotificationsAsync() : ""
      update.expoPushToken = newValue
    } else if (key === "isEmailActive") {
      update.isEmailActive = !!value
    }

    setDataNotifications(update)
    await handleUpdatePreferences(update, userId)
  }

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    if (oneUser) {
      setDataNotifications({
        expoPushToken: oneUser?.expoPushToken,
        isEmailActive: oneUser?.isEmailActive,
      })
    }
  }, [oneUser])

  return (
    <View style={tw`${background} h-full`}>
      <View
        style={[
          tw`justify-center ${borderColor}`,
          { borderTopWidth: 2, borderBottomWidth: 2 },
        ]}
      >
        <View style={tw`flex flex-row justify-between mt-2 px-4 py-2`}>
          <Text style={fontSize(text)}>{t("actions.enableNotifications")}</Text>
          {Form.inputSwitch(
            Boolean(dataNotifications?.expoPushToken),
            handleSwitchChange,
            "expoPushToken",
          )}
        </View>
        <View style={tw`flex flex-row justify-between mt-2 px-4 py-2`}>
          <Text style={fontSize(text)}>{t("actions.enableEmails")}</Text>
          {Form.inputSwitch(
            Boolean(dataNotifications?.isEmailActive),
            handleSwitchChange,
            "isEmailActive",
          )}
        </View>
      </View>
    </View>
  )
}

export default Notifications

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

const Notifications = ({ route }) => {
  const { userId } = route.params

  const dispatch = useDispatch()
  const { t } = useTranslation()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  const oneUser = useSelector((state) => state.oneUser.data?.user)

  const { handleUpdatePreferences, dataNotifications, setDataNotifications } =
    useHandleUpdateUser()

  const handleSwitchChange = async (key, value) => {
    let update

    if (key === "expoPushToken") {
      const newValue = value ? await registerForPushNotificationsAsync() : ""
      update = {
        ...dataNotifications,
        [key]: newValue,
      }
    } else if (key === "isEmailActive") {
      update = {
        ...dataNotifications,
        [key]: key === "isEmailActive" ? !!value : value,
      }
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
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg ${text}`}>
          {t("utils.notifications")}
        </Text>
        <View style={tw`flex flex-row justify-between mt-2 px-4 py-2`}>
          <Text style={tw`font-normal text-base ${text}`}>
            {t("actions.enableNotifications")}
          </Text>
          {Form.inputSwitch(
            Boolean(dataNotifications?.expoPushToken),
            handleSwitchChange,
            "expoPushToken",
          )}
        </View>
        <View style={tw`flex flex-row justify-between mt-2 px-4 py-2`}>
          <Text style={tw`font-normal text-base ${text}`}>
            {t("actions.enableEmails")}
          </Text>
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

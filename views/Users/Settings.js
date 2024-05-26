import React, { useState, useEffect } from "react"
import { ScrollView, Text, View, Switch } from "react-native"
import Languages from "@mod/mobile-tmdb/lib/components/Languages"
import { useTranslation } from "react-i18next"
import packageJson from "../../../../../package.json"
import tw from "twrnc"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "@mod/mobile-common/redux/actions/theme"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import registerForPushNotificationsAsync from "@mod/mobile-common/lib/components/utils/Notifications"
import Form from "@mod/mobile-common/lib/class/Form"
import useHandleUpdateUser from "../../hooks/useHandleUpdateUser"
import { getUser } from "../../redux/actions/users"

const Settings = ({ route }) => {
  const dispatch = useDispatch()
  const { i18n, t } = useTranslation()
  const { userId } = route.params

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)
  const oneUser = useSelector((state) => state.oneUser.data?.user)
  const [token, setToken] = useState(null)

  const { handleUpdatePreferences, dataNotifications, setDataNotifications } =
    useHandleUpdateUser()

  const handleSwitchChange = async (key, value) => {
    let update = {
      ...dataNotifications,
      [key]: key === "expoPushToken" ? (value ? "pending" : "") : value,
    }

    if (key === "expoPushToken" && value) {
      const expoToken = await registerForPushNotificationsAsync()
      setToken(expoToken)
      update = { ...update, expoPushToken: expoToken }
    }

    setDataNotifications(update)
    await handleUpdatePreferences(update, userId)
    console.log("update", update)
  }

  useEffect(() => {
    dispatch(getUser(userId))
  }, [dispatch, userId])

  useEffect(() => {
    if (oneUser) {
      setDataNotifications({
        expoPushToken: oneUser.expoPushToken,
      })
    }
  }, [oneUser])

  return (
    <ScrollView style={tw`${background} h-full`}>
      <View
        style={[tw`justify-center ${borderColor}`, { borderBottomWidth: 2 }]}
      >
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg ${text}`}>
          {t("utils.versionNumber")}
        </Text>
        <Text style={tw`my-2 mx-4 font-normal text-lg ${text}`}>
          {packageJson.version}
        </Text>
      </View>

      <View
        style={tw`justify-between flex-row items-center ${borderColor} px-4 py-2 my-2`}
      >
        <Text style={tw`font-medium text-lg ${text}`}>Theme (light/dark)</Text>
        <Switch
          onValueChange={async (value) => await dispatch(toggleTheme(value))}
          value={darkMode}
        />
      </View>

      <View
        style={[
          tw`justify-center ${borderColor}`,
          { borderTopWidth: 2, borderBottomWidth: 2 },
        ]}
      >
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg ${text}`}>
          {t("utils.selectLanguage")}
        </Text>
        <Languages i18n={i18n} />
      </View>

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
            Boolean(dataNotifications.expoPushToken),
            handleSwitchChange,
            "expoPushToken",
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default Settings

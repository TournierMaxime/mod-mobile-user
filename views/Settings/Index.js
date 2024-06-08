import React from "react"
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Utils from "@mod/mobile-common/lib/class/Utils"
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import packageJson from "../../../../../package.json"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const Settings = ({ route }) => {
  const { t } = useTranslation()
  const { userId } = route.params

  const { fontSize } = useResponsive()

  const navigation = useNavigation()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor, colorIcon } =
    useDynamicThemeStyles(darkMode)

  return (
    <ScrollView style={tw`${background} h-full`}>
      <TouchableOpacity onPress={() => navigation.navigate("Theme")}>
        <View
          style={[
            tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
            { borderBottomWidth: 2, borderTopWidth: 2 },
          ]}
        >
          <View style={tw`flex flex-row items-center`}>
            <MaterialCommunityIcons
              style={tw`mr-3`}
              name="theme-light-dark"
              size={Utils.moderateScale(28)}
              color={colorIcon}
            />
            <Text style={fontSize(text)}>Theme</Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Languages")}>
        <View
          style={[
            tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
            { borderBottomWidth: 2 },
          ]}
        >
          <View style={tw`flex flex-row items-center`}>
            <MaterialIcons
              style={tw`mr-3`}
              name="translate"
              size={Utils.moderateScale(28)}
              color={colorIcon}
            />
            <Text style={fontSize(text)}>{t("utils.languages")}</Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Notifications", { userId })}
      >
        <View
          style={[
            tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
            { borderBottomWidth: 2 },
          ]}
        >
          <View style={tw`flex flex-row items-center`}>
            <Ionicons
              style={tw`mr-3`}
              name="notifications-outline"
              size={Utils.moderateScale(28)}
              color={colorIcon}
            />
            <Text style={fontSize(text)}>{t("utils.notifications")}</Text>
          </View>
          <Entypo
            name="chevron-small-right"
            size={Utils.moderateScale(25)}
            color={colorIcon}
          />
        </View>
      </TouchableOpacity>
      <View style={tw`items-center my-4`}>
        {Platform.OS === "android" ? (
          <Text style={tw`font-normal text-sm ${text}`}>
            {t("utils.version")} {packageJson.android.version} (
            {packageJson.android.build})
          </Text>
        ) : (
          <Text style={tw`font-normal text-sm ${text}`}>
            {t("utils.version")} {packageJson.ios.version} (
            {packageJson.ios.build})
          </Text>
        )}
      </View>
    </ScrollView>
  )
}

export default Settings

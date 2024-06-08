import React from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons"
import { useTranslation } from "react-i18next"
import Utils from "@mod/mobile-common/lib/class/Utils"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const UpdateData = ({ route }) => {
  const { userId } = route.params
  const navigation = useNavigation()

  const { fontSize } = useResponsive()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const localStorageData = useSelector((state) => state.auth.data)

  const { background, colorIcon, text, borderColor } =
    useDynamicThemeStyles(darkMode)

  const { t } = useTranslation()

  return (
    <View style={tw`${background} flex-1 items-center justify-between`}>
      <View style={tw`flex w-full`}>
        <ScrollView contentContainerStyle={tw`h-full`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("UpdateUserName", { userId })}
          >
            <View
              style={[
                tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                { borderTopWidth: 2, borderBottomWidth: 2 },
              ]}
            >
              <View style={tw`flex flex-row items-center`}>
                <FontAwesome5
                  style={tw`mr-4`}
                  name="user"
                  size={Utils.moderateScale(25)}
                  color={colorIcon}
                />
                <Text style={fontSize(text)}>{t("utils.userName")}</Text>
              </View>
              <Entypo
                name="chevron-small-right"
                size={Utils.moderateScale(25)}
                color={colorIcon}
              />
            </View>
          </TouchableOpacity>

          {localStorageData?.user?.provider === "Google" ||
          localStorageData?.user?.provider === "Apple" ? null : (
            <TouchableOpacity
              onPress={() => navigation.navigate("UpdateEmail", { userId })}
            >
              <View
                style={[
                  tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                  { borderBottomWidth: 2 },
                ]}
              >
                <View style={tw`flex flex-row items-center`}>
                  <MaterialCommunityIcons
                    style={tw`mr-3`}
                    name="email-outline"
                    size={Utils.moderateScale(28)}
                    color={colorIcon}
                  />
                  <Text style={fontSize(text)}>{t("utils.email")}</Text>
                </View>
                <Entypo
                  name="chevron-small-right"
                  size={Utils.moderateScale(25)}
                  color={colorIcon}
                />
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("UpdateAvatar", { userId })}
          >
            <View
              style={[
                tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                { borderBottomWidth: 2 },
              ]}
            >
              <View style={tw`flex flex-row items-center`}>
                <Entypo
                  style={tw`mr-3`}
                  name="image"
                  size={Utils.moderateScale(28)}
                  color={colorIcon}
                />
                <Text style={fontSize(text)}>{t("utils.avatar")}</Text>
              </View>
              <Entypo
                name="chevron-small-right"
                size={Utils.moderateScale(25)}
                color={colorIcon}
              />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

export default UpdateData

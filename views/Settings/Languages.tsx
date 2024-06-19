import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Lang from "@mod/mobile-tmdb/lib/components/Languages"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { RootState } from "store"
import { NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "navigators/MainStackNavigator"

interface LanguagesProps {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "Languages">
  route: any
}

const Languages: React.FC<LanguagesProps> = () => {
  const { i18n, t } = useTranslation()

  const { fontSize } = useResponsive()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <View style={tw`${background} h-full`}>
      <View
        style={[
          tw`justify-center ${borderColor}`,
          { borderTopWidth: 2, borderBottomWidth: 2 },
        ]}
      >
        <Text
          style={[
            fontSize(text),
            {
              marginTop: Utils.moderateScale(15),
              paddingHorizontal: Utils.moderateScale(15),
            },
          ]}
        >
          {t("utils.selectLanguage")}
        </Text>
        <Lang i18n={i18n} />
      </View>
    </View>
  )
}

export default Languages

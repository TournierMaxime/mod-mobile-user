import React from "react"
import { View, Text } from "react-native"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Lang from "@mod/mobile-tmdb/lib/components/Languages"

const Languages = () => {
  const { i18n, t } = useTranslation()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  return (
    <View style={tw`${background} h-full`}>
      <View
        style={[
          tw`justify-center ${borderColor}`,
          { borderTopWidth: 2, borderBottomWidth: 2 },
        ]}
      >
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg ${text}`}>
          {t("utils.selectLanguage")}
        </Text>
        <Lang i18n={i18n} />
      </View>
    </View>
  )
}

export default Languages

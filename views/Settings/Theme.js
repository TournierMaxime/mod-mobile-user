import React from "react"
import { View, Text, Switch } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { toggleTheme } from "@mod/mobile-common/redux/actions/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const Theme = () => {
  const dispatch = useDispatch()
  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  const { fontSize } = useResponsive()

  return (
    <View style={tw`${background} h-full`}>
      <View
        style={tw`justify-between flex-row items-center ${borderColor} px-4 py-2 my-2`}
      >
        <Text style={fontSize(text)}>Theme (light/dark)</Text>
        <Switch
          onValueChange={async (value) => await dispatch(toggleTheme(value))}
          value={darkMode}
        />
      </View>
    </View>
  )
}

export default Theme

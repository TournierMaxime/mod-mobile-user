import React from 'react'
import { ScrollView, Text, View, Switch } from 'react-native'
import Languages from '@mod/mobile-tmdb/lib/components/Languages'
import { useTranslation } from 'react-i18next'
import packageJson from '../../../../../package.json'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '@mod/mobile-common/redux/actions/theme'
import { useDynamicThemeStyles } from '@mod/mobile-common/styles/theme'

const Settings = () => {
  const dispatch = useDispatch()
  const { i18n, t } = useTranslation()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  return (
    <ScrollView style={tw`${background} h-full`}>
      <View style={tw`justify-center border-slate-100 mb-2`}>
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg ${text}`}>
          Theme (light/dark)
        </Text>
        <Switch
          onValueChange={async (value) => await dispatch(toggleTheme(value))}
          value={darkMode}
        />
      </View>

      <View
        style={[
          tw`justify-center border-slate-100`,
          { borderTopWidth: 2, borderBottomWidth: 2 },
        ]}
      >
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg ${text}`}>
          {t('utils.selectLanguage')}
        </Text>
        <Languages i18n={i18n} />
      </View>

      <View
        style={[tw`justify-center border-slate-100`, { borderBottomWidth: 2 }]}
      >
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg ${text}`}>
          {t('utils.versionNumber')}
        </Text>
        <Text style={tw`my-2 mx-4 font-normal text-lg ${text}`}>
          {packageJson.version}
        </Text>
      </View>
    </ScrollView>
  )
}

export default Settings

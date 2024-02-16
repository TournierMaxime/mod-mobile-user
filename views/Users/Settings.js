import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Languages from '@mod/mobile-tmdb/lib/components/Languages'
import { useTranslation } from 'react-i18next'
import packageJson from '../../../package.json'
import tw from 'twrnc'

const Settings = () => {
  const { i18n, t } = useTranslation()
  return (
    <ScrollView style={tw`bg-white h-full`}>
      <View style={[tw`justify-center border-slate-100`, { borderTopWidth: 2, borderBottomWidth: 2 }]}>
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg`}>
          {t('utils.selectLanguage')}
        </Text>
        <Languages i18n={i18n} />
      </View>

      <View style={[tw`justify-center border-slate-100`, { borderBottomWidth: 2 }]}>
        <Text style={tw`mt-2 px-4 py-2 font-medium text-lg`}>
          {t('utils.versionNumber')}
        </Text>
        <Text style={tw`my-2 mx-4 font-normal text-lg`}>{packageJson.version}</Text>
      </View>
    </ScrollView>
  )
}

export default Settings

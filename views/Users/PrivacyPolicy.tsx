import { useTranslation } from "react-i18next"
import { ScrollView, View, Text } from "react-native"
import tw from "twrnc"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "store"
import { NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "navigators/MainStackNavigator"

interface PrivacyPolicyProps {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "PrivacyPolicy">
  route: any
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
  const { t } = useTranslation()

  const {
    privacyPolicyTitle,
    privacyPolicySubTitle,
    privacyPolicyParagraph,
    privacyPolicyUpdate,
    privacyPolicyList,
  } = useResponsive()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  const personalInformationList: { li: string }[] = t(
    "privacy.ulPersonalInformation",
    {
      returnObjects: true,
    },
  ) as { li: string }[]
  const formsAndInteractivityList: { li: string }[] = t(
    "privacy.ul1Forms&Interactivity",
    {
      returnObjects: true,
    },
  ) as { li: string }[]
  const formsAndInteractivitySecondList: { li: string }[] = t(
    "privacy.ul2Forms&Interactivity",
    {
      returnObjects: true,
    },
  ) as { li: string }[]
  const rightOfOppositionList: { li: string }[] = t(
    "privacy.ulRightOfOpposition",
    {
      returnObjects: true,
    },
  ) as { li: string }[]
  const permissionToAccessList: { li: string }[] = t(
    "privacy.ulPermissionToAccess",
    {
      returnObjects: true,
    },
  ) as { li: string }[]
  const securityList: { li: string }[] = t("privacy.ulSecurity", {
    returnObjects: true,
  }) as { li: string }[]
  const legislationList: { li: string }[] = t("privacy.ulLegislation", {
    returnObjects: true,
  }) as { li: string }[]

  return (
    <ScrollView style={tw`${background} h-full`}>
      <View style={tw`flex flex-col p-4`}>
        <Text style={privacyPolicyTitle(text)}>
          {t("privacy.h1PrivacyPolicy")}
        </Text>
        <Text style={privacyPolicySubTitle(text)}>
          {t("privacy.h2Introduction")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.pIntroduction")}
        </Text>
        <Text style={privacyPolicySubTitle(text)}>
          {t("privacy.h3PersonalInformation")}
        </Text>
        <View style={tw`mb-4`}>
          {personalInformationList.map((item, index) => (
            <Text key={index} style={privacyPolicyList(text)}>
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.pPersonalInformation")}
        </Text>
        <Text style={privacyPolicySubTitle(text)}>
          {t("privacy.h3Forms&Interactivity")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p1Forms&Interactivity")}
        </Text>
        <View style={tw`mb-4`}>
          {formsAndInteractivityList.map((item, index) => (
            <Text key={index} style={privacyPolicyList(text)}>
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p2Forms&Interactivity")}
        </Text>
        <View style={tw`mb-4`}>
          {formsAndInteractivitySecondList.map((item, index) => (
            <Text key={index} style={privacyPolicyList(text)}>
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={privacyPolicySubTitle(text)}>
          {t("privacy.h3RightOfOpposition")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p1RightOfOpposition")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p2RightOfOpposition")}
        </Text>
        <View style={tw`mb-4`}>
          {rightOfOppositionList.map((item, index) => (
            <Text key={index} style={privacyPolicyList(text)}>
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={privacyPolicySubTitle(text)}>
          {t("privacy.h3PermissionToAccess")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p1PermissionToAccess")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p2PermissionToAccess")}
        </Text>
        <View style={tw`mb-4`}>
          {permissionToAccessList.map((item, index) => (
            <Text key={index} style={privacyPolicyList(text)}>
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={privacyPolicySubTitle(text)}>
          {t("privacy.h3Security")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p1Security")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p2Security")}
        </Text>
        <View style={tw`mb-4`}>
          {securityList.map((item, index) => (
            <Text key={index} style={privacyPolicyList(text)}>
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.p3Security")}
        </Text>
        <Text style={privacyPolicySubTitle(text)}>
          {t("privacy.h3Legislation")}
        </Text>
        <Text style={privacyPolicyParagraph(text)}>
          {t("privacy.pLegislation")}
        </Text>
        <View style={tw`mb-4`}>
          {legislationList.map((item, index) => (
            <Text key={index} style={privacyPolicyList(text)}>
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={privacyPolicyUpdate(text)}>{t("privacy.update")}</Text>
      </View>
    </ScrollView>
  )
}

export default PrivacyPolicy

import { useTranslation } from "react-i18next"
import { ScrollView, View, Text } from "react-native"
import tw from "twrnc"
import { useSelector } from "react-redux"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

const PrivacyPolicy = () => {
  const { t } = useTranslation()

  const darkMode = useSelector((state) => state.theme.darkMode)
  const { background, text } = useDynamicThemeStyles(darkMode)

  const personalInformationList = t("privacy.ulPersonalInformation", {
    returnObjects: true,
  })
  const formsAndInteractivityList = t("privacy.ul1Forms&Interactivity", {
    returnObjects: true,
  })
  const formsAndInteractivitySecondList = t("privacy.ul2Forms&Interactivity", {
    returnObjects: true,
  })
  const rightOfOppositionList = t("privacy.ulRightOfOpposition", {
    returnObjects: true,
  })
  const permissionToAccessList = t("privacy.ulPermissionToAccess", {
    returnObjects: true,
  })
  const securityList = t("privacy.ulSecurity", {
    returnObjects: true,
  })
  const legislationList = t("privacy.ulLegislation", {
    returnObjects: true,
  })

  return (
    <ScrollView style={tw`${background} h-full`}>
      <View style={tw`flex flex-col p-2`}>
        <Text style={tw`font-medium text-2xl ${text} mb-4`}>
          {t("privacy.h1PrivacyPolicy")}
        </Text>
        <Text style={tw`font-medium text-xl ${text} mb-4`}>
          {t("privacy.h2Introduction")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.pIntroduction")}
        </Text>
        <Text style={tw`font-medium text-xl ${text} mb-4`}>
          {t("privacy.h3PersonalInformation")}
        </Text>
        <View style={tw`mb-4`}>
          {personalInformationList.map((item, index) => (
            <Text
              key={index}
              style={tw`font-normal text-lg ${text} my-px px-4`}
            >
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.pPersonalInformation")}
        </Text>
        <Text style={tw`font-medium text-xl ${text} mb-4`}>
          {t("privacy.h3Forms&Interactivity")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p1Forms&Interactivity")}
        </Text>
        <View style={tw`mb-4`}>
          {formsAndInteractivityList.map((item, index) => (
            <Text
              key={index}
              style={tw`font-normal text-lg ${text} my-px px-4`}
            >
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p2Forms&Interactivity")}
        </Text>
        <View style={tw`mb-4`}>
          {formsAndInteractivitySecondList.map((item, index) => (
            <Text
              key={index}
              style={tw`font-normal text-lg ${text} my-px px-4`}
            >
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={tw`font-medium text-xl ${text} mb-4`}>
          {t("privacy.h3RightOfOpposition")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p1RightOfOpposition")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p2RightOfOpposition")}
        </Text>
        <View style={tw`mb-4`}>
          {rightOfOppositionList.map((item, index) => (
            <Text
              key={index}
              style={tw`font-normal text-lg ${text} my-px px-4`}
            >
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={tw`font-medium text-xl ${text} mb-4`}>
          {t("privacy.h3PermissionToAccess")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p1PermissionToAccess")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p2PermissionToAccess")}
        </Text>
        <View style={tw`mb-4`}>
          {permissionToAccessList.map((item, index) => (
            <Text
              key={index}
              style={tw`font-normal text-lg ${text} my-px px-4`}
            >
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={tw`font-medium text-xl ${text} mb-4`}>
          {t("privacy.h3Security")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p1Security")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p2Security")}
        </Text>
        <View style={tw`mb-4`}>
          {securityList.map((item, index) => (
            <Text
              key={index}
              style={tw`font-normal text-lg ${text} my-px px-4`}
            >
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.p3Security")}
        </Text>
        <Text style={tw`font-medium text-xl ${text} mb-4`}>
          {t("privacy.h3Legislation")}
        </Text>
        <Text style={tw`font-normal text-lg text-justify ${text} mb-4`}>
          {t("privacy.pLegislation")}
        </Text>
        <View style={tw`mb-4`}>
          {legislationList.map((item, index) => (
            <Text
              key={index}
              style={tw`font-normal text-lg ${text} my-px px-4`}
            >
              {`\u2022 ${item.li}`}
            </Text>
          ))}
        </View>
        <Text style={tw`font-normal text-lg ${text} mb-4`}>
          {t("privacy.update")}
        </Text>
      </View>
    </ScrollView>
  )
}

export default PrivacyPolicy

import React, { Fragment, useState } from "react"
import { View, Text, TouchableOpacity, ScrollView } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser } from "../../redux/actions/users"
import { logoutUser } from "@mod/mobile-auth/redux/actions/auth"
import { useNavigation } from "@react-navigation/native"
import { checkAccess } from "@mod/mobile-common/lib/components/utils/CheckAccess"
import {
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons"
import AlertModal from "@mod/mobile-common/lib/components/utils/AlertModal"
import { useTranslation } from "react-i18next"
import Utils from "@mod/mobile-common/lib/class/Utils"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { toast } from "@mod/mobile-common/lib/toast"
import { NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "navigators/MainStackNavigator"
import { RootState, AppDispatch } from "store"
import { AuthStackParamList } from "modules/mod-mobile-auth/navigators/AuthStackNavigator"

interface Props {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "UserProfile">
  route: any
  //favorites: []
}

const UserProfile: React.FC<Props> = ({ route }) => {
  const { userId } = route.params

  const dispatch: AppDispatch = useDispatch()

  const navigation =
    useNavigation<NavigationProp<MainStackParamList & AuthStackParamList>>()

  const oneUser = useSelector((state: RootState) => state.oneUser.data)
  const currentUserId = useSelector(
    (state: RootState) => state.auth.data?.user?.userId,
  )
  const isLogged = useSelector((state: RootState) => state.auth.isAuthenticated)
  const user = useSelector((state: RootState) => state.auth.data?.user)
  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)

  const accessDenied = checkAccess(isLogged, currentUserId, userId)

  const { fontSize, deleteAccount } = useResponsive()

  const { background, colorIcon, text, borderColor } =
    useDynamicThemeStyles(darkMode)

  const { t } = useTranslation()

  const handleLogout = toast(async () => {
    try {
      await dispatch(logoutUser())
      navigation.navigate("AuthStackNavigator", {
        screen: "Login",
      })
    } catch (error: any) {
      throw new Error(error)
    }
    return {
      toastMessage: t("actions.logoutSuccessful"),
    }
  })

  const handleDelete = toast(async () => {
    try {
      setDeleteSuccess(true)
      await dispatch(deleteUser(userId)).then(() => {
        dispatch(logoutUser())
        navigation.navigate("AuthStackNavigator", {
          screen: "Login",
        })
      })
    } catch (error: any) {
      throw new Error(error)
    }
    return {
      toastMessage: t("actions.yourAccountHasBeenSuccessfullyDeleted"),
    }
  })

  const handleDeleteModal = () => {
    setDeleteModalVisible(!deleteModalVisible)
  }

  return (
    <View style={tw`${background} flex-1 items-center justify-between`}>
      {accessDenied ? (
        accessDenied
      ) : (
        <Fragment>
          {oneUser && (
            <View style={tw`flex w-full`}>
              <ScrollView contentContainerStyle={tw`h-full`}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateData", { userId })}
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
                      <Text style={fontSize(text)}>{user?.pseudo}</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={Utils.moderateScale(25)}
                      color={colorIcon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Favorites", { userId })}
                >
                  <View
                    style={[
                      tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                      { borderBottomWidth: 2 },
                    ]}
                  >
                    <View style={tw`flex flex-row items-center`}>
                      <MaterialIcons
                        style={tw`mr-4`}
                        name="favorite-outline"
                        size={Utils.moderateScale(25)}
                        color={colorIcon}
                      />
                      <Text style={fontSize(text)}>{t("utils.favorites")}</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={Utils.moderateScale(25)}
                      color={colorIcon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("Settings", { userId })}
                >
                  <View
                    style={[
                      tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                      { borderBottomWidth: 2 },
                    ]}
                  >
                    <View style={tw`flex flex-row items-center`}>
                      <Feather
                        style={tw`mr-4`}
                        name="settings"
                        size={Utils.moderateScale(25)}
                        color={colorIcon}
                      />
                      <Text style={fontSize(text)}>{t("utils.settings")}</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={Utils.moderateScale(25)}
                      color={colorIcon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate("PrivacyPolicy")}
                >
                  <View
                    style={[
                      tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                      { borderBottomWidth: 2 },
                    ]}
                  >
                    <View style={tw`flex flex-row items-center`}>
                      <MaterialIcons
                        style={tw`mr-4`}
                        name="security"
                        size={Utils.moderateScale(25)}
                        color={colorIcon}
                      />
                      <Text style={fontSize(text)}>
                        {t("utils.privacyPolicy")}
                      </Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={Utils.moderateScale(25)}
                      color={colorIcon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleLogout()}>
                  <View
                    style={[
                      tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                      { borderBottomWidth: 2 },
                    ]}
                  >
                    <View style={tw`flex flex-row items-center`}>
                      <MaterialIcons
                        style={tw`mr-4`}
                        name="logout"
                        size={Utils.moderateScale(25)}
                        color={colorIcon}
                      />
                      <Text style={fontSize(text)}>{t("utils.logout")}</Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={Utils.moderateScale(25)}
                      color={colorIcon}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteModal()}>
                  <View
                    style={[
                      tw`${background} w-full p-4 flex flex-row items-center justify-between ${borderColor}`,
                      { borderBottomWidth: 2 },
                    ]}
                  >
                    <View style={tw`flex flex-row items-center`}>
                      <MaterialIcons
                        style={tw`mr-4`}
                        name="delete-outline"
                        size={Utils.moderateScale(25)}
                        color={colorIcon}
                      />
                      <Text style={deleteAccount(text)}>
                        {t("utils.deleteAccount")}
                      </Text>
                    </View>
                    <Entypo
                      name="chevron-small-right"
                      size={Utils.moderateScale(25)}
                      color={colorIcon}
                    />
                  </View>
                </TouchableOpacity>
                <AlertModal
                  message={t("actions.deleteAccountConfirmMsg")}
                  action={handleDelete}
                  visible={deleteModalVisible}
                  setVisible={setDeleteModalVisible}
                  success={deleteSuccess}
                  t={t}
                />
              </ScrollView>
            </View>
          )}
        </Fragment>
      )}
    </View>
  )
}

export default UserProfile

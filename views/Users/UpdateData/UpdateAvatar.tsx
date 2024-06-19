import React, { useState } from "react"
import { View } from "react-native"
import { updateUser } from "../../../redux/actions/users"
import { setUserWithLocalStorage } from "@mod/mobile-auth/redux/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import AsyncStorage from "@react-native-async-storage/async-storage"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Form from "@mod/mobile-common/lib/class/Form"
import * as ImagePicker from "expo-image-picker"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { toast } from "@mod/mobile-common/lib/toast"
import { RootState, AppDispatch } from "store"
import { MainStackParamList } from "navigators/MainStackNavigator"
import { NavigationProp } from "@react-navigation/native"

interface Props {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "UpdateAvatar">
  route: any
}

const UpdateAvatar: React.FC<Props> = ({ route }) => {
  const { userId } = route.params

  const dispatch: AppDispatch = useDispatch()

  const localStorageData = useSelector((state: RootState) => state.auth.data)

  const { widthAspectRatio } = useResponsive()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const { background } = useDynamicThemeStyles(darkMode)

  const { t } = useTranslation()

  const [data, setData] = useState({
    image: localStorageData.user?.image || "",
  })

  const pickImage = toast(async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      throw new Error(t("actions.permissionToAccessCameraRollIsRequired"))
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setData({
        ...data,
        image: result.assets[0].uri,
      })
    }
    return {
      toastMessage: "Image selected",
    }
  })

  const handleUpdate = toast(async () => {
    const formData = new FormData()

    const imageUriParts = data.image.split(".")
    const fileType = imageUriParts[imageUriParts.length - 1]

    let file = {
      uri: data.image,
      name: `image.${fileType}`,
      type: `image/${fileType}`,
    }

    if (file) {
      formData.append("image", {
        uri: file.uri,
        name: file.name,
        type: file.type,
      })
    }

    const updatedUserData = {
      ...localStorageData,
      user: {
        ...localStorageData.user,
        image: data?.image,
      },
    }

    try {
      await dispatch(updateUser(formData, userId)).then(async () => {
        await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData))
        await dispatch(setUserWithLocalStorage(updatedUserData))
      })
    } catch (error: any) {
      if (error.response.data.errMsg) {
        throw new Error(error.response.data.errMsg)
      } else {
        throw new Error(t("errors.anErrorHasOccurred"))
      }
    }
    return {
      toastMessage: t("actions.profileUpdated"),
    }
  })

  return (
    <View style={tw`items-center`}>
      <View style={widthAspectRatio()}>
        <View style={tw`${background} p-4 h-full`}>
          {Form.uploadFile(data?.image, pickImage, t)}
          {Form.submit(t("utils.update"), handleUpdate, false)}
        </View>
      </View>
    </View>
  )
}

export default UpdateAvatar

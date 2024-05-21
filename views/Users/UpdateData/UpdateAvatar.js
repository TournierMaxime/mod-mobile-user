import React, { useState } from "react"
import { View } from "react-native"
import { updateUser } from "../../../redux/actions/users"
import { setUserWithLocalStorage } from "@mod/mobile-auth/redux/actions/auth"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { AlertMessage } from "@mod/mobile-common/lib/components/utils/AlertMessage"
import AsyncStorage from "@react-native-async-storage/async-storage"
import tw from "twrnc"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import Form from "@mod/mobile-common/lib/class/Form"
import * as ImagePicker from "expo-image-picker"

const UpdateAvatar = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const localStorageData = useSelector((state) => state.auth.data)
  console.log("localStorageData", localStorageData)

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { background } = useDynamicThemeStyles(darkMode)

  const { t } = useTranslation()

  const [data, setData] = useState({
    image: localStorageData.user?.image || "",
  })

  const pickImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert(t("actions.permissionToAccessCameraRollIsRequired"))
      return
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
  }

  const handleUpdate = async () => {
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
      await dispatch(updateUser(formData, userId))
      await AsyncStorage.setItem("userData", JSON.stringify(updatedUserData))
      await dispatch(setUserWithLocalStorage(updatedUserData))
      AlertMessage(t("actions.profileUpdated"))
    } catch (error) {
      console.log(error.response.data.errMsg)

      if (error.response.data.errMsg) {
        AlertMessage(error.response.data.errMsg)
      } else {
        AlertMessage(t("errors.anErrorHasOccurred"))
      }
    }
  }

  return (
    <View style={tw`${background} p-4 h-full`}>
      {Form.uploadFile(data?.image, pickImage, t)}
      {Form.submit(t("utils.update"), handleUpdate)}
    </View>
  )
}

export default UpdateAvatar
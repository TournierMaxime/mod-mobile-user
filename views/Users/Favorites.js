import React, { memo } from "react"
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import tw from "twrnc"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import useHandleFavorites from "@mod/mobile-common/lib/hooks/utils/useHandleFavorites"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useTranslation } from "react-i18next"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"

const Favorites = () => {
  const { t } = useTranslation()

  const favorites = useSelector((state) => state.favorites.data)
  const navigation = useNavigation()

  const { fontSize, imagePosterFavorite } = useResponsive()

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  const { removeFromFavorite } = useHandleFavorites({ favorites })

  const renderItem = (item, idx) => {
    const { id, name, image } = item

    const renderType = (type) => {
      switch (type) {
        case "serie": {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailsSerie", { id })}
              style={tw`w-1/3 items-start`}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${image}` }}
                style={imagePosterFavorite()}
              />
            </TouchableOpacity>
          )
        }
        case "people": {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailsPeople", { id })}
              style={tw`w-1/3 items-start`}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${image}` }}
                style={imagePosterFavorite()}
              />
            </TouchableOpacity>
          )
        }
        default:
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("DetailsMovie", { id })}
              style={tw`w-1/3 items-start`}
            >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/original${image}` }}
                style={imagePosterFavorite()}
              />
            </TouchableOpacity>
          )
      }
    }
    return (
      <View
        key={idx}
        style={tw`flex flex-row justify-between items-center ${background} p-2 mt-px border-b-2 ${borderColor}`}
      >
        {renderType(item.type)}

        <View style={tw`w-1/3 items-center`}>
          <Text style={fontSize(text)}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeFromFavorite(id)}
          style={tw`w-1/3 items-end`}
        >
          <MaterialIcons
            name="delete"
            size={Utils.moderateScale(40)}
            color={"red"}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <FlatList
      style={tw`${background}`}
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item, idx }) => renderItem(item, idx)}
      ListEmptyComponent={
        favorites && favorites.length === 0 ? (
          <View style={tw`items-center mt-4`}>
            <Text style={fontSize(text)}>{t("utils.noFavorite")}</Text>
          </View>
        ) : null
      }
    />
  )
}

export default memo(Favorites)

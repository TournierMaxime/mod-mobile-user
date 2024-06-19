import React, { memo } from "react"
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import tw from "twrnc"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation, NavigationProp } from "@react-navigation/native"
import useHandleFavorites from "@mod/mobile-common/lib/hooks/utils/useHandleFavorites"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import { useTranslation } from "react-i18next"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import { RootState } from "store"
import { MainStackParamList } from "navigators/MainStackNavigator"
import { MovieStackParamList } from "navigators/MovieStackNavigator"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface Props {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "Favorites">
  route: any
  favorites: FavoriteData
}

interface Item {
  id: number
  name: string
  image: string
  type: string
}

interface FavoriteData {
  id: number
  name: string
  image: string
  type: string
  recommendationId: string
}

const Favorites: React.FC<Props> = () => {
  const { t } = useTranslation()

  const favorites = useSelector(
    (state: RootState) => state.favorites.data,
  ).filter(Boolean)
  const navigation =
    useNavigation<
      NavigationProp<
        MainStackParamList & MovieStackParamList & SerieStackParamList
      >
    >()

  const { fontSize, imagePosterFavorite } = useResponsive()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const { background, text, borderColor } = useDynamicThemeStyles(darkMode)

  const { removeFromFavorite } = useHandleFavorites({
    favorites,
  })

  const renderItem = (item: Item, index: number) => {
    const { id, name, image } = item

    const renderType = (type: string) => {
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
        key={index}
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
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => renderItem(item, index)}
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

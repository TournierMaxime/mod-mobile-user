import React, { memo } from "react"
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import tw from "twrnc"
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import useHandleFavorites from "@mod/mobile-common/lib/hooks/utils/useHandleFavorites"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites.data)
  const navigation = useNavigation()

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { background, text, colorIcon, borderColor } =
    useDynamicThemeStyles(darkMode)

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
                style={[tw`w-15 m-2 h-25 rounded-md`, { objectFit: "cover" }]}
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
                style={[tw`w-15 m-2 h-25 rounded-md`, { objectFit: "cover" }]}
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
                style={[tw`w-15 m-2 h-25 rounded-md`, { objectFit: "cover" }]}
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
          <Text style={tw`font-medium text-xl ${text}`}>{name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => removeFromFavorite(id)}
          style={tw`w-1/3 items-end`}
        >
          <MaterialIcons
            name="delete"
            size={Utils.moderateScale(40)}
            color={colorIcon}
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
    />
  )
}

export default memo(Favorites)

import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecommendation } from "@mod/mobile-user/redux/actions/recommendations"
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import Message from "@mod/mobile-common/lib/components/utils/Message"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"

const Recommendations = ({ route }) => {
  const { userId, recommendationId } = route.params

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { t } = useTranslation()

  const darkMode = useSelector((state) => state.theme.darkMode)

  const { background, text } = useDynamicThemeStyles(darkMode)

  const oneRecommendation = useSelector(
    (state) => state.oneRecommendation.data.recommendation,
  )

  const handleNavigation = (data) => {
    if (data.media_type === "movie") {
      navigation.navigate("DetailsMovie", {
        id: data.id,
      })
    } else if (data.media_type === "tv") {
      navigation.navigate("DetailsSerie", {
        id: data.id,
      })
    }
  }

  const noDataObject = () => {
    if (!oneRecommendation?.data?.data) {
      return <Message priority={"info"} message={"No data were found"} />
    }
  }

  const renderItem = (item, idx) => {
    const { poster_path, media_type } = item
    return (
      <TouchableOpacity onPress={() => handleNavigation(item)} key={idx}>
        <View>
          {media_type === "movie" ? (
            <Fragment>
              <Image
                style={[tw`w-40 h-60 rounded-md m-4`, { resizeMode: "cover" }]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${poster_path}`,
                }}
              />
            </Fragment>
          ) : media_type === "tv" ? (
            <Fragment>
              <Image
                style={[tw`w-40 h-60 rounded-md m-4`, { resizeMode: "cover" }]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${poster_path}`,
                }}
              />
            </Fragment>
          ) : null}
        </View>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    dispatch(getRecommendation(recommendationId, userId))
  }, [dispatch, recommendationId, userId])

  return (
    <View style={tw`flex-1 items-center justify-between ${background}`}>
      <FlatList
        style={tw`${background}`}
        keyExtractor={(item) => item.id}
        data={oneRecommendation?.data}
        renderItem={({ item, idx }) => renderItem(item, idx)}
        numColumns={2}
        ListEmptyComponent={noDataObject()}
        ListHeaderComponent={
          <Text style={tw`font-medium text-xl text-center mt-4 ${text}`}>
            {t("utils.becauseYouLiked")} {oneRecommendation?.name}
          </Text>
        }
      />
    </View>
  )
}

export default Recommendations

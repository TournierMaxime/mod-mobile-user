import React, { Fragment, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecommendation } from "@mod/mobile-user/redux/actions/recommendations"
import { FlatList, View, Text, Image, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import Message from "@mod/mobile-common/lib/components/utils/Message"
import { useDynamicThemeStyles } from "@mod/mobile-common/styles/theme"
import useResponsive from "@mod/mobile-common/lib/hooks/utils/useResponsive"
import Utils from "@mod/mobile-common/lib/class/Utils"
import { RootState, AppDispatch } from "store"
import { NavigationProp } from "@react-navigation/native"
import { MainStackParamList } from "navigators/MainStackNavigator"
import { MovieStackParamList } from "navigators/MovieStackNavigator"
import { SerieStackParamList } from "navigators/SerieStackNavigator"

interface Props {
  i18n: any
  t: any
  navigation: NavigationProp<MainStackParamList, "Recommendations">
  route: any
  //favorites: []
}

interface Item {
  poster_path: string
  media_type: string
}

const Recommendations: React.FC<Props> = ({ route }) => {
  const { userId, recommendationId } = route.params

  const { imagePoster, fontSize } = useResponsive()

  const dispatch: AppDispatch = useDispatch()

  const navigation =
    useNavigation<NavigationProp<MovieStackParamList & SerieStackParamList>>()

  const { t } = useTranslation()

  const darkMode = useSelector((state: RootState) => state.theme.darkMode)

  const { background, text } = useDynamicThemeStyles(darkMode)

  const oneRecommendation = useSelector(
    (state: RootState) => state.oneRecommendation.data.recommendation,
  )

  const handleNavigation = (data: any) => {
    if (data.media_type === "movie") {
      navigation.navigate("MoviesTab", {
        screen: "DetailsMovie",
        params: { id: data.id },
      })
    } else if (data.media_type === "tv") {
      navigation.navigate("SeriesTab", {
        screen: "DetailsSerie",
        params: { id: data.id },
      })
    }
  }

  const noDataObject = () => {
    if (!oneRecommendation?.data?.data) {
      return <Message priority={"info"} message={"No data were found"} />
    }
  }

  const renderItem = (item: Item, index: number) => {
    const { poster_path, media_type } = item
    return (
      <TouchableOpacity onPress={() => handleNavigation(item)} key={index}>
        <View>
          {media_type === "movie" ? (
            <Fragment>
              <Image
                style={imagePoster()}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${poster_path}`,
                }}
              />
            </Fragment>
          ) : media_type === "tv" ? (
            <Fragment>
              <Image
                style={imagePoster()}
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
        renderItem={({ item, index }) => renderItem(item, index)}
        numColumns={2}
        ListEmptyComponent={noDataObject()}
        ListHeaderComponent={
          <Text
            style={[
              fontSize(text),
              { textAlign: "center", marginTop: Utils.moderateScale(15) },
            ]}
          >
            {t("utils.becauseYouLiked")} {oneRecommendation?.name}
          </Text>
        }
      />
    </View>
  )
}

export default Recommendations

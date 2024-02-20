import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendation } from '@mod/mobile-user/redux/actions/recommendations'
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Recommendations = ({ route }) => {
  const { recommendationId } = route.params

  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { t } = useTranslation()

  const oneRecommendation = useSelector(
    (state) => state.oneRecommendation.data.recommendation
  )

  const handleNavigation = (data) => {
    if (data.media_type === 'movie') {
      navigation.navigate('DetailsMovie', {
        id: data.id,
      })
    } else if (data.media_type === 'tv') {
      navigation.navigate('DetailsSerie', {
        id: data.id,
      })
    }
  }

  const renderItem = (item, idx) => {
    const { poster_path, media_type } = item
    return (
      <TouchableOpacity
        onPress={() => handleNavigation(item)}
        key={idx}
      >
        <View>
          {media_type === 'movie' ? (
            <Fragment>
              <Image
                style={[tw`w-40 h-60 rounded-md m-4`, { resizeMode: 'cover' }]}
                source={{
                  uri: `https://image.tmdb.org/t/p/original${poster_path}`,
                }}
              />
            </Fragment>
          ) : media_type === 'tv' ? (
            <Fragment>
              <Image
                style={[tw`w-40 h-60 rounded-md m-4`, { resizeMode: 'cover' }]}
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
    dispatch(getRecommendation(recommendationId))
  }, [dispatch, recommendationId])

  return (
    <View style={tw`items-center justify-between`}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={oneRecommendation?.data}
        renderItem={({ item, idx }) => renderItem(item, idx)}
        numColumns={2}
        ListHeaderComponent={
          <Text style={tw`font-medium text-xl text-center mt-4`}>
            {t('utils.becauseYouLiked')} {oneRecommendation?.name}
          </Text>
        }
      />
    </View>
  )
}

export default Recommendations

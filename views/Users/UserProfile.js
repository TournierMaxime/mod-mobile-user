import React, { Fragment, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../redux/actions/users'
import { logoutUser } from '@mod/mobile-auth/redux/actions/auth'
import { useNavigation } from '@react-navigation/native'
import { checkAccess } from '@mod/mobile-common/lib/components/utils/CheckAccess'
import {
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Feather
} from 'react-native-vector-icons'
import AlertModal from '@mod/mobile-common/lib/components/utils/AlertModal'
import { useTranslation } from 'react-i18next'
import Utils from '@mod/mobile-common/lib/class/Utils'
import { AlertMessage } from '@mod/mobile-common/lib/components/utils/AlertMessage'
import tw from 'twrnc'

const UserProfile = ({ route }) => {
  const { userId } = route.params
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const oneUser = useSelector((state) => state.oneUser.data)
  const currentUserId = useSelector((state) => state.auth.data.user.userId)
  const isLogged = useSelector((state) => state.auth.isAuthenticated)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const accessDenied = checkAccess(isLogged, currentUserId, userId)
  const user = useSelector((state) => state.auth.data.user)

  const { t } = useTranslation()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigation.navigate('Home')
  }

  const handleDelete = () => {
    try {
      dispatch(deleteUser(userId))
      setDeleteSuccess(true)
      AlertMessage(t('actions.yourAccountHasBeenSuccessfullyDeleted'))

      setTimeout(async () => {
        await dispatch(logoutUser())
        navigation.navigate('Home')
      }, 3000)
    } catch (error) {
      console.log(error.response.data.errMsg)
      AlertMessage(error.response.data.errMsg)
    }
  }

  const handleDeleteModal = () => {
    setDeleteModalVisible(!deleteModalVisible)
  }

  return (
    <View style={tw`bg-white flex-1 items-center justify-between`}>
      {accessDenied ? (
        accessDenied
      ) : (
        <Fragment>
          {oneUser && (
            <View style={tw`flex w-full`}>
              <ScrollView contentContainerStyle={tw`h-full`}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('DetailsUser', { userId })}
                >
                  <View style={[tw`bg-white w-full p-4 flex flex-row items-center justify-between border-slate-100`, { borderTopWidth: 2, borderBottomWidth: 2 }]}>
                    <View style={tw`flex flex-row items-center`}>
                      <FontAwesome5
                        style={tw`mr-4`}
                        name='user'
                        size={Utils.moderateScale(25)}
                        color='black'
                      />
                      <Text style={tw`font-medium text-lg`}>{user?.pseudo}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={Utils.moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>
                  
                <TouchableOpacity
                  onPress={() => navigation.navigate('Favorites', { userId })}
                >
                  <View style={[tw`bg-white w-full p-4 flex flex-row items-center justify-between border-slate-100`, { borderBottomWidth: 2 }]}>
                    <View style={tw`flex flex-row items-center`}>
                      <MaterialIcons
                        style={tw`mr-4`}
                        name='favorite-outline'
                        size={Utils.moderateScale(25)}
                        color='black'
                      />
                      <Text style={tw`font-medium text-lg`}>{t('utils.favorites')}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={Utils.moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings', { userId })}
                >
                  <View style={[tw`bg-white w-full p-4 flex flex-row items-center justify-between border-slate-100`, { borderBottomWidth: 2 }]}>
                    <View style={tw`flex flex-row items-center`}>
                      <Feather
                        style={tw`mr-4`}
                        name='settings'
                        size={Utils.moderateScale(25)}
                        color='black'
                      />
                      <Text style={tw`font-medium text-lg`}>{t('utils.settings')}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={Utils.moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleLogout()}>
                  <View style={[tw`bg-white w-full p-4 flex flex-row items-center justify-between border-slate-100`, { borderBottomWidth: 2 }]}>
                    <View style={tw`flex flex-row items-center`}>
                      <MaterialIcons
                        style={tw`mr-4`}
                        name='logout'
                        size={Utils.moderateScale(25)}
                        color='black'
                      />
                      <Text style={tw`font-medium text-lg`}>{t('utils.logout')}</Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={Utils.moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleDeleteModal()}>
                  <View style={[tw`bg-white w-full p-4 flex flex-row items-center justify-between border-slate-100`, { borderBottomWidth: 2 }]}>
                    <View style={tw`flex flex-row items-center`}>
                      <MaterialIcons
                        style={tw`mr-4`}
                        name='delete-outline'
                        size={Utils.moderateScale(25)}
                        color='black'
                      />
                      <Text style={[tw`font-medium text-lg`, { color: 'red' }]}>
                        {t('utils.deleteAccount')}
                      </Text>
                    </View>
                    <Entypo
                      name='chevron-small-right'
                      size={Utils.moderateScale(25)}
                      color='black'
                    />
                  </View>
                </TouchableOpacity>
                <AlertModal
                  message={t('actions.deleteAccountConfirmMsg')}
                  action={handleDelete}
                  visible={deleteModalVisible}
                  setVisible={setDeleteModalVisible}
                  success={deleteSuccess}
                  t={t}
                ></AlertModal>
              </ScrollView>
            </View>
          )}
        </Fragment>
      )}
    </View>
  )
}

export default UserProfile

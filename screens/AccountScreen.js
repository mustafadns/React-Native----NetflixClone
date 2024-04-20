import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { firebase } from '../config';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../store/auth-context';

export default function AccountScreen({ route }) {
  const { selectedUser } = route.params;
  const navigation = useNavigation();

  const authContext = useContext(AuthContext);

  // Modalın açık veya kapalı olduğunun bilgisini tutan state
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Modalın görünürlüğünü tersine çevirmek için yazılmış bir fonksiyon
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsModalVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  const [listPlay, setListPlay] = useState([]);
  const netflixListPlay = firebase.firestore().collection('myList');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixListPlay.where('notificationsImageUrl', '!=', null).get();
        const listPlay = querySnapshot.docs.map(doc => {
          const { id, listPlayName, listPlayImage, listPlayLike, listPlayList, season, notificationsImageUrl } = doc.data();
          return {
            id: doc.id,
            id,
            listPlayName,
            listPlayImage,
            listPlayLike,
            listPlayList,
            season,
            notificationsImageUrl,
          };
        });
        setListPlay(listPlay);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [listPlayData, setListPlayData] = useState([]);
  const netflixListPlayData = firebase.firestore().collection('myList');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixListPlayData.get();
        const listPlayData = querySnapshot.docs.map(doc => {
          const { id, listPlayName, listPlayImage, listPlayLike, listPlayList, season } = doc.data();
          return {
            id: doc.id,
            id,
            listPlayName,
            listPlayImage,
            listPlayLike,
            listPlayList,
            season,
          };
        });
        setListPlayData(listPlayData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [movies, setMovies] = useState([]);
  const netflixMovies = firebase.firestore().collection('movies').doc('action').collection('moviesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixMovies.get();
        const movies = querySnapshot.docs.map(doc => {
          const { id, movieName, movieImageUrl, movieLike, movieList } = doc.data();
          return {
            id: doc.id,
            id,
            movieName,
            movieImageUrl,
            movieLike,
            movieList,
          };
        });
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Benim Netflix'im</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <MaterialIcons name="cast-connected" size={26} color="white" style={{ marginRight: 10, marginLeft: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="search" size={26} color="white" style={{ marginRight: 10, marginLeft: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleModal}
          >
            <FontAwesome6 name="list-ul" size={26} color="white" style={{ marginRight: 10, marginLeft: 10 }} />
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={toggleModal}
          >
            <TouchableWithoutFeedback>
              <TouchableOpacity
                style={{ position: 'relative' }}
                onPress={toggleModal}
              >
                <View style={styles.modalMain}>
                  <View>
                    <TouchableOpacity style={styles.accountTotal}>
                      <View style={{flexDirection: 'row'}}>
                        <View style={styles.accountTotalIcons}>
                          <FontAwesome6 name="pencil" size={24} color="white" />
                        </View>
                        <View style={styles.accountTotalTextMain}>
                          <Text style={styles.accountTotalText}>Profil Yönetimi</Text>
                        </View>
                      </View>
                      <TouchableOpacity 
                        style={styles.logOutModal}
                        onPress={toggleModal}
                      >
                        <Feather name="x" size={24} color="white" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.accountTotal}>
                      <View style={styles.accountTotalIcons}>
                        <Feather name="settings" size={24} color="white" />
                      </View>
                      <View style={styles.accountTotalTextMain}>
                        <Text style={styles.accountTotalText}>Uygulama Ayarları</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.accountTotal}>
                      <View style={styles.accountTotalIcons}>
                        <Ionicons name="person-sharp" size={24} color="white" />
                      </View>
                      <View style={styles.accountTotalTextMain}>
                        <Text style={styles.accountTotalText}>Hesap</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.accountTotal}>
                      <View style={styles.accountTotalIcons}>
                        <AntDesign name="questioncircleo" size={24} color="white" />
                      </View>
                      <View style={styles.accountTotalTextMain}>
                        <Text style={styles.accountTotalText}>Yardım</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.accountTotal}
                      onPress={authContext.logOut}
                    >
                      <View style={styles.accountTotalIcons}>
                        <MaterialIcons name="logout" size={24} color="white" />
                      </View>
                      <View style={styles.accountTotalTextMain}>
                        <Text style={styles.accountTotalText}>Oturumu Kapat</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.verionInfo}>
                    <Text style={styles.versionText}>Versiyon: 16.26.0(4748) 5.0.1-001</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </View>
      <ScrollView>
        <View style={styles.accountInfo}>
          <View style={styles.accountImage}>
            <Image source={{ uri: selectedUser.userImageUrl }} style={styles.accountImageUrl} />
          </View>
          <View style={styles.accountUserName}>
            <Text style={styles.accountUserNameText}>{selectedUser.userName}</Text>
          </View>
        </View>
        <View style={styles.notifications}>
          <TouchableOpacity style={styles.notificationsContent}>
            <View style={styles.iconTextMain}>
              <View style={styles.icon}>
                <Ionicons name="notifications-sharp" size={24} color="white" />
              </View>
              <View style={styles.notificationsTitle}>
                <Text style={styles.notificationsTitleText}>Bildirimler</Text>
              </View>
            </View>
            <View style={styles.notificationsRigtIcon}>
              <AntDesign name="right" size={19} color="white" style={{ marginTop: 15 }} />
            </View>
          </TouchableOpacity>
          <View>
            <FlatList
              data={listPlay}
              showsHorizontalScrollIndicator={false}
              style={styles.flatListDataList}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.ListItem}>
                  <View style={{ width: 250, height: 150, left: 25, top: 15 }}>
                    <Image source={{ uri: item.notificationsImageUrl }} style={styles.listImage} />
                  </View>
                  <View style={styles.listInformation}>
                    <View style={styles.listInformationTitle}>
                      <Text style={styles.listInformationTitleText}>Yeni içerik</Text>
                    </View>
                    <View style={styles.listInformationName}>
                      <Text style={styles.listInformationNameText}>{item.listPlayName}</Text>
                    </View>
                    <View style={styles.listInformationDate}>
                      <Text style={styles.listInformationDateText}>5 Aralık</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.notificationsContent}>
            <View style={styles.iconTextMain}>
              <View style={styles.iconDowload}>
                <Octicons name="download" size={24} color="white" />
              </View>
              <View style={styles.notificationsTitle}>
                <Text style={styles.notificationsTitleText}>İndirilenler</Text>
              </View>
            </View>
            <View style={styles.notificationsRigtIcon}>
              <AntDesign name="right" size={19} color="white" style={{ marginTop: 15 }} />
            </View>
          </TouchableOpacity>
          <View>
            <View style={styles.listPlay}>
              <Text style={styles.contentTitle}>Listem</Text>
              <TouchableOpacity style={styles.topList}>
                <Text style={[styles.contentTitle, { fontSize: 17, alignItems: 'center' }]}>Tümünü Görüntüle</Text>
                <AntDesign name="right" size={19} color="white" style={{ right: 15 }} />
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                data={listPlayData.filter(movie => movie.movieName !== 'Extraction 1')}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatListData}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.movieItem}>
                    <View >
                      <View>
                        <Image source={{ uri: item.listPlayImage }} style={styles.movieImage} />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.notificationsContent}>
            <View style={styles.iconTextMain}>
              <View style={styles.notificationsTitle}>
                <Text style={styles.notificationsTitleText}>İzlediğiniz Fragmanlar</Text>
              </View>
            </View>
          </View>
          <View>
            <FlatList
              data={movies.filter(movie => movie.movieName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.movieItem}>
                  <View >
                    <View>
                      <Image source={{ uri: item.movieImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
        <View>
          <View style={styles.notificationsContent}>
            <View style={styles.iconTextMain}>
              <View style={styles.notificationsTitle}>
                <Text style={styles.notificationsTitleText}>İzlemeye Devam Et</Text>
              </View>
            </View>
          </View>
          <View>
            <FlatList
              data={listPlayData.filter(movie => movie.listPlayName === 'The Walking Dead')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.movieItem}>
                  <View >
                    <View>
                      <Image source={{ uri: item.listPlayImage }} style={styles.movieImage} />
                      <View style={styles.playIcon}>
                        <TouchableOpacity style={styles.playIconBg}>
                          <FontAwesome6 name="play" size={40} color="white" />
                        </TouchableOpacity>
                        <View style={styles.seasonInformation}>
                          <Text style={styles.seasonInformationText}>S3:B3</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.playListBottom}>
                      <View style={styles.playedMovie}>
                        <TouchableOpacity>
                          <AntDesign name="exclamationcircleo" size={24} color="white" style={{ marginTop: 7 }} />
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity>
                        <Entypo name="dots-three-vertical" size={24} color="white" style={{ marginTop: 7 }} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitleText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '800'
  },
  headerIcons: {
    flexDirection: 'row'
  },
  accountInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  accountImage: {},
  accountImageUrl: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  accountUserName: {
    marginTop: 15,
  },
  accountUserNameText: {
    color: 'white',
    fontSize: 24,
  },
  notificationsTitleText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600'
  },
  notificationsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 25
  },
  iconTextMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationsTitle: {
    marginLeft: 10
  },
  icon: {
    width: 44,
    height: 44,
    backgroundColor: 'red',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconDowload: {
    width: 44,
    height: 44,
    backgroundColor: '#0a70ff',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listImage: {
    width: 140,
    height: 85
  },
  flatListDataList: {
    flexDirection: 'column',
  },
  ListItem: {
    marginLeft: 10,
    marginBottom: -50,
    flexDirection: 'row',
  },
  listInformation: {
    justifyContent: 'center',
    right: 60,
    bottom: 15
  },
  listInformationTitle: {
    marginBottom: 5,
  },
  listInformationTitleText: {
    color: 'white',
    fontSize: 16
  },
  listInformationName: {
    marginBottom: 2,
  },
  listInformationNameText: {
    color: 'white',
    fontSize: 14
  },
  listInformationDate: {
  },
  listInformationDateText: {
    color: 'white',
    fontSize: 12,
    opacity: 0.7
  },
  listPlay: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topList: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  contentTitle: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    fontWeight: '600'
  },
  flatListData: {
    marginTop: 5,
    marginHorizontal: 10
  },
  movieImage: {
    width: 110,
    height: 150,
    marginRight: 3,
    marginLeft: 3,
    borderRadius: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '30%',
    left: '15%',
  },
  playIconBg: {
    backgroundColor: 'rgba(10,10,10,0.5)',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 2,
    borderColor: 'white'
  },
  playListBottom: {
    width: 110,
    height: 40,
    backgroundColor: '#141414',
    marginLeft: 3,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  seasonInformation: {
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
  },
  seasonInformationText: {
    color: 'white',
    fontWeight: 'bold'
  },
  modalMain: {
    position: 'relative',
    backgroundColor: 'rgb(40, 40, 40)',
    borderRadius: 15,
    width: '100%',
    height: '70%',
    top: '85%'
  },
  accountTotal: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 18,
  },
  accountTotalIcons: {
    marginRight: 6,
  },
  accountTotalTextMain: {
    marginLeft: 6,
  },
  accountTotalText: {
    color: 'white',
    fontSize: 16,
  },
  logOutModal: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 30,
    height: 30,
    backgroundColor: 'rgb(30,30,30)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  verionInfo: {
    paddingHorizontal: 10
  },
  versionText: {
    color: 'white',
    fontSize: 12,
  }
})
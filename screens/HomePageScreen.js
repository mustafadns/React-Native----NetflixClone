import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlayButton from '../components/PlayButton';
import ListButton from '../components/ListButton';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


export default function HomePageScreen({ route }) {
  const { selectedUser } = route.params;
  const navigation = useNavigation();

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

  const [categories, setCategories] = useState([]);
  const netflixLibrary = firebase.firestore().collection('categories');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixLibrary.get();
        const categories = querySnapshot.docs.map(doc => {
          const { id, name } = doc.data();
          return {
            id: doc.id,
            id,
            name,
          };
        });
        setCategories(categories);
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
  const [loading, setLoading] = useState(true);
  const netflixMovies = firebase.firestore().collection('movies').doc('action').collection('moviesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixMovies.get();
        const movies = querySnapshot.docs.map(doc => {
          const { id, movieName, movieImageUrl, movieLike, movieList, movieDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            movieName,
            movieImageUrl,
            movieLike,
            movieList,
            movieDetailImage,
          };
        });
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // Finally bloğunda setLoading(false) kullanarak loading durumunu güncelleyin
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [moviesOne, setMoviesOne] = useState([]);
  const netflixMoviesOne = firebase.firestore().collection('movies').doc('scienceFiction').collection('moviesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixMoviesOne.get();
        const moviesOne = querySnapshot.docs.map(doc => {
          const { id, movieName, movieImageUrl, movieLike, movieList, movieDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            movieName,
            movieImageUrl,
            movieLike,
            movieList,
            movieDetailImage,
          };
        });
        setMoviesOne(moviesOne);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [moviesTwo, setMoviesTwo] = useState([]);
  const netflixMoviesTwo = firebase.firestore().collection('movies').doc('comedies').collection('moviesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixMoviesTwo.get();
        const moviesTwo = querySnapshot.docs.map(doc => {
          const { id, movieName, movieImageUrl, movieLike, movieList, movieDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            movieName,
            movieImageUrl,
            movieLike,
            movieList,
            movieDetailImage,
          };
        });
        setMoviesTwo(moviesTwo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [moviesThree, setMoviesThree] = useState([]);
  const netflixMoviesThree = firebase.firestore().collection('movies').doc('fear').collection('moviesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixMoviesThree.get();
        const moviesThree = querySnapshot.docs.map(doc => {
          const { id, movieName, movieImageUrl, movieLike, movieList, movieDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            movieName,
            movieImageUrl,
            movieLike,
            movieList,
            movieDetailImage,
          };
        });
        setMoviesThree(moviesThree);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [moviesFour, setMoviesFour] = useState([]);
  const netflixMoviesFour = firebase.firestore().collection('movies').doc('likes').collection('moviesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixMoviesFour.get();
        const moviesFour = querySnapshot.docs.map(doc => {
          const { id, movieName, movieImageUrl, movieLike, movieList, movieDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            movieName,
            movieImageUrl,
            movieLike,
            movieList,
            movieDetailImage,
          };
        });
        setMoviesFour(moviesFour);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [seriesOne, setSeriesOne] = useState([]);
  const netflixSeriesOne = firebase.firestore().collection('series').doc('action').collection('seriesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixSeriesOne.get();
        const seriesOne = querySnapshot.docs.map(doc => {
          const { id, seriesName, seriesImageUrl, seriesLike, seriesList, season, seriesDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            seriesName,
            seriesImageUrl,
            seriesLike,
            seriesList,
            season,
            seriesDetailImage,
          };
        });
        setSeriesOne(seriesOne);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [seriesTwo, setSeriesTwo] = useState([]);
  const netflixSeriesTwo = firebase.firestore().collection('series').doc('scienceFiction').collection('seriesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixSeriesTwo.get();
        const seriesTwo = querySnapshot.docs.map(doc => {
          const { id, seriesName, seriesImageUrl, seriesLike, seriesList, season, seriesDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            seriesName,
            seriesImageUrl,
            seriesLike,
            seriesList,
            season,
            seriesDetailImage,
          };
        });
        setSeriesTwo(seriesTwo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [seriesThree, setSeriesThree] = useState([]);
  const netflixSeriesThree = firebase.firestore().collection('series').doc('fear').collection('seriesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixSeriesThree.get();
        const seriesThree = querySnapshot.docs.map(doc => {
          const { id, seriesName, seriesImageUrl, seriesLike, seriesList, season, seriesDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            seriesName,
            seriesImageUrl,
            seriesLike,
            seriesList,
            season,
            seriesDetailImage,
          };
        });
        setSeriesThree(seriesThree);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [seriesFour, setSeriesFour] = useState([]);
  const netflixSeriesFour = firebase.firestore().collection('series').doc('tensions').collection('seriesTop');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixSeriesFour.get();
        const seriesFour = querySnapshot.docs.map(doc => {
          const { id, seriesName, seriesImageUrl, seriesLike, seriesList, season, seriesDetailImage } = doc.data();
          return {
            id: doc.id,
            id,
            seriesName,
            seriesImageUrl,
            seriesLike,
            seriesList,
            season,
            seriesDetailImage,
          };
        });
        setSeriesFour(seriesFour);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  const [listPlay, setListPlay] = useState([]);
  const netflixListPlay = firebase.firestore().collection('myList');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await netflixListPlay.get();
        const listPlay = querySnapshot.docs.map(doc => {
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

  const [extraction1Data, setExtraction1Data] = useState(null);
  useEffect(() => {
    const fetchExtraction1Data = async () => {
      try {
        const extraction1Doc = await firebase.firestore().collection('movies').doc('action').collection('moviesTop').doc('extraction1').get();
        if (extraction1Doc.exists) {
          const extraction1Data = extraction1Doc.data();
          setExtraction1Data(extraction1Data);
        } else {
          console.log("Extraction 1 filmi bulunamadı.");
        }
      } catch (error) {
        console.error("Error fetching Extraction 1 data:", error);
      }
    };
    fetchExtraction1Data();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 10000); // 10 saniye sonra setLoading(false) çağrılıyor
    // useEffect hook'u temizleme fonksiyonunu döndürüyor
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: selectedUser.userImageUrl }} style={{ width: 170, height: 170, borderRadius: 15 }} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={120} color="red" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerMain}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>{selectedUser.userName} için</Text>
          </View>
          <View style={styles.headerOptions}>
            <TouchableOpacity
              style={styles.headerOptionsBc}
              onPress={() => navigation.navigate('Series', { selectedUser: route.params.selectedUser })}
            >
              <Text style={styles.headerOptionsBcText}>Diziler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerOptionsBc}
              onPress={() => navigation.navigate('Movies', { selectedUser: route.params.selectedUser })}
            >
              <Text style={styles.headerOptionsBcText}>Filmler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerOptionsBc}
              onPress={toggleModal}
            >
              <View>
                <Text style={styles.headerOptionsBcText}>Kategoriler</Text>
              </View>
              <View>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#f2f2f2" />
              </View>
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
                    <View style={styles.categoryContainer}>
                      <FlatList
                        style={styles.flatListCategory}
                        data={categories}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.movieItem}
                          >
                            <View style={styles.categoryContent}>
                              <Text style={styles.categoryText}>{item.name}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                      />
                    </View>
                    <View style={styles.iconTotalMain}>
                      <TouchableOpacity
                        style={styles.closeModalMainBg}
                        onPress={toggleModal}
                      >
                        <Feather name="x" size={30} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconsOne}>
            <MaterialIcons name="cast-connected" size={26} color="white" style={{ marginLeft: 20, bottom: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconsTwo}>
            <Feather name="search" size={26} color="white" style={{ marginLeft: 20, bottom: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.content}>
          <ScrollView style={styles.moviesContainer}>
            {extraction1Data && (
              <View style={styles.popularMovieMain}>
                <View style={styles.popularMovie}>
                  <View style={styles.popularMovieImage}>
                    <Image source={{ uri: extraction1Data.movieImageUrl }} style={styles.popularMovieImageUrl} />
                  </View>
                  <View style={styles.popularMovieButtons}>
                    <View style={{ width: 150, height: 40 }}>
                      <PlayButton />
                    </View>
                    <View style={{ width: 150, height: 40 }}>
                      <ListButton />
                    </View>
                  </View>
                </View>
              </View>
            )}
            <Text style={styles.contentTitle}>Netflix'te Popüler</Text>
            <FlatList
              data={movies.filter(movie => movie.movieName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { movie: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.movieImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>Gündemdekiler</Text>
            <FlatList
              data={moviesOne.filter(movie => movie.movieName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { movie: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.movieImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>Uzun Süre İzleyin</Text>
            <FlatList
              data={seriesOne.filter(series => series.seriesName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { series: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.seriesImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>Komedi Filmleri</Text>
            <FlatList
              data={moviesTwo.filter(movie => movie.movieName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { movie: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.movieImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>Korkutucu Filmler</Text>
            <FlatList
              data={moviesThree.filter(movie => movie.movieName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { movie: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.movieImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>Yeni Çıkanlar</Text>
            <FlatList
              data={seriesTwo.filter(series => series.seriesName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { series: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.seriesImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>Bunları Seveceğinizi Düşünüyoruz</Text>
            <FlatList
              data={seriesThree.filter(series => series.seriesName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { series: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.seriesImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>{selectedUser.userName} İçin En İyi Seçimler</Text>
            <FlatList
              data={seriesFour.filter(series => series.seriesName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { series: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.seriesImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.contentTitle}>Ödüllü Filmler</Text>
            <FlatList
              data={moviesFour.filter(movie => movie.movieName !== 'Extraction 1')}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.flatListData}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.movieItem}
                  onPress={() => navigation.navigate('MoviesAndSeriesDetail', { movie: item })}
                >
                  <View >
                    <View>
                      <Image source={{ uri: item.movieImageUrl }} style={styles.movieImage} />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
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
                  data={listPlay.filter(list => list.movieName !== 'Extraction 1')}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.flatListData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.movieItem}
                      onPress={() => navigation.navigate('MoviesAndSeriesDetail', { list: item })}
                    >
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
          </ScrollView>
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
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moviesContainer: {
    flex: 1,
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
  headerIcons: {
    flexDirection: 'row',
  },
  headerTitleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '800'
  },
  headerOptions: {
    flexDirection: 'row',
  },
  headerOptionsBc: {
    width: 'auto',
    marginRight: 15,
    top: 15,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    flexDirection: 'row'
  },
  headerOptionsBcText: {
    color: '#f2f2f2',
    fontSize: 15
  },
  movieImage: {
    width: 110,
    height: 150,
    marginRight: 3,
    marginLeft: 3,
    borderRadius: 10,
  },
  flatListData: {
    marginTop: 5,
    marginHorizontal: 10
  },
  contentTitle: {
    marginTop: 10,
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
    fontWeight: '600'
  },
  popularMovie: {
    flex: 1,
  },
  popularMovieImage: {
    alignItems: 'center',
  },
  popularMovieName: {
    alignItems: 'center'
  },
  popularMovieImageUrl: {
    width: 350,
    height: 520,
    borderRadius: 15,
    alignSelf: 'center'
  },
  popularMovieButtons: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    bottom: 50,
  },
  popularMovieMain: {
    width: 355,
    height: 525,
    alignSelf: 'center',
    borderRadius: 15,
  },
  listPlay: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topList: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  modalMain: {
    position: 'relative',
    backgroundColor: 'rgb(80, 80, 80)',
    opacity: 0.98,
    borderRadius: 15,
    width: '100%',
    height: '100%',
  },
  flatListCategory: {
  },
  categoryContainer: {

  },
  categoryContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  categoryText: {
    color: 'white',
    opacity: 0.7,
    fontSize: 18,
  },
  iconTotalMain: {
    position: 'absolute',
    left: '45%',
    bottom: 10,
  },
  closeModalMainBg: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
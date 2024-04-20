import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config';
import 'firebase/database';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import DetailPlayButton from '../components/DetailPlayButton';
import DetailDowloadButton from '../components/DetailDowloadButton';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';


export default function MoviesAndSeriesDetailScreen({ route }) {
  const { movie, series, list } = route.params;
  const navigation = useNavigation();

  const [updatedMovie, setUpdatedMovie] = useState(movie);

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

  const [movies, setMovies] = useState([]);
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
      }
    };
    fetchData();
    return () => {
      // Clean-up function (if necessary)
    };
  }, [])

  //movie sayfasına onPres olduğu zaman görünecek sayfa 
  if (movie) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.movieImageTop}>
            <Image source={{ uri: movie.movieDetailImage }} style={styles.movieImageUrl} />
            <View style={styles.playIcon}>
              <TouchableOpacity style={styles.playIconBg}>
                <FontAwesome6 name="play" size={40} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.topIcons}>
              <TouchableOpacity style={styles.connectIconBg}>
                <MaterialIcons name="cast-connected" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.xIconBg}
                onPress={() => navigation.goBack()}
              >
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.infoMain}>
              <View>
                <Image source={require('../assets/logo/netflix-logo.png')} style={{ width: 10, height: 20 }} />
              </View>
              <View>
                <Text style={{ color: 'gray', fontSize: 13, marginLeft: 5, marginTop: 1, fontWeight: '500' }}>F İ L M</Text>
              </View>
            </View>
            <View style={styles.movieName}>
              <Text style={styles.movieNameText}>{movie.movieName}</Text>
            </View>
            <View style={styles.movieMinInfo}>
              <View>
                <Text style={{ color: 'green', fontWeight: 'bold' }}>%93 eşleşme</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'white', opacity: 0.6 }}>2020</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'white', opacity: 0.6 }}>1 sa. 58 dk.</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <MaterialIcons name="hd" size={24} color="#363636" />
              </View>
            </View>
            <View style={styles.mainDetailButton}>
              <View style={{ width: '100%', height: 40, marginBottom: 10 }}>
                <DetailPlayButton />
              </View>
              <View style={{ width: '100%', height: 40 }}>
                <DetailDowloadButton />
              </View>
            </View>
            <View style={styles.detailDesc}>
              <Text style={styles.detailDescText}>Film, hareketli resimlerin seri şekilde gösterilmesi ile ortaya çıkan bir yapıttır. Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
            </View>
            <View style={styles.informationActorsDirector}>
              <View style={styles.actorsName}>
                <Text style={styles.actorsNameText}>Oyuncu kadrosu: Chris Hemsworth, Mark Wahlberg, Will Smith, Dylan O'Brien, Shailene Woodley, Scarlett Johansson, Angelina Jolie</Text>
              </View>
              <View style={styles.directorName}>
                <Text style={styles.directorNameText}>Yönetmen: Timur Bekmambetov</Text>
              </View>
            </View>
            <View style={styles.Icons}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  const updatedMovieCopy = { ...updatedMovie, movieList: !updatedMovie.movieList };
                  setUpdatedMovie(updatedMovieCopy);
                }}
              >
                <View>
                  {updatedMovie.movieList ? (
                    <Feather name="check" size={24} color="white" />
                  ) : (
                    <AntDesign name="plus" size={24} color="white" />
                  )}
                </View>
                <View style={styles.iconTitle}>
                  <Text style={styles.iconTitleText}>Listem</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <View>
                  <SimpleLineIcons name="like" size={24} color="white" />
                </View>
                <View style={styles.iconTitle}>
                  <Text style={styles.iconTitleText}>Puan Ver</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <View>
                  <Feather name="send" size={24} color="white" />
                </View>
                <View style={styles.iconTitle}>
                  <Text style={styles.iconTitleText}>Tavsiye Et</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={styles.titleMovie}>
              <Text style={styles.titleMovieText}>Benzerleri</Text>
            </View>
            <View>
              <FlatList
                data={movies.filter(movie => movie.movieName !== 'Extraction 1')}
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
                keyExtractor={(item, index) => item.id + (index % 3).toString()} // Yeniden oluşturmak için numColumns'u kullanarak key ayarlayın
                scrollEnabled={false}
                numColumns={3}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }

  const seasonCount = series.seasonCount;

  const seasons = Array.from({ length: seasonCount }, (_, index) => index + 1);

  // series datasına onPres olduğu zaman görünecek sayfa
  if (series) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.movieImageTop}>
            <Image source={{ uri: series.seriesDetailImage }} style={styles.movieImageUrl} />
            <View style={styles.playIcon}>
              <TouchableOpacity style={styles.playIconBg}>
                <FontAwesome6 name="play" size={40} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.topIcons}>
              <TouchableOpacity style={styles.connectIconBg}>
                <MaterialIcons name="cast-connected" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.xIconBg}
                onPress={() => navigation.goBack()}
              >
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.mainContent}>
            <View style={styles.infoMain}>
              <View>
                <Image source={require('../assets/logo/netflix-logo.png')} style={{ width: 10, height: 20 }} />
              </View>
              <View>
                <Text style={{ color: 'gray', fontSize: 13, marginLeft: 5, marginTop: 1, fontWeight: '500' }}>D İ Z İ</Text>
              </View>
            </View>
            <View style={styles.movieName}>
              <Text style={styles.movieNameText}>{series.seriesName}</Text>
            </View>
            <View style={styles.movieMinInfo}>
              <View>
                <Text style={{ color: 'green', fontWeight: 'bold' }}>%93 eşleşme</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'white', opacity: 0.6 }}>2020</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'white', opacity: 0.6 }}>{series.season.length} Sezon</Text>
              </View>
              <View style={{ marginLeft: 10 }}>
                <MaterialIcons name="hd" size={24} color="#363636" />
              </View>
            </View>
            <View style={styles.mainDetailButton}>
              <View style={{ width: '100%', height: 40, marginBottom: 10 }}>
                <DetailPlayButton />
              </View>
              <View style={{ width: '100%', height: 40 }}>
                <DetailDowloadButton />
              </View>
            </View>
            <View style={styles.detailDesc}>
              <Text style={styles.detailDescText}>Film, hareketli resimlerin seri şekilde gösterilmesi ile ortaya çıkan bir yapıttır. Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
            </View>
            <View style={styles.informationActorsDirector}>
              <View style={styles.actorsName}>
                <Text style={styles.actorsNameText}>Oyuncu kadrosu: Chris Hemsworth, Mark Wahlberg, Will Smith, Dylan O'Brien, Shailene Woodley, Scarlett Johansson, Angelina Jolie</Text>
              </View>
              <View style={styles.directorName}>
                <Text style={styles.directorNameText}>Yönetmen: Timur Bekmambetov</Text>
              </View>
            </View>
            <View style={styles.Icons}>
              <TouchableOpacity
                style={styles.icon}
              >
                <View>
                  {series.seriesList ? (
                    <Feather name="check" size={24} color="white" />
                  ) : (
                    <AntDesign name="plus" size={24} color="white" />
                  )}
                </View>
                <View style={styles.iconTitle}>
                  <Text style={styles.iconTitleText}>Listem</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <View>
                  <SimpleLineIcons name="like" size={24} color="white" />
                </View>
                <View style={styles.iconTitle}>
                  <Text style={styles.iconTitleText}>Puan Ver</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon}>
                <View>
                  <Feather name="send" size={24} color="white" />
                </View>
                <View style={styles.iconTitle}>
                  <Text style={styles.iconTitleText}>Tavsiye Et</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentSeason}>
            <View style={styles.titleSeries}>
              <Text style={[styles.titleSeriesText]}>Bölümler</Text>
            </View>
            <View>
              <View style={styles.containerSeason}>
                <View>
                  <TouchableOpacity
                    style={styles.seasonInfo}
                    onPress={toggleModal}
                  >
                    <View style={styles.seasonMain}>
                      <Text style={styles.seasonText}>1.Sezon</Text>
                    </View>
                    <View>
                      <AntDesign name="down" size={17} color="white" style={[{ opacity: 0.7 }, styles.seasonIcon]} />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <MaterialCommunityIcons name="alpha-i-circle-outline" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainSeasons}>
              <View style={styles.contentSeasons}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.contentSeasonsImage}>
                      <Image source={{ uri: series.seriesDetailImage }} style={{ width: 110, height: 70 }} />
                    </View>
                    <View style={styles.seasonPlayIconBg}>
                      <FontAwesome6 name="play" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contentSeasonsSection}>
                    <View>
                      <Text style={styles.contentSeasonsSectionText}>1.Bölüm</Text>
                    </View>
                    <View>
                      <Text style={styles.contentSeasonsSectionTimeText}>47 dk.</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.dowloadIcon}>
                  <Octicons name="download" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={[styles.detailDesc, { bottom: 15 }]}>
                <Text style={[styles.detailDescText, { fontSize: 14, opacity: 0.7 }]}>Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
              </View>
            </View>
            <View style={styles.mainSeasons}>
              <View style={styles.contentSeasons}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.contentSeasonsImage}>
                      <Image source={{ uri: series.seriesDetailImage }} style={{ width: 110, height: 70 }} />
                    </View>
                    <View style={styles.seasonPlayIconBg}>
                      <FontAwesome6 name="play" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contentSeasonsSection}>
                    <View>
                      <Text style={styles.contentSeasonsSectionText}>2.Bölüm</Text>
                    </View>
                    <View>
                      <Text style={styles.contentSeasonsSectionTimeText}>39 dk.</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.dowloadIcon}>
                  <Octicons name="download" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={[styles.detailDesc, { bottom: 15 }]}>
                <Text style={[styles.detailDescText, { fontSize: 14, opacity: 0.7 }]}>Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
              </View>
            </View>
            <View style={styles.mainSeasons}>
              <View style={styles.contentSeasons}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.contentSeasonsImage}>
                      <Image source={{ uri: series.seriesDetailImage }} style={{ width: 110, height: 70 }} />
                    </View>
                    <View style={styles.seasonPlayIconBg}>
                      <FontAwesome6 name="play" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contentSeasonsSection}>
                    <View>
                      <Text style={styles.contentSeasonsSectionText}>3.Bölüm</Text>
                    </View>
                    <View>
                      <Text style={styles.contentSeasonsSectionTimeText}>58 dk.</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.dowloadIcon}>
                  <Octicons name="download" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={[styles.detailDesc, { bottom: 15 }]}>
                <Text style={[styles.detailDescText, { fontSize: 14, opacity: 0.7 }]}>Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
              </View>
            </View>
            <View style={styles.mainSeasons}>
              <View style={styles.contentSeasons}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.contentSeasonsImage}>
                      <Image source={{ uri: series.seriesDetailImage }} style={{ width: 110, height: 70 }} />
                    </View>
                    <View style={styles.seasonPlayIconBg}>
                      <FontAwesome6 name="play" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contentSeasonsSection}>
                    <View>
                      <Text style={styles.contentSeasonsSectionText}>4.Bölüm</Text>
                    </View>
                    <View>
                      <Text style={styles.contentSeasonsSectionTimeText}>44 dk.</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.dowloadIcon}>
                  <Octicons name="download" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={[styles.detailDesc, { bottom: 15 }]}>
                <Text style={[styles.detailDescText, { fontSize: 14, opacity: 0.7 }]}>Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
              </View>
            </View>
            <View style={styles.mainSeasons}>
              <View style={styles.contentSeasons}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.contentSeasonsImage}>
                      <Image source={{ uri: series.seriesDetailImage }} style={{ width: 110, height: 70 }} />
                    </View>
                    <View style={styles.seasonPlayIconBg}>
                      <FontAwesome6 name="play" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contentSeasonsSection}>
                    <View>
                      <Text style={styles.contentSeasonsSectionText}>5.Bölüm</Text>
                    </View>
                    <View>
                      <Text style={styles.contentSeasonsSectionTimeText}>41 dk.</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.dowloadIcon}>
                  <Octicons name="download" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={[styles.detailDesc, { bottom: 15 }]}>
                <Text style={[styles.detailDescText, { fontSize: 14, opacity: 0.7 }]}>Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
              </View>
            </View>
            <View style={styles.mainSeasons}>
              <View style={styles.contentSeasons}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.contentSeasonsImage}>
                      <Image source={{ uri: series.seriesDetailImage }} style={{ width: 110, height: 70 }} />
                    </View>
                    <View style={styles.seasonPlayIconBg}>
                      <FontAwesome6 name="play" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contentSeasonsSection}>
                    <View>
                      <Text style={styles.contentSeasonsSectionText}>6.Bölüm</Text>
                    </View>
                    <View>
                      <Text style={styles.contentSeasonsSectionTimeText}>59 dk.</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.dowloadIcon}>
                  <Octicons name="download" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={[styles.detailDesc, { bottom: 15 }]}>
                <Text style={[styles.detailDescText, { fontSize: 14, opacity: 0.7 }]}>Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
              </View>
            </View>
            <View style={styles.mainSeasons}>
              <View style={styles.contentSeasons}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity>
                    <View style={styles.contentSeasonsImage}>
                      <Image source={{ uri: series.seriesDetailImage }} style={{ width: 110, height: 70 }} />
                    </View>
                    <View style={styles.seasonPlayIconBg}>
                      <FontAwesome6 name="play" size={20} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.contentSeasonsSection}>
                    <View>
                      <Text style={styles.contentSeasonsSectionText}>7.Bölüm</Text>
                    </View>
                    <View>
                      <Text style={styles.contentSeasonsSectionTimeText}>51 dk.</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.dowloadIcon}>
                  <Octicons name="download" size={24} color="white" />
                </TouchableOpacity>
              </View>
              <View style={[styles.detailDesc, { bottom: 15 }]}>
                <Text style={[styles.detailDescText, { fontSize: 14, opacity: 0.7 }]}>Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }


  // listPlay datasına onPres olduğunda görünecek sayfa 
  if (list) {
    return (
      <View>
        <Text>{list.listPlayName}</Text>
      </View>
    )
  }

  // Hata sayfası gibi tasarlanacak onPres olan film olmadığında burası görünecek
  return (
    <View />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flexDirection: 'column',
  },
  mainContent: {
    paddingHorizontal: 15,
    flexDirection: 'column',
  },
  movieImageTop: {
    top: 25,
  },
  movieImageUrl: {
    width: 410,
    height: 307,
  },
  topIcons: {
    position: 'absolute',
    left: 320,
    top: 5,
    flexDirection: 'row',
  },
  connectIconBg: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(10,10,10,0.9)',
    marginRight: 10,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xIconBg: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(10,10,10,0.9)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoMain: {
    marginTop: 35,
    flexDirection: 'row'
  },
  movieNameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  movieName: {
    marginTop: 5,
  },
  movieMinInfo: {
    flexDirection: 'row',
    marginTop: 5,
  },
  mainDetailButton: {
    marginTop: 10,
  },
  detailDescText: {
    color: 'white',
    opacity: 0.9,
    fontSize: 15
  },
  detailDesc: {
    marginTop: 20,
  },
  actorsNameText: {
    color: '#696969',
    fontWeight: '500',
    fontSize: 13,
  },
  directorNameText: {
    color: '#696969',
    fontWeight: '500',
    fontSize: 13,
  },
  informationActorsDirector: {
    marginTop: 10
  },
  directorName: {
    marginTop: 3,
  },
  Icons: {
    flexDirection: 'row',
    marginTop: 20
  },
  icon: {
    marginRight: 50,
    alignItems: 'center'
  },
  iconTitle: {
    marginTop: 5,
  },
  iconTitleText: {
    color: 'white',
  },
  movieImage: {
    width: 110,
    height: 150,
    marginRight: 25,
    marginBottom: 15,
    marginLeft: 3,
    borderRadius: 10,
  },
  flatListData: {
    marginTop: 5,
    marginHorizontal: 10,
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
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
  titleMovieText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    width: 80,
    borderBottomWidth: 3,
    borderColor: 'red',
  },
  titleMovie: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  titleSeriesText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
    width: 72,
    borderBottomWidth: 3,
    borderColor: 'red',
  },
  titleSeries: {
    paddingVertical: 10,
  },
  seasonInfo: {
    width: 110,
    height: 35,
    backgroundColor: '#4f4f4f',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
  },
  seasonMain: {
  },
  seasonText: {
    color: 'white',
    opacity: 0.7,
    fontSize: 18
  },
  seasonIcon: {
    marginLeft: 10,
  },
  contentSeason: {
    paddingHorizontal: 15,
  },
  containerSeason: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentSeasonsSectionText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  contentSeasonsSectionTimeText: {
    color: 'white',
    opacity: 0.7,
    fontSize: 13,
  },
  mainSeasons: {
    paddingVertical: 20,
  },
  contentSeasons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSeasonsImage: {},
  contentSeasonsSection: {
    marginLeft: 15,
    justifyContent: 'center',
    marginBottom: 10,
  },
  seasonPlayIconBg: {
    position: 'absolute',
    left: '35%',
    top: '25%',
    width: 34,
    height: 34,
    backgroundColor: 'rgba(10,10,10,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
    borderWidth: 2,
    borderColor: 'white'
  },
  dowloadIcon: {
    justifyContent: 'center',
    marginBottom: 20,
    marginRight: 10,
  },
  modalMain: {
    position: 'relative',
    backgroundColor: '#4f4f4f',
    width: 200,
    height: 400,
    borderRadius: 15,
  },
})
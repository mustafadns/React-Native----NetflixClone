import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlayButton from '../components/PlayButton';
import ListButton from '../components/ListButton';
import { AntDesign } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';

export default function MoviesScreen({ route }) {
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

    const [lucyData, setLucyData] = useState(null);
    useEffect(() => {
        const fetchExtraction1Data = async () => {
            try {
                const lucyDoc = await firebase.firestore().collection('movies').doc('action').collection('moviesTop').doc('lucy').get();
                if (lucyDoc.exists) {
                    const lucyData = lucyDoc.data();
                    setLucyData(lucyData);
                } else {
                    console.log("Lucy filmi bulunamadı.");
                }
            } catch (error) {
                console.error("Error fetching Lucy data:", error);
            }
        };
        fetchExtraction1Data();
    }, []);

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

    const [moviesComedy, setMoviesComedy] = useState([]);
    const netflixMoviesComedy = firebase.firestore().collection('movies').doc('comedies').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesComedy.get();
                const moviesComedy = querySnapshot.docs.map(doc => {
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
                setMoviesComedy(moviesComedy);
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

    const [moviesAnime, setMoviesAnime] = useState([]);
    const netflixMoviesAnime = firebase.firestore().collection('movies').doc('anime').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesAnime.get();
                const moviesAnime = querySnapshot.docs.map(doc => {
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
                setMoviesAnime(moviesAnime);
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

    const [movieschildAndFamily, setMovieschildAndFamily] = useState([]);
    const netflixMovieschildAndFamily = firebase.firestore().collection('movies').doc('childAndFamily').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMovieschildAndFamily.get();
                const movieschildAndFamily = querySnapshot.docs.map(doc => {
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
                setMovieschildAndFamily(movieschildAndFamily);
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

    const [moviesDocumentaries, setMoviesDocumentaries] = useState([]);
    const netflixMoviesDocumentaries = firebase.firestore().collection('movies').doc('documentaries').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesDocumentaries.get();
                const moviesDocumentaries = querySnapshot.docs.map(doc => {
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
                setMoviesDocumentaries(moviesDocumentaries);
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

    const [moviesDramas, setMoviesDramas] = useState([]);
    const netflixMoviesDramas = firebase.firestore().collection('movies').doc('dramas').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesDramas.get();
                const moviesDramas = querySnapshot.docs.map(doc => {
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
                setMoviesDramas(moviesDramas);
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

    const [moviesFantastic, setMoviesFantastic] = useState([]);
    const netflixMoviesFantastic = firebase.firestore().collection('movies').doc('fantastic').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesFantastic.get();
                const moviesFantastic = querySnapshot.docs.map(doc => {
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
                setMoviesFantastic(moviesFantastic);
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

    const [moviesFear, setMoviesFear] = useState([]);
    const netflixMoviesFear = firebase.firestore().collection('movies').doc('fear').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesFear.get();
                const moviesFear = querySnapshot.docs.map(doc => {
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
                setMoviesFear(moviesFear);
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

    const [moviesLikes, setMoviesLikes] = useState([]);
    const netflixMoviesLikes = firebase.firestore().collection('movies').doc('likes').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesLikes.get();
                const moviesLikes = querySnapshot.docs.map(doc => {
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
                setMoviesLikes(moviesLikes);
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

    const [moviesRomanticism, setMoviesRomanticism] = useState([]);
    const netflixMoviesRomanticism = firebase.firestore().collection('movies').doc('romanticism').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesRomanticism.get();
                const moviesRomanticism = querySnapshot.docs.map(doc => {
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
                setMoviesRomanticism(moviesRomanticism);
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

    const [moviesScienceFiction, setMoviesScienceFiction] = useState([]);
    const netflixMoviesScienceFiction = firebase.firestore().collection('movies').doc('scienceFiction').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesScienceFiction.get();
                const moviesScienceFiction = querySnapshot.docs.map(doc => {
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
                setMoviesScienceFiction(moviesScienceFiction);
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

    const [moviesTensions, setMoviesTensions] = useState([]);
    const netflixMoviesTensions = firebase.firestore().collection('movies').doc('tensions').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesTensions.get();
                const moviesTensions = querySnapshot.docs.map(doc => {
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
                setMoviesTensions(moviesTensions);
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

    const [moviesTurkis, setMoviesTurkis] = useState([]);
    const netflixMoviesTurkis = firebase.firestore().collection('movies').doc('turkis').collection('moviesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixMoviesTurkis.get();
                const moviesTurkis = querySnapshot.docs.map(doc => {
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
                setMoviesTurkis(moviesTurkis);
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
                            style={styles.headerOptionsBcX}
                            onPress={() => navigation.goBack()}
                        >
                            {/* <Text >X</Text> */}
                            <Feather style={{}} name="x" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.headerOptionsBc, { backgroundColor: 'gray' }]}
                        >
                            <Text style={styles.headerOptionsBcText}>Filmler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.headerOptionsBc}
                            onPress={toggleModal}
                        >
                            <View>
                                <Text style={styles.headerOptionsBcText}>Tüm Kategoriler</Text>
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
                                    // , right: 5, top: -235 
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
                                                    // onPress={() => navigation.navigate('Movies')}
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
            <ScrollView style={styles.moviesContainer}>
                {lucyData && (
                    <View style={styles.popularMovieMain}>
                        <View style={styles.popularMovie}>
                            <View style={styles.popularMovieImage}>
                                <Image source={{ uri: lucyData.movieImageUrl }} style={styles.popularMovieImageUrl} />
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
                    data={movies.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Komedi Filmleri</Text>
                <FlatList
                    data={moviesComedy.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Anime Filmleri</Text>
                <FlatList
                    data={moviesAnime.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Çocuk Ve Aile Filmleri</Text>
                <FlatList
                    data={movieschildAndFamily.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Belgeseller Filmleri</Text>
                <FlatList
                    data={moviesDocumentaries.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Drama Filmleri</Text>
                <FlatList
                    data={moviesDramas.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Fantastik Filmler</Text>
                <FlatList
                    data={moviesFantastic.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Korku Filmleri</Text>
                <FlatList
                    data={moviesFear.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Beğenilen Filmler</Text>
                <FlatList
                    data={moviesLikes.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Romantik Filmler</Text>
                <FlatList
                    data={moviesRomanticism.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>{selectedUser.userName} İçin En İyi Seçimler</Text>
                <FlatList
                    data={moviesScienceFiction.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Gerilim Filmleri</Text>
                <FlatList
                    data={moviesTensions.filter(movie => movie.movieName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Türk Yapımı Filmler</Text>
                <FlatList
                    data={moviesTurkis.filter(movie => movie.movieName !== '6 Underground')}
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
    headerOptionsBcX: {
        top: 15,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 18,
        width: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    headerOptionsBcText: {
        color: '#f2f2f2',
        fontSize: 15
    },
    moviesContainer: {
        flex: 1,
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
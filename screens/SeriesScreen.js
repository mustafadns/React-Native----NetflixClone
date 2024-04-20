import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList, ActivityIndicator, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { firebase } from '../config';
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlayButton from '../components/PlayButton';
import ListButton from '../components/ListButton';

export default function SeriesScreen({ route }) {
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

    const [walkingDeadData, setWalkingDeadData] = useState(null);
    useEffect(() => {
        const fetchExtraction1Data = async () => {
            try {
                const lucyDoc = await firebase.firestore().collection('series').doc('action').collection('seriesTop').doc('theWalkingDead').get();
                if (lucyDoc.exists) {
                    const walkingDeadData = lucyDoc.data();
                    setWalkingDeadData(walkingDeadData);
                } else {
                    console.log("Lucy filmi bulunamadı.");
                }
            } catch (error) {
                console.error("Error fetching Lucy data:", error);
            }
        };
        fetchExtraction1Data();
    }, []);

    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);
    const netflixSeries = firebase.firestore().collection('series').doc('action').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeries.get();
                const series = querySnapshot.docs.map(doc => {
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
                setSeries(series);
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

    const [seriesComedy, setSeriesComedy] = useState([]);
    const netflixSeriesComedy = firebase.firestore().collection('series').doc('comedies').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesComedy.get();
                const seriesComedy = querySnapshot.docs.map(doc => {
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
                setSeriesComedy(seriesComedy);
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

    const [seriesAnime, setSeriesAnime] = useState([]);
    const netflixSeriesAnime = firebase.firestore().collection('series').doc('anime').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesAnime.get();
                const seriesAnime = querySnapshot.docs.map(doc => {
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
                setSeriesAnime(seriesAnime);
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

    const [serieschildAndFamily, setSerieschildAndFamily] = useState([]);
    const netflixSerieschildAndFamily = firebase.firestore().collection('series').doc('childAndFamily').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSerieschildAndFamily.get();
                const serieschildAndFamily = querySnapshot.docs.map(doc => {
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
                setSerieschildAndFamily(serieschildAndFamily);
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

    const [seriesDocumentaries, setSeriesDocumentaries] = useState([]);
    const netflixSeriesDocumentaries = firebase.firestore().collection('series').doc('documentaries').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesDocumentaries.get();
                const seriesDocumentaries = querySnapshot.docs.map(doc => {
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
                setSeriesDocumentaries(seriesDocumentaries);
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

    const [seriesDramas, setSeriesDramas] = useState([]);
    const netflixSeriesDramas = firebase.firestore().collection('series').doc('dramas').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesDramas.get();
                const seriesDramas = querySnapshot.docs.map(doc => {
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
                setSeriesDramas(seriesDramas);
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

    const [seriesFantastic, setSeriesFantastic] = useState([]);
    const netflixSeriesFantastic = firebase.firestore().collection('series').doc('fantastic').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesFantastic.get();
                const seriesFantastic = querySnapshot.docs.map(doc => {
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
                setSeriesFantastic(seriesFantastic);
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

    const [seriesFear, setSeriesFear] = useState([]);
    const netflixSeriesFear = firebase.firestore().collection('series').doc('fear').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesFear.get();
                const seriesFear = querySnapshot.docs.map(doc => {
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
                setSeriesFear(seriesFear);
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

    const [seriesRomanticism, setSeriesRomanticism] = useState([]);
    const netflixSeriesRomanticism = firebase.firestore().collection('series').doc('romanticism').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesRomanticism.get();
                const seriesRomanticism = querySnapshot.docs.map(doc => {
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
                setSeriesRomanticism(seriesRomanticism);
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

    const [seriesScienceFiction, setSeriesScienceFiction] = useState([]);
    const netflixSeriesScienceFiction = firebase.firestore().collection('series').doc('scienceFiction').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesScienceFiction.get();
                const seriesScienceFiction = querySnapshot.docs.map(doc => {
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
                setSeriesScienceFiction(seriesScienceFiction);
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

    const [seriesTensions, setSeriesTensions] = useState([]);
    const netflixSeriesTensions = firebase.firestore().collection('series').doc('tensions').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesTensions.get();
                const seriesTensions = querySnapshot.docs.map(doc => {
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
                setSeriesTensions(seriesTensions);
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

    const [seriesTurkis, setSeriesTurkis] = useState([]);
    const netflixSeriesTurkis = firebase.firestore().collection('series').doc('turkish').collection('seriesTop');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await netflixSeriesTurkis.get();
                const seriesTurkis = querySnapshot.docs.map(doc => {
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
                setSeriesTurkis(seriesTurkis);
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
                            <Feather style={{}} name="x" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.headerOptionsBc, { backgroundColor: 'gray' }]}
                        >
                            <Text style={styles.headerOptionsBcText}>Diziler</Text>
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
                {walkingDeadData && (
                    <View style={styles.popularMovieMain}>
                        <View style={styles.popularMovie}>
                            <View style={styles.popularMovieImage}>
                                <Image source={{ uri: walkingDeadData.seriesImageUrl }} style={styles.popularMovieImageUrl} />
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
                    data={series.filter(series => series.seriesName !== 'The Walking Dead')}
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
                    data={seriesComedy.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Anime Filmleri</Text>
                <FlatList
                    data={seriesAnime.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Çocuk Ve Aile Filmleri</Text>
                <FlatList
                    data={serieschildAndFamily.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Belgeseller Filmleri</Text>
                <FlatList
                    data={seriesDocumentaries.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Drama Filmleri</Text>
                <FlatList
                    data={seriesDramas.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Fantastik Filmler</Text>
                <FlatList
                    data={seriesFantastic.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Korku Filmleri</Text>
                <FlatList
                    data={seriesFear.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Romantik Filmler</Text>
                <FlatList
                    data={seriesRomanticism.filter(series => series.seriesName !== '6 Underground')}
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
                    data={seriesScienceFiction.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Gerilim Filmleri</Text>
                <FlatList
                    data={seriesTensions.filter(series => series.seriesName !== '6 Underground')}
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
                <Text style={styles.contentTitle}>Türk Yapımı Filmler</Text>
                <FlatList
                    data={seriesTurkis.filter(series => series.seriesName !== '6 Underground')}
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
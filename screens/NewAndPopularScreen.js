import { StyleSheet, Text, View, TouchableOpacity, ScrollView ,FlatList , Image} from 'react-native'
import React, { useState, useEffect } from 'react'
import { firebase } from '../config';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function NewAndPopularScreen() {
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Yeni Ve Popüler</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <MaterialIcons name="cast-connected" size={26} color="white" style={{ marginRight: 10, marginLeft: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="search" size={26} color="white" style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View></View>
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
                  <View style={styles.playName}>
                    <Text style={styles.playNameText}>{item.listPlayName}</Text>
                  </View>
                  <View style={styles.listPlayRigt}>
                    <TouchableOpacity style={styles.notificationsIcon}>
                      <View>
                        <Feather name="send" size={24} color="white" />
                      </View>
                      <View style={styles.notificationsTitle}>
                        <Text style={styles.notificationsTitleText}>Tavsiye Et</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.notificationsIcon,{bottom:3}]}>
                      <View>
                        <AntDesign name="plus" size={30} color="white"/>
                      </View>
                      <View style={styles.notificationsTitle}>
                        <Text style={styles.notificationsTitleText}>Listem</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.notificationsIcon,{bottom:3}]}>
                      <View>
                        <Entypo name="controller-play" size={30} color="white" />
                      </View>
                      <View style={styles.notificationsTitle}>
                        <Text style={styles.notificationsTitleText}>Oynat</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.listInformationTitle}>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.logoImage}>
                      <Image source={require('../assets/logo/netflix-logo.png')} style={{width:10,height:20}}/>
                    </View>
                    <View style={styles.logoImageTitle}>
                      <Text style={{color: 'white',fontSize:12,marginLeft:5}}>Film</Text>
                    </View>
                  </View>
                  <View style={styles.logoName}>
                    <Text style={styles.logoNameText}>{item.listPlayName}</Text>
                  </View>
                  <View>
                    <Text style={styles.logoDescText}>Film, hareketli resimlerin seri şekilde gösterilmesi ile ortaya çıkan bir yapıttır. Filmler, gerçek insan ve objelerin kamerayla kayıt edilmesiyle veya animasyon teknikleri, özel efektler gibi teknikler ile her iki unsurun yaratılmasıyla ortaya çıkar.</Text>
                  </View>
                  <View>
                    <Text style={styles.logoTypeText}>Dehşet Verici-Kanlı-Bilim Kurgu-Gerilim-Macera</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
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
  listImage: {
    width: 350,
    height: 215
  },
  flatListDataList: {
    flexDirection: 'column',
  },
  ListItem: {
    marginLeft: 10,
    flexDirection: 'column',
    marginBottom: 50
  },
  playNameText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600'
  },
  listInformation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
    marginLeft: 10,
  },
  listPlayRigt: {
    flexDirection: 'row',
    marginRight: 25
  },
  notificationsTitleText: {
    color: 'white'
  },
  notificationsIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoTypeText: {
    color: '#f2f2f2',
    opacity: 0.8
  },
  logoDescText: {
    color: '#666666',
    marginBottom: 7,
  },
  logoNameText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 10,
  },
  listInformationTitle: {
    marginLeft: 15,
  }
})
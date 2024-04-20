import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePageScreen from './HomePageScreen';
import NewAndPopularScreen from './NewAndPopularScreen';
import AccountScreen from './AccountScreen';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();
export default function HomeScreen({ route }) {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const netflixLibrary = firebase.firestore().collection('categories');

    const { selectedUser } = route.params;

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
    }, []);

    const ProfileIcon = ({ photo }) => (
        <Image
            source={{ uri: selectedUser.userImageUrl }}
            style={{ width: 26, height: 26, borderRadius: 2 }}
        />
    );


    return (
        <View
            style={styles.container}
        >
            <View style={styles.heading}>
            </View>
            <View style={styles.content}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'gray',
                        tabBarStyle: {
                            display: 'flex',
                            backgroundColor: '#1c1c1c'
                        },
                    }}
                >
                    <Tab.Screen
                        name="HomePage"
                        component={HomePageScreen}
                        initialParams={{ selectedUser: selectedUser }}
                        options={{
                            headerShown: false,
                            title: "Ana Sayfa",
                            tabBarIcon: ({ color, size }) => (
                                <Entypo name="home" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="NewAndPopular"
                        component={NewAndPopularScreen}
                        initialParams={{ selectedUser: selectedUser }}
                        options={{
                            headerShown: false,
                            title: "Yeni ve Popüler",
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons name="animation-play-outline" size={size} color={color} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Account"
                        component={AccountScreen}
                        initialParams={{ selectedUser: selectedUser }}
                        options={{
                            headerShown: false,
                            title: "Benim Netflix'im",
                            tabBarIcon: () => (
                                <ProfileIcon />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    content: {
        flex: 1,
    }
})
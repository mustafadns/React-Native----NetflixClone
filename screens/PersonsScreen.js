import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../config';

export default function PersonsScreen() {
    const navigation = useNavigation();

    const [users, setUsers] = useState([]);
    const todoRef = firebase.firestore().collection('users');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await todoRef.get();
                const users = querySnapshot.docs.map(doc => {
                    const { id, userImageUrl, userName } = doc.data();
                    return {
                        id: doc.id,
                        id,
                        userImageUrl,
                        userName
                    };
                });
                setUsers(users);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
        return () => {
            // Clean-up function (if necessary)
        };
    }, []);

    // setNumColumns yeni kullanıcı eklemede kullanılacak
    const [numColumns, setNumColumns] = useState(2);

    return (
        <View style={styles.container}>
            <View style={styles.headerMain}>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerTitleText}>Kim izliyor ?</Text>
                </View>
                <TouchableOpacity style={styles.headerEdit}>
                    <Text style={styles.headerEditText}>Düzenle</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                key={numColumns}
                data={users}
                numColumns={numColumns}
                contentContainerStyle={styles.flatListContainer}
                renderItem={({ item }) => (
                    <View style={styles.personAccounts}>
                        <TouchableOpacity
                            style={styles.personAccount}
                            onPress={() => navigation.navigate('Home', { selectedUser: item })}
                        >
                            <View style={styles.personImage}>
                                <Image source={{ uri: item.userImageUrl }} style={{ width: 120, height: 120, borderRadius: 13 }} />
                            </View>
                            <View style={styles.personName}>
                                <Text style={styles.personNameText}>{item.userName}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                ListFooterComponent={() =>
                    <View style={styles.addPerson}>
                        <TouchableOpacity style={styles.personAccountAdd}>
                            <View style={styles.personİcon}>
                                <AntDesign name="plus" size={75} color="white" style={{left:20,top:20}}/>
                            </View>
                            <View style={styles.personNameAdd}>
                                <Text style={styles.personNameTextAdd}>Profil Ekle</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    headerMain: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
    },
    headerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        left: 30,
        top: 20,
    },
    headerEdit: {
        justifyContent: 'center',
        right: 15,
        top: 20,
    },
    headerTitleText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '500'
    },
    headerEditText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    },
    personNameText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10
    },
    flatListContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    personAccounts: {
        flex: 1,
        alignItems: 'flex-start',
    },
    personAccount: {
        marginBottom: 30,
        marginLeft: 30,
    },
    personNameTextAdd: {
        color: 'white'
    },
    personAccountAdd: {
        width: 120,
        height: 120,
        borderWidth: 1,
        borderColor: 'gray',
        marginLeft: 200,
        bottom: 180,
        borderRadius: 13
    },
    personNameAdd: {
        top: 50,
        alignItems: 'center'
    },
    personNameTextAdd: {
        fontSize: 16,
        color: 'white'
    }
})
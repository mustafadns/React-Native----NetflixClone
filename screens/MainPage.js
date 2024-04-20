import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function MainPage() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerItem}>
                    <View>
                        <Image source={require('../assets/logo/netflix-logo-full.png')} style={styles.logo} />
                    </View>
                    <View style={styles.headerText}>
                        <TouchableOpacity>
                            <Text style={styles.helpText}>Gizlilik</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.helpText}>Yardım</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ImageBackground
                source={require('../assets/logo/loginBgİmageNetflix.webp')}
                style={{ width: '100%', height: '100%' }}
                blurRadius={1}
            >
                <View style={styles.contentMain}>
                    <View style={styles.mainContentPadding}>
                        <View style={styles.textOne}>
                            <Text style={styles.textOneText}>Nasıl izleyebilirim ?</Text>
                        </View>
                        <View style={styles.textTwo}>
                            <Text style={styles.textTwoText}>Netflix üyesi olduktan sonra içerikleri buradan izleyebilirsiniz.</Text>
                        </View>
                        <View style={styles.textThree}>
                            <Text style={styles.textThreeText}>netflix.com/more adresine giderek bir Netflix hesabı oluşturabilir ve diğer işlemleri yapabilirsiniz</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.dictionary}
                    >
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.buttonText}>OTURUM AÇ</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        backgroundColor: 'black',
    },
    headerItem: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },
    helpText: {
        color: 'white',
        marginLeft: 10,
    },
    headerText: {
        flexDirection: 'row'
    },
    textOneText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
    },
    textTwoText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    textThreeText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    contentMain: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dictionary: {
        backgroundColor: 'red',
        position: 'relative',
        top: 140,
        width: '100%',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainContentPadding: {
        paddingHorizontal: 50,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    }
})
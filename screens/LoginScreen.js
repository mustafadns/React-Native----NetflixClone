import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React , { useContext, useState }from 'react'
import AuthContent from '../components/AuthContent'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { loginUser } from '../util/auth';
import Loading from '../components/Loading';
import { AuthContext } from '../store/auth-context';


export default function LoginScreen() {
    const navigation = useNavigation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authContext = useContext(AuthContext)

    async function loginHandler({email,password}) {
        setIsAuthenticated(true);
        try {
            const token = await loginUser(email,password);
            console.log(token);
            authContext.authenticate(token);
        } catch (error) {
            Alert.alert('Giriş Başarısız','Lütfen bilgilerinizi kontrol ediniz...')
        }
        setIsAuthenticated(false);
    }
    
    if (isAuthenticated) {
        return <Loading message="Hesaba giriş yapılıyor..." />;
    }



    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerItem}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo/netflix-logo-full.png')} style={styles.logo}/>
                </View>
                <TouchableOpacity>
                    <Text style={styles.helpText}>Yardım</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View style={styles.content}>
                <AuthContent isLogin onAuthenticate={loginHandler}/>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    }
})
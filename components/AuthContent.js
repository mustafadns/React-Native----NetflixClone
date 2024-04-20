import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React ,{ useState }from 'react'
import AuthForm from './AuthForm'

export default function AuthContent({isLogin,onAuthenticate}) {

    const [crendentialsInvalid, setCrendentialsInvalid] = useState({
        email:false,
        password:false,
    });

    function submitHandler (credentials) {
        let {email,password} = credentials;

        email=email.trim();
        password=password.trim();

        const emailIsValid = email.includes('@gmail.com');
        const passwordIsValid = password.length > 6;

        if (!emailIsValid || !passwordIsValid) {
            Alert.alert('Hops','Lütfen girdiğiniz değerleri kontrol ediniz');
            setCrendentialsInvalid({
                email:!emailIsValid,
                password:!passwordIsValid,
            })
            return;
        }
        onAuthenticate({email,password});
    }
    return (
        <View style={styles.container}>
            <AuthForm crendentialsInvalid={crendentialsInvalid} isLogin={isLogin} onsubmit={submitHandler}/>
            <TouchableOpacity
                style={styles.safePassword}
            >
                <Text style={styles.safePasswordText}>Parolayı kurtar</Text>
            </TouchableOpacity>
            <View>
                <Text style={styles.textMain}>Oturum açma işlemi, robot olmadığınızı kanıtlamak için Google reCAPTCHA ile korunuyor. Daha fazla bilgi</Text>
            </View>
        </View>
    )   
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1c1c1c',
        height: '100%',
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMain: {
        marginTop: 30,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 14,
        color: 'white',
        opacity: 0.4,
    },
    safePassword: {
        marginTop: 30,
    },
    safePasswordText: {
        fontSize: 16,
        color: 'white',
        opacity: 0.6
    }
})
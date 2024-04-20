import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Input from './Input'
import ButtonWhite from './ButtonWhite';

export default function AuthForm({ isLogin , onsubmit , crendentialsInvalid}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {
        email:emailIsInValid,
        password:passwordIsInValid,
    }=crendentialsInvalid;

    function submitHandler () {
        onsubmit ({
            email:email,
            password:password,
        });
    }

    function updateInput(inputType, enteredValue) {
        switch (inputType) {
            case 'email':
                setEmail(enteredValue);
                break;
            case 'password':
                setPassword(enteredValue);
                break;
        }
    }
    return (
        <View>
            <Input
                keyboardType='email-address'
                onUpdateValue={updateInput.bind(this, 'email')}
                value={email}
                placeholder='Eposta veya telefon numarası'
                isInValid={emailIsInValid}
            />
            <Input
                secure
                onUpdateValue={updateInput.bind(this, 'password')}
                value={password}
                placeholder='parola'
                isInValid={passwordIsInValid}
            />
            <View>
                <ButtonWhite
                    onPress={submitHandler}
                >
                    Oturum Aç
                </ButtonWhite>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})
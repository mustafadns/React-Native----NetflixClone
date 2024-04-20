import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

export default function Input({label,keyboardType,onUpdateValue,value,secure,placeholder,isInValid}) {
    return (
        <View style={styles.containerMain}>
            <TextInput 
                autoCapitalize='none'
                keyboardType={keyboardType}
                onChangeText={onUpdateValue}
                value={value}
                secureTextEntry={secure}
                placeholder={placeholder}
                placeholderTextColor={isInValid ? 'red' : 'white'}
                style={[styles.textInput,isInValid && styles.isInValid]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        width: 300,
        height: 45,
        marginBottom: 15,
        backgroundColor: '#363636',
        paddingHorizontal: 15,
        fontSize: 15,
        opacity: 0.8,
        color: 'white'
    },
    isInValid: {
        borderWidth: 1,
        borderColor: 'red',
        color: 'red',
    }
})
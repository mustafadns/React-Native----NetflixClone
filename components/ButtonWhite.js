import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ButtonWhite({ children , onPress }) {
    return (
        <TouchableOpacity 
            style={styles.button}
            onPress={onPress}
        >
            <View>
                <Text style={styles.buttonText}>{children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 300,
        height: 35,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})
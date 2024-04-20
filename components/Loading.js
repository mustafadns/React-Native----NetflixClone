import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React from 'react'

export default function Loading({message}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color='black'/>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 17,
        marginTop: 12,
    }
})
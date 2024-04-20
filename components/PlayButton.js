import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { Zocial } from '@expo/vector-icons';

export default function PlayButton() {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.buttonIcon}>
                <Zocial name="googleplay" size={24} color="black" />
            </View>
            <View style={styles.buttonTitle}>
                <Text style={styles.buttonText}>Oynat</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600'
    }
})
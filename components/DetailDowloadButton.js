import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons';

export default function DetailDowloadButton() {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.buttonIcon}>
                <Octicons name="download" size={24} color="black" />
            </View>
            <View style={styles.buttonTitle}>
                <Text style={styles.buttonText}>İndir</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#4f4f4f',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderRadius: 5,
    },
    buttonIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 140
    },
    buttonTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600'
    }
})
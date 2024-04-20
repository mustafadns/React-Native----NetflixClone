import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function ListButton() {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.buttonIcon}>
                <AntDesign name="plus" size={24} color="white" />
            </View>
            <View style={styles.buttonTitle}>
                <Text style={styles.buttonText}>Listem</Text>
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
        alignItems: 'center'
    },
    buttonTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
})
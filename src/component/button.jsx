import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Text from './text/text'

export default function Button({ title, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.primaryBtn}>
            <Text preset='h3' style={{ color: 'white' }}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    primaryBtn: {
        padding: 12,
        backgroundColor: '#F50057',
        alignItems: 'center',
        alignSelf: 'center',
        width: '50%',
        borderRadius: 8,
    },
})
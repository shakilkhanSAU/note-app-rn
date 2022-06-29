import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, secureTextEntry, onChangeText }) {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.inputStyle}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
        />
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        marginHorizontal: 10,
        marginTop: 20,
        color: 'black'
    },
})
import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, secureTextEntry, onChangeText, autoCapitalize, multiline, style }) {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.inputStyle}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
        />
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding: 10,
        fontSize: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        marginTop: 20,
        color: 'black'
    },
})
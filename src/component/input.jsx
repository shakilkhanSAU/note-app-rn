import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function Input({ placeholder, secureTextEntry, onChangeText, autoCapitalize, multiline, value, clearButtonMode }) {
    return (
        <TextInput
            placeholder={placeholder}
            style={styles.inputStyle}
            secureTextEntry={secureTextEntry}
            onChangeText={onChangeText}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            clearButtonMode={clearButtonMode}
            value={value}
        />
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        padding: 8,
        fontSize: 17,
        borderBottomWidth: 0.5,
        borderBottomColor: 'grey',
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
    },
})
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Text from './text/text'

export default function RadioInput({ value, label, setValue }) {
    const selected = value === label
    return (
        <TouchableOpacity onPress={() => { setValue(label) }} style={styles.radioBtn}>
            <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]} >
                <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
            </View>
            <Text style={{ fontWeight: 'bold' }}>   {label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    accountToggleer: {
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: 'center'
    },
    outerCircle: {
        width: 22,
        height: 22,
        borderColor: '#D0CFD6',
        borderWidth: 0.8,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderColor: '#D0CFD6',
        borderWidth: 1,
        borderRadius: 7,
        alignSelf: 'center'
    },
    radioBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12
    },
    selectedInnerCircle: {
        borderColor: 'orange',
        backgroundColor: 'orange',
        width: 14,
        height: 14,

    },
    selectedOuterCircle: {
        borderColor: 'orange',
    },

});
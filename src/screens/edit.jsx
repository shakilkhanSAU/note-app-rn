import { View, Text, Image, StyleSheet, Platform, StatusBar } from 'react-native'
import React from 'react'

export default function Edit() {
    return (
        <View style={styles.safeAreaView}>
            <StatusBar backgroundColor="#F50057"
                barStyle="dark-content"></StatusBar>
            <Image style={styles.signinImage} source={require('../image/signin-background.png')} />
        </View>
    )
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddintTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    signinImage: {
        width: '100%',
        resizeMode: 'contain'
    }
});
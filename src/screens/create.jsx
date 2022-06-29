import { View, Text } from 'react-native'
import React from 'react'

export default function Create() {
    return (
        <View style={styles.safeAreaView}>
            <StatusBar backgroundColor="#F50057"
                barStyle="dark-content"></StatusBar>
            <Image style={styles.signinImage} source={require('../image/signin-background.png')} />
        </View>
    )
}
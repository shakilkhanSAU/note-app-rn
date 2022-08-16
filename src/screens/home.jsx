import { View, Text, StyleSheet, StatusBar, Platform, Image } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function Home({ navigation, route, user }) {


    // navigate to create page
    const navigateToCreate = () => {
        navigation.navigate('Create')
    }

    return (
        <View style={styles.safeAreaView}>
            <StatusBar backgroundColor="#F50057" barStyle="light" />
            <View style={styles.myNote}>
                <Text>My Notes</Text>
                <AntDesign onPress={navigateToCreate} name="pluscircleo" size={24} color="black" />
            </View>

        </View >
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
        width: '30%',
        resizeMode: 'contain'
    },
    myNote: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20
    }
});

import { View, StyleSheet, StatusBar, Platform, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../App';
import { FlatList } from 'react-native';
import Text from '../component/text/text';
import HomeNote from '../image/svg/HomeNote';


export default function Home({ navigation, route, user }) {

    const [notes, setNotes] = useState([]);
    console.log(notes)
    // navigate to create page
    const navigateToCreate = () => {
        navigation.navigate('Create')
    }

    const createUpdate = () => {
        navigation.navigate('Edit', {
            item: item
        })
    }

    // user note listner
    useEffect(() => {
        // create a query
        const q = query(collection(db, 'notes'), where('uid', '==', user.uid))

        // create a query lishter subscription
        const queryListnerSubscription = onSnapshot(q, (querySnapshot) => {
            const list = []
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });

            });
            setNotes(list)
        });

        // returning sub
        return queryListnerSubscription
    }, []);

    // render item
    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: item.color, padding: 20, margin: 12, borderRadius: 12 }}>
                <Pressable onPress={() => {
                    navigation.navigate('Edit', {
                        item: item
                    })
                }} style={{ flex: 5 }}>
                    <Text preset='h4' style={{ fontWeight: 'bold', color: "white", marginBottom: 4 }}>{item.title}</Text>
                    <Text>{item.description.slice(0, 100)}</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        deleteDoc(doc(db, "notes", item.id));
                    }}
                    style={{ padding: 5, flex: .4, zIndex: 4 }}

                >
                    <MaterialIcons name="delete" size={24} color="black" />
                </Pressable>
            </View>
        )
    }

    return (
        <View style={styles.safeAreaView}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <View style={styles.myNote}>
                <Text style={{ color: 'black' }} preset='h3'>My Notes</Text>
                <AntDesign onPress={navigateToCreate} name="pluscircleo" size={24} color="#F50057" />
            </View>

            {
                notes.length ?
                    <FlatList
                        data={notes}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()} //Add this line for duplicate key error
                        contentContainerStyle={{}}
                    />
                    :
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <View style={styles.backgroundImage}>
                            <HomeNote />
                        </View>
                        <Text preset='h3'>Create a New Note</Text>
                    </View>
            }
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
    },
    noteContainer: {
        padding: 20,
        marginBottom: 20,
    },
    backgroundImage: {
        height: '70%',
        width: '80%',
        marginLeft: 35
    },

});

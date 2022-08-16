import { View, StyleSheet, StatusBar, Platform, ActivityIndicator, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Input from '../component/input'
import Text from '../component/text/text'
import RadioInput from '../component/RadioInput'
import Button from '../component/button'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../App'
import { showMessage } from 'react-native-flash-message'

const noteColorOptions = ['red', 'green', 'grey', 'violet']


export default function Create({ user, navigation, route }) {
    const { item } = route.params
    console.log("item------>", item.title)
    const [title, setTile] = useState(item.title)
    const [description, setDescription] = useState(item.description)
    const [noteColor, setNoteColor] = useState('#526AF5')
    const [loading, setLoading] = useState(false)

    const onpressUpdate = async () => {
        try {
            setLoading(true)
            //update doc here
            const docRef = doc(db, 'notes', item.id)
            await updateDoc(docRef, {
                title: title,
                description: description,
                color: noteColor
            })
            setLoading(false)
            navigation.navigate("Home")
            showMessage({
                message: "Great Job! Successfully updated note!",
                type: "success",
            });
        }
        catch (error) {
            setLoading(true)
            showMessage({
                message: "Oops!",
                type: "danger",
                description: error.message,
            });
            setLoading(false)
        }
    }

    return (
        <View style={styles.safeAreaView}>
            <StatusBar backgroundColor="white" barStyle="dark-content" />
            <Text style={styles.createTitle} preset='h3'>Update Your Note</Text>
            <ScrollView>
                <View style={styles.createNote}>
                    <Image style={styles.image} source={require('../image/car.png')} />

                    <Input
                        placeholder='Note Title'
                        onChangeText={(text) => { setTile(text) }}
                        clearButtonMode='always'
                        value={title}
                    />
                    <Input
                        placeholder='Description'
                        onChangeText={(text) => { setDescription(text) }}
                        multiline={true}
                        value={description}
                    />
                    <View style={{ marginBottom: 50 }}>
                        <Text preset='h4' style={{ fontWeight: 'bold', marginBottom: 20, marginTop: 34 }}>Select Note Color</Text>
                        {
                            noteColorOptions.map((option, index) => {
                                return (
                                    <RadioInput
                                        key={index}
                                        label={option}
                                        value={noteColor}
                                        setValue={setNoteColor}
                                    ></RadioInput>
                                )
                            })
                        }
                    </View>
                    {
                        loading ? <ActivityIndicator size='large'></ActivityIndicator> :
                            <Button
                                onPress={onpressUpdate}
                                title='Update Note'
                            />
                    }
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        paddintTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingLeft: 20
    },
    createNote: {
        paddingTop: 0,
        marginRight: 10
    },
    createTitle: {
        paddingTop: 20,
    },

    accountToggleer: {
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: 'center'
    },
    outerCircle: {
        width: 24,
        height: 24,
        borderColor: '#D8D6D4',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 14,
        height: 14,
        borderColor: '#D8D6D4',
        borderWidth: 1,
        borderRadius: 7,
        alignSelf: 'center'
    },
    radioBtn: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },
    selectedInnerCircle: {
        borderColor: 'orange',
        backgroundColor: 'orange'

    },
    selectedOuterCircle: {
        borderColor: 'orange',
    },
    image: {
        height: 200,
        width: '100%',
        margin: -9,
        marginTop: 15,
        zIndex: -1,
        padding: 10
    }
})
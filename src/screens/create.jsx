import { View, StyleSheet, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import Input from '../component/input'
import Text from '../component/text/text'
import RadioInput from '../component/RadioInput'
import Button from '../component/button'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../App'

const noteColorOptions = ['red', 'green', 'yellow']


export default function Create({ user }) {
    const [title, setTile] = useState('')
    const [description, setDescription] = useState('')
    const [noteColor, setNoteColor] = useState('#526AF5')

    const onpressCreate = async () => {
        const docRef = await addDoc(collection(db, 'notes'), {
            title: title,
            description: description,
            color: noteColor,
            uid: user.uid,
            email: user.email
        })
        console.log(docRef)
    }

    return (
        <View style={styles.safeAreaView}>
            <StatusBar backgroundColor="#F50057" barStyle="dark-content" />
            <Text style={styles.createTitle} preset='h3'>Create Note</Text>
            <View style={styles.createNote}>
                <Input
                    placeholder='Note Title'
                    onChangeText={(text) => { setTile(text) }}
                />
                <Input
                    placeholder='Description'
                    onChangeText={(text) => { setDescription(text) }}
                    secureTextEntry
                    multiline={true}
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
                <Button
                    onPress={onpressCreate}
                    title='Submit'
                />
            </View>
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
        paddingTop: 0
    },
    createTitle: {
        paddingTop: 30,
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

})
import { View, StatusBar, StyleSheet, Image, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Text from '../component/text/text';
import Button from '../component/button';
import Input from '../component/input';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";


export default function Signup({ navigation }) {
    const [gender, setGender] = useState(null)
    const genderOptions = ['Male', 'Female'];
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false)

    // email password authentication
    const auth = getAuth();
    const db = getFirestore();
    // handle sign up function
    const handleSignup = async () => {
        try {
            setLoading(true)
            // 1. create user with email and password
            const result = await createUserWithEmailAndPassword(auth, email, password)
            console.log('result----------------- >', result)

            // 2. update the user data to the database 
            await addDoc(collection(db, "users"), {
                name: name,
                age: age,
                email: email,
                gender: gender,
                uid: result.user.uid
            });
            setLoading(false)
            showMessage({
                message: "Simple message",
                type: "success",
                description: "User created successfully!",
            });
        }
        catch (error) {
            setLoading(false)
            showMessage({
                message: "Error",
                type: "danger",
                description: error.message,
            });

        }
        // 3. navigate the user to the home screen

    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#fff"
                barStyle="dark-content" />
            <ScrollView>
                <View style={{
                    flex: 1,
                    marginTop: 40,
                    paddingHorizontal: 30
                }}>
                    <Text preset='h3' style={{ textAlign: 'center' }} >Create a New Account</Text>
                    <Input
                        placeholder='Your Name'
                        onChangeText={(text) => { setName(text) }}
                        autoCapitalize={'words'}
                    />
                    <Input
                        placeholder='Your Email'
                        onChangeText={(text) => { setEmail(text) }}
                        autoCapitalize={'none'}
                    />
                    <Input
                        placeholder='Your Age'
                        onChangeText={(text) => { setAge(text) }}
                    />
                    <Input
                        placeholder='Your Password'
                        onChangeText={(text) => { setPassword(text) }}
                        secureTextEntry
                    />
                    <Input
                        placeholder='Re-type your Password'
                        secureTextEntry
                    />
                </View>

                <View style={{
                    flex: 1,
                    marginTop: 30,
                    paddingHorizontal: 38
                }}>
                    <Text preset='h4' style={{ marginBottom: 15 }}>Select Gender</Text>
                    {
                        genderOptions.map((option) => {
                            const selected = gender === option
                            return (
                                <Pressable onPress={() => { setGender(option) }} key={option} style={styles.radioBtn}>
                                    <View style={[styles.outerCircle, selected && styles.selectedOuterCircle]} >
                                        <View style={[styles.innerCircle, selected && styles.selectedInnerCircle]} />
                                    </View>
                                    <Text>   {option}</Text>
                                </Pressable>
                            )
                        })
                    }
                </View>

                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginTop: 20
                }}>

                    {
                        loading ? <ActivityIndicator size='large'></ActivityIndicator> :
                            <Button
                                title="Submit"
                                onPress={handleSignup}
                            />
                    }
                    <Pressable
                        style={styles.accountToggleer}
                        onPress={() => { navigation.navigate("Signin") }}
                    ><Text>Already Have an Account? </Text><Text preset='h4' style={{ color: 'crimson' }}>  Signin</Text></Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100,
        height: 40,
    },
    accountToggleer: {
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: 'center'
    },
    outerCircle: {
        width: 24,
        height: 24,
        borderColor: '#f3f3f3',
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerCircle: {
        width: 14,
        height: 14,
        borderColor: '#f3f3f3',
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
        backgroundColor: 'orange'

    },
    selectedOuterCircle: {
        borderColor: 'orange',
    },

});

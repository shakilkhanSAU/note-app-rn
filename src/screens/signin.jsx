import { View, StatusBar, StyleSheet, Image, SafeAreaView, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Text from '../component/text/text';
import Input from '../component/input';
import Button from '../component/button';

export default function Signin({ navigation }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>

            <StatusBar backgroundColor="#fff"
                barStyle="dark-content" />

            <ScrollView>
                <View style={{
                    flex: 1,
                    marginTop: 40,
                    paddingHorizontal: 20
                }}>
                    <Image style={styles.image} source={require('../image/signin-background.png')} />
                    <Text preset='h3' style={{ textAlign: 'center', paddingBottom: 25 }} >Never Forget Your Notes</Text>
                    <Input
                        placeholder='Your Email'
                    />
                    <Input
                        placeholder='Your Name'
                        secureTextEntry
                    />
                </View>

                <View style={{
                    flex: 1,
                    marginTop: 40
                }}>

                </View>

                <View style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginTop: 20

                }}>
                    <Button
                        title="Signin"
                    />
                    <Pressable
                        style={styles.accountToggleer}
                        onPress={() => { navigation.navigate("Signup") }}
                    ><Text>Don't Have an Account? </Text><Text preset='h4' style={{ color: 'crimson' }}>  SignUp</Text></Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '80%',
        height: 250,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    accountToggleer: {
        flexDirection: 'row',
        marginTop: 30,
        alignSelf: 'center'
    }

});
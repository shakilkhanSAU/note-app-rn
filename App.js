import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import Create from './src/screens/create';
import Edit from './src/screens/edit';
import { useFonts } from 'expo-font';
import Text from './src/component/text/text';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import FlashMessage from "react-native-flash-message";
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { getFirestore } from 'firebase/firestore';

const Stack = createNativeStackNavigator();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCAAoupnyL18v8nWjXhtBjfPYuvrT_A_Es",
    authDomain: "note-app-rn-20b02.firebaseapp.com",
    projectId: "note-app-rn-20b02",
    storageBucket: "note-app-rn-20b02.appspot.com",
    messagingSenderId: "47844027678",
    appId: "1:47844027678:web:234bc2385720f7e835ed0f"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore();

// customize theme color
const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    },
}


export default function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // custom font loader
    const [loaded] = useFonts({
        nunitoRegular: require('./assets/font/Nunito-Regular.ttf'),
        nunitoMedium: require('./assets/font/Nunito-Medium.ttf'),
        nunitoBold: require('./assets/font/Nunito-Bold.ttf'),
        nunitoVariable: require('./assets/font/Nunito-VariableFont_wght.ttf')
    });

    // dammy useeffect
    // useEffect(() => {
    //     signOut(auth)
    // })

    // user observer 
    useEffect(() => {
        const authSubscription = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(false)
            }
        })

        return authSubscription;
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <ActivityIndicator size="large" />
                </View>
            </View>
        )
    }

    if (!loaded) {
        return <Text>loading font ...</Text>;
    }
    return (
        <NavigationContainer theme={myTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {
                    user ?
                        <>
                            <Stack.Screen name="Home">
                                {(props) => <Home {...props} user={user} />}
                            </Stack.Screen>
                            <Stack.Screen name="Create">
                                {(props) => <Create {...props} user={user} />}
                            </Stack.Screen>
                            <Stack.Screen name="Edit" component={Edit} />
                        </>
                        :
                        <>
                            <Stack.Screen name="Signin" component={Signin} />
                            <Stack.Screen name="Signup" component={Signup} />
                        </>
                }
            </Stack.Navigator>
            <FlashMessage position="top" />
        </NavigationContainer>
    );
}


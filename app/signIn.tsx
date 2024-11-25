import { router, Link } from "expo-router";
import { Text, TextInput, View, Pressable, Image, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useSession } from "@/context";
import styles from "@/styles/signin-style";

export default function SignIn(){
    const [email, setEmail] = useState("")
        , [password, setPassword] = useState("")
        , [errorMessage, setErrorMessage] = useState("")
        , [loading, setLoading] = useState(false)
        , { signIn } = useSession()

    const handleLogin = async () => {
        setLoading(true)
        const res = await signIn(email, password);

        if(!email || !password){
            setErrorMessage("Please fill in all fields.")
            setLoading(false);
            return;
        }

        if (typeof res === 'string') {
            setErrorMessage(res); 
            setLoading(false);
            return
        } else {
            router.replace("/(app)");
        }
    };

    return(
        <View style={styles.backgroundPurple}>
            <View style={styles.container}>
                <Image
                    source={require("../assets/images/house.jpeg")}
                    style={styles.img}
                />
                <View style={styles.card}>
                    <TextInput
                        style={[styles.input, {marginBottom: 20}]}
                        autoCapitalize="none"
                        placeholder="Email"
                        value={email}
                        onChangeText={(val) => {
                        setEmail(val);
                        }}
                    />
                    <TextInput
                        style={[styles.input, {marginBottom: 20}]}
                        autoCapitalize="none"
                        placeholder="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(val) => {
                        setPassword(val);
                        }}
                    />
                    {errorMessage &&
                        <Text style={{color:'red', marginBottom: 20}}>{errorMessage}</Text>
                    }
                    <Pressable style={[styles.button, {marginBottom: 20}] }  onPress={handleLogin}>
                        {
                            loading?
                            <ActivityIndicator color='#000'/>
                            :
                            <Text style={styles.button_text}>Submit</Text>
                        }
                    </Pressable >
                    <Link href="/signUp" asChild> 
                        <Pressable  style={styles.button } >
                            <Text style={styles.button_text}>Sign Up</Text>
                        </Pressable >
                    </Link>
                </View>
            </View>
        </View>
    )
}
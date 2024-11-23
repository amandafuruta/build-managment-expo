import { router, Link } from "expo-router";
import { Text, TextInput, View, Pressable, Image } from "react-native";
import { useState } from "react";
import { useSession } from "@/context";
import styles from "@/styles/signin-style";

export default function SignIn(){
    const [email, setEmail] = useState("")
        , [password, setPassword] = useState("")
        , { signIn } = useSession()

    const handleLogin = async () => {
        try {
            return await signIn(email, password);
        } catch (err) {
            console.log("[handleLogin] ==>", err);
            return null;
        }
    };

    const handleSignInPress = async () => {
        const resp = await handleLogin();
        router.replace("/(app)");
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
                    <Pressable style={[styles.button, {marginBottom: 20}] }  onPress={handleSignInPress}>
                        <Text style={styles.button_text}>Submit</Text>
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
import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { router, Link } from "expo-router";
import { useSession } from "@/context";
import styles from "@/styles/signup-style";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = useState("")
      , [bio, setBio] = useState("")
      , [email, setEmail] = useState("")
      , [password, setPassword] = useState("")
      , [confirmPassword, setConfirmPassword] = useState("")
      , [errorMessage, setErrorMessage] = useState("")
      , { signUp } = useSession()

  const handleRegister = async () => {
    const usersRef = collection(getFirestore(), "users");

    if(password === confirmPassword) {
      try {
        await signUp(name, email, password ).then((res)=> {
          const user = {
            id: res?.uid || '',
            name: name,
            bio: bio,
            email: res?.email || '',
          
          };

          setDoc(doc(usersRef, user.email), user)
        });
        router.replace("/signIn");
      } catch (err) {
        console.log("[handleRegister] ==>", err);
        return null;
      }
    }
  };

  const handleSignUpPress = async () => {
    await handleRegister();
  };

  return (
    <View style={styles.backgroundBlue}>
      <View style={styles.container}>
        <Text 
        style={{
          color: 'white', 
          fontSize: 35, 
          fontWeight: 'bold', 
          marginBottom:20}}>
          Register
        </Text>
        <View style={styles.card}>            
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="Name"
              value={name}
              onChangeText={(val) => {
                setName(val);
              }}
            />
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="Bio"
              value={bio}
              onChangeText={(val) => {
                setBio(val);
              }}
            />
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="E-Mail"
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
            <TextInput
              style={[styles.input, {marginBottom: 20}]}
              autoCapitalize="none"
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
              }}
            />
            <Pressable 
            onPress={handleSignUpPress} 
            style={[styles.button, { marginTop: 20}] } >
              <Text style={styles.button_text} >
                Sign Up
              </Text>
            </Pressable>
            <Text >{errorMessage}</Text>
            <Link href="/signIn" style={{width:'100%'}}>            
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width:'100%'
                }}>
                <Text style={{fontSize:15, marginBottom:8}}>
                  Already registered?
                </Text>                 
                  <Text style={[styles.button_text, {color:'#000'}]} >
                    Sign in
                  </Text>                 
              </View>
            </Link>            
          </View>
      </View>
    </View>
  );
};

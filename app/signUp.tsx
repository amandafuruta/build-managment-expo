import { View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { router, Link } from "expo-router";
import { useSession } from "@/context";
import styles from "@/styles/signup-style";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";
import Feather from '@expo/vector-icons/Feather';

export default function Register() {
  const [name, setName] = useState("")
      , [bio, setBio] = useState("")
      , [email, setEmail] = useState("")
      , [password, setPassword] = useState("")
      , [confirmPassword, setConfirmPassword] = useState("")
      , [showPassword, setShowPassword] = useState(false)
      , [showConfirmPassword, setShowConfirmPassword] = useState(false)
      , [errorMessage, setErrorMessage] = useState("")
      , [loading, setLoading] = useState(false)
      , { signUp } = useSession()

  const handleRegister = async () => {
    setLoading(true); 

    try{
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setLoading(false);
        return;
      }

      if (!name || !email || !password || !confirmPassword) {
        setErrorMessage("Please fill in all fields.");
        setLoading(false);
        return;
      }
      const res = await signUp(name, email, password);   
      if (res && typeof res !== 'string') {
        const user = {
          id: res?.uid || '',
          name: name,
          bio: bio,
          email: res?.email || '',          
        }
        const usersRef = collection(getFirestore(), "users");
        await setDoc(doc(usersRef, user.id), user);
        router.replace("/signIn");
      } else if (typeof res === 'string') {
        setErrorMessage(res); 
        setLoading(false);
        return
      }
    }
    catch(err){
      setLoading(false);
      setErrorMessage("An unexpected error occurred. Please try again.")
    }
  };

  return (
    <View style={styles.backgroundBlue}>
      <View style={styles.container}>
        <Text 
        style={styles.register_text}>
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
          <View style={[styles.input, {marginBottom: 20}]}>
            <TextInput
              style={styles.password_input}
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(val) => {
                setPassword(val);
              }}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              {
                showPassword?
                <Feather name="eye-off" size={20} color="black" />
                :
                <Feather name="eye" size={20} color="black" />
              }
            </Pressable>
          </View>        
          <View style={[styles.input, {marginBottom: 20}]}>
            <TextInput
              style={styles.password_input}
              autoCapitalize="none"
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={(val) => {
                setConfirmPassword(val);
              }}
            />
            <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              {
                showConfirmPassword?
                <Feather name="eye-off" size={20} color="black" />
                :
                <Feather name="eye" size={20} color="black" />
              }
            </Pressable>
          </View>
          {errorMessage &&
          <View>
            <Text style={{color:'red'}}>{errorMessage}</Text>
          </View>
          }
          <Pressable 
          onPress={handleRegister} 
          style={[styles.button, { marginTop: 20}] } >
            {loading ?
            <ActivityIndicator color='#000'/>
            :
            <Text style={styles.button_text} >
              Sign Up
            </Text>
            }
          </Pressable>
          <Link href="/signIn" style={{width:'100%'}}>            
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width:'100%'
              }}>
              <Text style={{fontSize:15}}>
                Already registered?
              </Text>                 
                <Text style={[styles.button_text, {color:'#000', fontWeight:'bold'}]} >
                  Sign in
                </Text>                 
            </View>
          </Link>            
        </View>
      </View>
    </View>
  );
};

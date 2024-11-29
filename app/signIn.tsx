import { router, Link } from "expo-router";
import { Text, TextInput, View, Pressable, Image, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { useEffect, useState } from "react";
import { useSession } from "@/context";
import styles from "@/styles/signin-style";
import { ScrollView } from "react-native-gesture-handler";

export default function SignIn(){
  const [email, setEmail] = useState("")
      , [password, setPassword] = useState("")
      , [errorMessage, setErrorMessage] = useState("")
      , [loading, setLoading] = useState(false)
      , { signIn } = useSession()
      , [keyboard, setKeyboard] = useState(Boolean)

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
  
      // Cleanup listeners when the component unmounts
      return () => {
        keyboardDidShowListener.remove();  
        keyboardDidHideListener.remove();  
      };
    }, []);

  const _keyboardDidShow = () => {
    setKeyboard(true);
  };

  const _keyboardDidHide = () => {
    setKeyboard(false);
  };

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
    <View style={styles.body}>
      <View style={styles.img_box}>
        <Image
          source={require("../assets/images/house.jpeg")}
          style={keyboard? styles.img_keyboard: styles.img}
        />
      </View>
      <View style={styles.card}>
        <ScrollView style={{paddingTop: 50}}>
          <View style={styles.alignment}>
            <Text style={{
              color: '#417abb', 
              fontSize: 30,
              marginVertical: 20
            }}>
              Welcome!
            </Text>
            <TextInput
              style={[styles.input]}
              autoCapitalize="none"
              placeholder="Email"
              value={email}
              onChangeText={(val) => {
              setEmail(val);
              }}
            />
            <TextInput
              style={[styles.input]}
              autoCapitalize="none"
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => {
              setPassword(val);
              }}
            />
          </View>        
          {errorMessage &&
            <Text style={{color:'red', marginBottom: 20}}>
              {errorMessage}
            </Text>
          }
          <View style={styles.alignment}>
            <Pressable style={styles.button}  onPress={handleLogin}>
              {
                loading?
                <ActivityIndicator color='#fff'/>
                :
                <Text style={styles.button_text}>Submit</Text>
              }
            </Pressable >
          </View>
          <View style={[styles.alignment, {paddingBottom: keyboard? 100 : 0}]}>
            <Text style={{fontSize: 15}}>
              Don't have an account?
            </Text>
            <Link href="/signUp" asChild> 
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Sign Up
              </Text>
            </Link>
        </View>
        </ScrollView>
      </View>
    </View>
  )
}
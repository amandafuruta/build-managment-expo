import { useSession } from "@/context";
import { Alert, Pressable, ScrollView, Text, TextInput, View, ActivityIndicator, Image } from 'react-native';
import styles from '@/styles/profile-style';
import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/lib/firebase-config";

export default function Profile(){
  const { user } = useSession()
      , [loading, setLoading] = useState(true)
      , [name, setName] = useState('')
      , [bio, setBio] = useState('')
      , [spinner, setSpinner] = useState(false)

  useEffect(() => {
    if (user?.email) {
      const fetchUserData = async () => {
        try {
          const usersRef = collection(db, 'users')
              , userQuery = query(usersRef, where('email', '==', user.email))
              , querySnapshot = await getDocs(userQuery)

          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].data()
            setName(data.name)
            setBio(data.bio)
            setLoading(false)
          } else {
            console.log('No user found with this email')
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
        }
      };

      fetchUserData(); 
    }
  }, [user?.email]);

  const editProfile = async(name: string, bio:string) => {
    const userDoc = doc(db, 'users', user?.email as string)

    await updateDoc(userDoc, {
        name: name,
        bio: bio,
    });

    setSpinner(false)
    Alert.alert(
      "Updated!",
      "",
      [ { text: "OK"} ]
    );
  }

  if(loading){
    return(
      <>
      <View style={styles.header}>
        <Text style={styles.title}>
          User Information
        </Text>
      </View>
      <View style={styles.content}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:"100%"}}>
          <ActivityIndicator size="large" color="#417abb"/>
        </View>
      </View>
      </>
    )
  }

  return(
    <ScrollView style={{flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.header}>
          <Text style={styles.title}>
            User Information
          </Text>
      </View>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/profile.png")}
          style={styles.img}
        />
        <Pressable>
          <Text style={{fontWeight: "bold"}}>Change photo</Text>
        </Pressable>
        <View style={styles.card}>
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>
              Name: 
            </Text>
            <TextInput 
              value={name}
              placeholder={name}
              onChangeText={setName}
              style={styles.input}
            />
        </View>
        <View style={styles.details}>
          <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>
            Bio: 
          </Text>
            <TextInput 
            value={bio}
            placeholder= {bio}
            onChangeText={setBio}
            style={styles.input}
          /> 
        </View>
        <View style={styles.buttons}>
          <Pressable
            style={styles.btn} 
            onPress={() => [editProfile (name, bio), setSpinner(true)]}>
              {spinner?
                <View style={{paddingVertical: 3}}>
                  <ActivityIndicator color='#fff'/>
                </View>
                :
                <Text style={styles.btn_text}>
                  Update
                </Text>
              }
          </Pressable>
        </View>
        </View>
      </View>
    </ScrollView>
  )
}
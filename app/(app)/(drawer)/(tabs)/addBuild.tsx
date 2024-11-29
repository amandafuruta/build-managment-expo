import { db } from '@/lib/firebase-config';
import styles from '@/styles/addBuild-style';
import { LinearGradient } from 'expo-linear-gradient';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View, ActivityIndicator, StatusBar } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function AddBuild(){
  const [name, setName] = useState("")
      , [tyology, setTypology] = useState("")
      , [address, setAddress] = useState("")
      , [start, setStart] = useState("")
      , [end, setEnd] = useState("")
      , [spinner, setSpinner] = useState(false)
      , housesCollection = collection(db, 'houses')

  const addTask = async() => {
    await addDoc(housesCollection, {
        nome: name,
        tipologia: tyology,
        address: address,
        start: start,
        end: end, 
    });

    setName('')
    setTypology('')
    setAddress('')
    setStart('')
    setEnd('')
    setSpinner(false)

    Alert.alert(
      "Saved!",
      "",
      [ { text: "OK" } ]
    ) 
  }

  return(
    <ScrollView style={{flex: 1, backgroundColor: "#fff"}}>
      <StatusBar
        barStyle="light-content"  // 'light-content' for light text, 'dark-content' for dark text
        backgroundColor="#417abb"
      />
      <View style={styles.box_title}>
        <View style={styles.subtitle_box}>
          <Text style={styles.subtitle_text}>
            Add build
          </Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>            
          <View style={styles.details}>
            <Text style={styles.label}>
              Name:
            </Text>
            <TextInput
              value={name}
              placeholder='Build name'
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.label}>
              Typology:
            </Text>
            <TextInput
              value={tyology}
              placeholder='Tipologia'
              onChangeText={setTypology}
              style={styles.input}
            />
          </View>
            <View style={styles.details}>
              <Text style={styles.label}>
                Address:
              </Text>
              <TextInput
                value={address}
                placeholder='Endereço'
                onChangeText={setAddress}
                style={styles.input}
              />
            </View>
            <View style={styles.details}>
              <Text  style={styles.label}>
                Start:
              </Text>
              <TextInputMask
                type={'datetime'}
                style={styles.input}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={start}
                onChangeText={setStart}
                placeholder='DD/MM/YYYY'
              />                
            </View>
            <View style={styles.details}>
              <Text style={styles.label}>
                End:
              </Text>
              <TextInputMask
                type={'datetime'}
                style={styles.input}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={end}
                onChangeText={setEnd}
                placeholder='DD/MM/YYYY'
              />
            </View>
            <View style={styles.buttons}>            
              <Pressable
                style={styles.btn}
                onPress={() => {addTask(), setSpinner(true)}} >
                {
                  spinner?
                  <ActivityIndicator/>
                  :
                  <Text style={styles.btn_text}>
                    Save
                  </Text>
                }
              </Pressable>
            </View>
        </View>
      </View>            
    </ScrollView>
  )
}
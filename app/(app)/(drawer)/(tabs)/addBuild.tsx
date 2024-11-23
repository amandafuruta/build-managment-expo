import { db } from '@/lib/firebase-config';
import styles from '@/styles/addBuild-style';
import { LinearGradient } from 'expo-linear-gradient';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function AddBuild(){
  const [name, setName] = useState("")
      , [tipologia, setTipologia] = useState("")
      , [address, setAddress] = useState("")
      , [start, setStart] = useState("")
      , [end, setEnd] = useState("")
      , [spinner, setSpinner] = useState(false)
      , housesCollection = collection(db, 'houses')

  const addTask = async() => {
    await addDoc(housesCollection, {
        nome: name,
        tipologia: tipologia,
        address: address,
        start: start,
        end: end, 
    });

    setSpinner(false)
    AlertaBox()
  }

  const AlertaBox = () =>
      Alert.alert(
      "Saved!",
      "",
      [ { text: "OK" } ]
  );

  return(
    <ScrollView style={{flex: 1, backgroundColor: "#ebebeb"}}>
      <View style={styles.box_title}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        />
        <Text style={styles.title}>Add build</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>            
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Name:</Text>
            <TextInput
              value={name}
              placeholder='Build name'
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Tipologia:</Text>
            <TextInput
              value={tipologia}
              placeholder='Tipologia'
              onChangeText={setTipologia}
              style={styles.input}
            />
          </View>
            <View style={styles.details}>
              <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Address:</Text>
              <TextInput
                value={address}
                placeholder='Endereço'
                onChangeText={setAddress}
                style={styles.input}
              />
            </View>
            <View style={styles.details}>
              <Text 
              style={{
                fontWeight:'500', 
                fontSize: 18, 
                marginRight: 10}}
              >
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
              <Text 
              style={{
                fontWeight:'500', 
                fontSize: 18, 
                marginRight: 10}}
              >
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
                onPress={() => {addTask(), setSpinner(true)}}
              >
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
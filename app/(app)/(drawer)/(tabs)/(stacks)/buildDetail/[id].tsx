import { db } from '@/lib/firebase-config';
import styles from '@/styles/buildDetail-style';
import { AntDesign } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Alert, TextInput,  } from 'react-native';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()
      , [loading, setLoading] = useState(true)
      , [activityIndicator, setActivityIndicator] = useState(false)
      , housesCollection = collection(db, 'houses')
      , router = useRouter()
      , [name, setName] = useState('')
      , [typology, setTypology] = useState('')
      , [address, setAddress] = useState('')
      , [start, setStart] = useState('')
      , [end, setEnd] = useState('')

  useEffect(()=> {
    const gethouses =  async() => {
      const querySnapshot = await getDocs(housesCollection);
      querySnapshot.forEach((doc) => {
        const data = doc.data(); 
        if (doc.id === id) { 
          setName(data.nome)
          setTypology(data.tipologia)
          setAddress(data.address)
          setStart(data.start)
          setEnd(data.end)
        }
      });
      setLoading(false)
    }
    gethouses() 
  }, [])

  const deleteBuild = async(id:string) => {
    const build = doc(db, 'houses', id)
    await deleteDoc(build)
    deletedAlert()
  }

  const confirmDeleteAlert = (id:string) =>
    Alert.alert(
      "Alert Mesage!",
      "Are you sure you want to delete?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      { text: "OK", onPress: () => deleteBuild(id) }
    ]
  );

  function deletedAlert(){
    Alert.alert(
      "Deleted!",
      "",
      [ { text: "OK"} ]
    );
  }

  const editBuildDetails = async(
    name: string, 
    tipologia: string, 
    address: string, 
    start: string, 
    end: string, 
    id: string) =>{
    setActivityIndicator(true)
    const build = doc(db, 'houses', id)

    await updateDoc(build, {
        nome: name,
        tipologia: tipologia,
        address: address,
        start: start,
        end: end, 
    });
    
    setActivityIndicator(false)
    editAlert()

  }

  function editAlert(){
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
        <Pressable onPress={()=> router.back()}>  
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>BUILD DETAILS</Text>
      </View>
      <View style={styles.content}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:"100%"}}>
          <ActivityIndicator size="large" color="#710096"/>
        </View>
      </View>
      </>
    )
  }

  return (
    <ScrollView>             
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Build Details</Text>
      </View>
      <View style={styles.content}>
        <View style={{display:'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Pressable onPress={() => confirmDeleteAlert(id as string)}>
            <Text style={styles.edit_text}>Delete</Text>
          </Pressable>          
        </View>
        <View style={styles.card}>          
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Name:</Text>
              <TextInput 
                value={name}
                placeholder={name}
                onChangeText={setName}
                style={styles.input}
              />
          </View>
          <View style={styles.details}>
            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>Typology:</Text>
            <TextInput 
              value={typology}
              placeholder={typology}
              onChangeText={setTypology}
              style={styles.input}
            />
          </View>
          <View style={styles.details}>
            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>Address:</Text>
            <TextInput 
              value={address}
              placeholder={address}
              onChangeText={setAddress}
              style={styles.input}
            />
          </View>
          <View style={styles.details}>
            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>Start:</Text>
            <TextInput 
              value={start}
              placeholder={start}
              onChangeText={setStart}
              style={styles.input}
            />
          </View>
          <View style={styles.details}>
            <Text style={{fontWeight:'bold', fontSize: 18, marginRight: 10}}>End:</Text>
            <TextInput 
              value={end}
              placeholder={end}
              onChangeText={setEnd}
              style={styles.input}
            />
          </View>
          <View style={{display: 'flex', alignItems: 'center'}}>            
            <Pressable
              style={styles.btn}
              onPress={() => editBuildDetails(name, typology, address, start, end, id as string)} >
              {
              activityIndicator?
                <View style={{paddingVertical: 3}}>
                  <ActivityIndicator color='#fff'/>
                </View>
              :
              <Text style={styles.btn_text}>Save</Text>
              }
            </Pressable>
          </View>
        </View> 
          <View
          style={styles.total}>
          <Link href='/(app)/(drawer)/(tabs)/(stacks)/expensesDetail'>
            <Text style={{color:"#6d0091", fontWeight:'bold', fontSize:18}}>Despesas</Text>
            <AntDesign name="arrowright" size={24} color="#710096" />
          </Link>       
        </View> 
      </View>  
    </ScrollView>
  );
}
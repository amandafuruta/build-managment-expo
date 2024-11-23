
import styles from '@/styles/addExpense-style';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';

const categorytype = ["materials", "electrician", "painter", "plumber", "carpenter", "taxes", "others"];
export default function AddExpense(){
  const { id } = useLocalSearchParams()
      , router = useRouter()
      , [activityIndicator, setActivityIndicator] = useState(false)
      , [category, setCategory ] = useState("")
      , [start, setStart] = useState("")
      , [end, setEnd] = useState("")
      , [detail, setDetail] = useState("")
      , [price, setPrice] = useState("")

    const addExpense = async (id:string) => {
      setActivityIndicator(true)
      const expenseCollection = collection(db, 'expenses')
      await addDoc(expenseCollection, {
          category: category,
          start: start,
          end: end,
          detail: detail,
          total: price,
          id_house: id,
      });

      Alert.alert(
        "Done!",
        "A new expense created!",
        [ { text: "OK", } ]
      );

      setActivityIndicator(false)
    }

  return(
    <ScrollView> 
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Add Expense</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Category:</Text>
            <SelectDropdown
              data={categorytype}
              onSelect={(selectedItem) => {
                setCategory(selectedItem);
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.input}>
                    <Text>
                      {(category) || 'Select category'}
                    </Text>
                  </View>
                );
              }}
              renderItem={(item, isSelected) => {
                return (
                  <View 
                  style={{...(isSelected && { backgroundColor: '#D2D9DF' })}}>
                    <Text style={{padding: 5}}>{item}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Start:</Text>               
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
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>End:</Text>
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
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Detail:</Text>
            <TextInput 
              value={detail}
              onChangeText={setDetail}
              style={styles.input}
            />
          </View> 
          <View style={styles.details}>
            <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Total €:</Text>
            <TextInput 
                value={price}
                onChangeText={setPrice}
                style={styles.input}
            />
          </View> 
          <View style={styles.buttons}>
            <Pressable 
              onPress={()=> router.back()}
              style={styles.btn}>
                <Text style={styles.btn_text}>Cancel</Text>
            </Pressable>          
            <Pressable
              style={styles.btn}
              onPress={() => addExpense(id as string)}  >
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
      </View>
    </ScrollView> 
  )
}
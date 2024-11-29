
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
      , [formData, setFormData] = useState({
        category: '',
        start: '',
        end: '',
        detail: '',
        total: ''
      });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const addExpense = async (id:string) => {
    setActivityIndicator(true)
    try {
      const expenseCollection = collection(db, 'expenses')
      
      await addDoc(expenseCollection, {
        ...formData,
        id_house: id,
      });

      Alert.alert(
        "Done!",
        "A new expense created!",
        [ { text: "OK", } ]
      );

      setFormData({
        category: '',
        start: '',
        end: '',
        detail: '',
        total: ''
      });
    } catch (error) {
      Alert.alert("Error", "Failed to create expense. Please try again.");
    } finally {
      setActivityIndicator(false);
    }
  }

  return(
    <>
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Add Expense</Text>        
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <ScrollView>
            <View style={styles.details}>
              <Text style={styles.label}>
                Category:
              </Text>
              <SelectDropdown
                data={categorytype}
                onSelect={(selectedItem) => {
                  handleInputChange('category', selectedItem)
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.input}>
                      <Text>
                        {(selectedItem ) || 'Select category'}
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
              <Text style={styles.label}>
                Start:
              </Text>               
              <TextInputMask
                type={'datetime'}
                style={styles.input}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={formData.start}
                onChangeText={(value) => handleInputChange('start', value)}
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
                value={formData.end}
                onChangeText={(value) => handleInputChange('end', value)}
                placeholder='DD/MM/YYYY'
              />
           </View> 
           <View style={styles.details}>
              <Text style={styles.label}>
                Detail:
              </Text>
              <TextInput 
                value={formData.detail}
                onChangeText={(value) => handleInputChange('detail', value)}
                style={styles.input}
              />
           </View> 
           <View style={styles.details}>
              <Text style={styles.label}>
                Total €:
              </Text>
              <TextInput 
                value={formData.total}
                onChangeText={(value) => handleInputChange('total', value)}
                style={styles.input}
              />
           </View> 
           <View style={styles.buttons}>         
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
          </ScrollView>
        </View>
      </View>
    </>    
  )
}
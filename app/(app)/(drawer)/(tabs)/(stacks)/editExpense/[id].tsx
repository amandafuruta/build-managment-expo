
import styles from '@/styles/addExpense-style';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TextInputMask } from 'react-native-masked-text';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase-config';

const categorytype = ["materials", "electrician", "painter", "plumber", "carpenter", "taxes", "others"];
export default function EditExpense(){
  const { id } = useLocalSearchParams()
      , router = useRouter()
      , [activityIndicator, setActivityIndicator] = useState(false)
      , [loading, setLoading] = useState(true)
      , [formData, setFormData] = useState({
        category: '',
        start: '',
        end: '',
        detail: '',
        price: ''
      })

  useEffect(() => {
    const getExpense = async () => {
      const expenseDocRef = doc(db, 'expenses', id as string);
      const docSnap = await getDoc(expenseDocRef);
      const expense = docSnap.data();

      if (expense) {
        setFormData({
          category: expense.category,
          start: expense.start,
          end: expense.end,
          detail: expense.detail,
          price: expense.total
        });
      }

      setLoading(false);
    };
    
    getExpense();
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  const editExpense = async() => {
    setActivityIndicator(true)

    try {
      const expenseDocRef = doc(db, 'expenses', id as string);
      await updateDoc(expenseDocRef, formData);
      Alert.alert("Updated!", "", [{ text: "OK" }]);
    } catch (error) {
      Alert.alert("Error", "Failed to update expense. Please try again.");
    } finally {
      setActivityIndicator(false);
    }
}

  if(loading){
    return(
      <>
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Edit Expense</Text>        
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:"100%"}}>
            <ActivityIndicator size="large" color="#710096"/>
          </View>
        </View>        
      </View>
      </>
    )
  }

  return(
    <>
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Edit Expense</Text>        
      </View>
      <View style={styles.content}>
        <View style={styles.card}>
          <ScrollView>
            <View style={styles.details}>
             <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Category:</Text>
             <SelectDropdown
               data={categorytype}
               onSelect={(selectedItem) => {
                handleInputChange('category', selectedItem)
               }}
               renderButton={(selectedItem, isOpened) => {
                 return (
                   <View style={styles.input}>
                     <Text>
                       { formData.category || 'Select category'}
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
               value={formData.start}
               onChangeText={(value) => handleInputChange('start', value)}
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
               value={formData.end}
               onChangeText={(value) => handleInputChange('end', value)}
               placeholder='DD/MM/YYYY'
             />
           </View> 
           <View style={styles.details}>
             <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Detail:</Text>
             <TextInput 
               value={formData.detail}
               onChangeText={(value) => handleInputChange('detail', value)}
               style={styles.input}
             />
           </View> 
           <View style={styles.details}>
             <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Total €:</Text>
             <TextInput 
                 value={formData.price}
                 onChangeText={(value) => handleInputChange('price', value)}
                 style={styles.input}
             />
           </View> 
           <View style={styles.buttons}>         
             <Pressable
               style={styles.btn}
               onPress={editExpense} >
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
    // <ScrollView> 
    //   <View style={styles.header}>
    //     <Pressable onPress={()=> router.back()}> 
    //       <AntDesign name="arrowleft" size={24} color="#fff" />
    //     </Pressable>
    //     <Text style={styles.title}>Edit Expense</Text>
    //   </View>
    //   <View style={styles.content}>
    //     <View style={styles.card}>
    //       <View style={styles.details}>
    //         <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Category:</Text>
    //         <SelectDropdown
    //           data={categorytype}
    //           onSelect={(selectedItem) => {
    //             setCategory(selectedItem);
    //           }}
    //           renderButton={(selectedItem, isOpened) => {
    //             return (
    //               <View style={styles.input}>
    //                 <Text>
    //                   {(category) || 'Select category'}
    //                 </Text>
    //               </View>
    //             );
    //           }}
    //           renderItem={(item, isSelected) => {
    //             return (
    //               <View 
    //               style={{...(isSelected && { backgroundColor: '#D2D9DF' })}}>
    //                 <Text style={{padding: 5}}>{item}</Text>
    //               </View>
    //             );
    //           }}
    //           showsVerticalScrollIndicator={false}
    //         />
    //       </View>
    //       <View style={styles.details}>
    //         <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Start:</Text>               
    //         <TextInputMask
    //           type={'datetime'}
    //           style={styles.input}
    //           options={{
    //               format: 'DD/MM/YYYY'
    //           }}
    //           value={start}
    //           onChangeText={setStart}
    //           placeholder='DD/MM/YYYY'
    //         />
    //       </View>
    //       <View style={styles.details}>
    //         <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>End:</Text>
    //         <TextInputMask
    //           type={'datetime'}
    //           style={styles.input}
    //           options={{
    //               format: 'DD/MM/YYYY'
    //           }}
    //           value={end}
    //           onChangeText={setEnd}
    //           placeholder='DD/MM/YYYY'
    //         />
    //       </View> 
    //       <View style={styles.details}>
    //         <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Detail:</Text>
    //         <TextInput 
    //           value={detail}
    //           onChangeText={setDetail}
    //           style={styles.input}
    //         />
    //       </View> 
    //       <View style={styles.details}>
    //         <Text style={{fontWeight:'500', fontSize: 18, marginRight: 10}}>Total €:</Text>
    //         <TextInput 
    //             value={price}
    //             onChangeText={setPrice}
    //             style={styles.input}
    //         />
    //       </View> 
    //       <View style={styles.buttons}>
    //         <Pressable 
    //           onPress={()=> router.back()}
    //           style={styles.btn}>
    //             <Text style={styles.btn_text}>Cancel</Text>
    //         </Pressable>          
    //         <Pressable
    //           style={styles.btn}
    //           onPress={editExpense}>
    //             {
    //               activityIndicator?
    //               <View style={{paddingVertical: 3}}>
    //                 <ActivityIndicator color='#fff'/>
    //               </View>
    //               :
    //               <Text style={styles.btn_text}>Save</Text>
    //             }
    //         </Pressable>
    //       </View>
    //     </View>
    //   </View>
    // </ScrollView> 
  )
}
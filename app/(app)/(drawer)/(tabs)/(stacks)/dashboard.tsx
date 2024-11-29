import Category from '@/components/categoryDashboard';
import styles from '@/styles/dashboard-style';
import { AntDesign } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function Dashboard(){
  const router = useRouter()
      , { id } = useLocalSearchParams() //house id
      , [category, setCategory] = useState(false)

  return(
    <>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Dashoboard</Text>
      </View>
      <View style={{paddingVertical:40, paddingHorizontal:20}}>
        <View style={[styles.dashboard]}>                             
          <Pressable 
          style={[styles.btn]}
          onPress={() => setCategory(!category)} >
            <Text style={[styles.btn_title]}>
              Cost per Category
            </Text>
            <AntDesign name={category? "up" : "down"} size={20} color="#417abb" />                         
          </Pressable>
          { category &&
            <Category houseId={id as string}/>
          }          
        </View>
      </View>      
    </>
  )
}

{/* <Pressable style={[styles.btn]}>
  <Text style={[styles.btn_title]}>
    Month
  </Text>
</Pressable> 
<Pressable style={[styles.btn]}>
  <Text style={[styles.btn_title]}>
    Average
  </Text>
</Pressable> */}
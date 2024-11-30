import Category from '@/components/categoryDashboard';
import Monthly from '@/components/monthly';
import styles from '@/styles/dashboard-style';
import { AntDesign } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Dashboard(){
  const router = useRouter()
      , { id } = useLocalSearchParams() //house id
      , [showCategoryDetails, setShowCategoryDetails] = useState(false)
      , [showMonthlyDetails, setShowMonthlyDetails] = useState(false)

  return(
    <>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Dashoboard</Text>
      </View>
      <ScrollView>
        <View style={{paddingVertical:40, paddingHorizontal:20}}>
          <View style={[styles.dashboard]}>                             
            <Pressable 
            style={[styles.btn]}
            onPress={() => setShowCategoryDetails(!showCategoryDetails)} >
              <Text style={[styles.btn_title]}>
                Cost per Category
              </Text>
              <AntDesign name={showCategoryDetails? "up" : "down"} size={20} color="#417abb" />                         
            </Pressable>
            { showCategoryDetails &&
              <Category/>
            }  
            <Pressable 
            style={[styles.btn]}
            onPress={() => setShowMonthlyDetails(!showMonthlyDetails)} >
              <Text style={[styles.btn_title]}>
                Cost per Month
              </Text>
              <AntDesign name={showMonthlyDetails? "up" : "down"} size={20} color="#417abb" />                         
            </Pressable>  
            { showMonthlyDetails &&
              <Monthly/>
            }      
          </View>
        </View>   
      </ScrollView>   
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
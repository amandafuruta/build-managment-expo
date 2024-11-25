import { db } from '@/lib/firebase-config';
import styles from '@/styles/categoryDashboard-style';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function Category(){
  const  router = useRouter()
      , { id } = useLocalSearchParams()
      , [loading, setloading] = useState(false)
      , [details, setDetails] = useState({
        totalMaterial: 0,
        totalElet: 0,
        totalPaint: 0,
        totalPlum: 0,
        totalCarp: 0,
        totalTaxe: 0,
        totalOther: 0,
      })

  useEffect(() => {
    const fetchUserData = async () =>{
      const usersRef = collection(db, 'expenses')
          , userQuery = query(usersRef, where('id_house', '==', id))
          , querySnapshot = await getDocs(userQuery)
          , expensesData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            id_house: doc.data().id_house,
            category: doc.data().category,
            detail: doc.data().detail,
            start: doc.data().start,
            end: doc.data().end,
            total: doc.data().total
          }))
    }

    fetchUserData()
  })
  
  if(loading){
    return(
      <>
        <View style={styles.header}>
          <Pressable onPress={()=> router.back()}>  
            <AntDesign name="arrowleft" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.title}>Cost per category</Text>
        </View>      
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:"100%"}}>
          <ActivityIndicator size="large" color="#710096"/>
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
      <Text style={styles.title}>Cost per category</Text>
    </View>  
    <View style={{display:"flex", flexDirection:"column", paddingHorizontal:20, paddingVertical:30}}>                
      <View style={styles.row}>
        <Text style={[styles.purple, styles.field]}>Materials</Text>
        <Text style={[styles.white, styles.field]}>{details.totalMaterial} €	</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.purple, styles.field]}>Electrician</Text>
        <Text style={[styles.white, styles.field]}>{details.totalElet} €</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.purple, styles.field]}>Painter</Text>
        <Text style={[styles.white, styles.field]}>{details.totalPaint} €</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.purple, styles.field]}>Plumber</Text>
        <Text style={[styles.white, styles.field]}>{details.totalPlum} €</Text>
      </View>
      <View  style={styles.row}>
        <Text style={[styles.purple, styles.field]}>Carpenter</Text>
        <Text style={[styles.white, styles.field]}>{details.totalCarp} €</Text>
      </View>
      <View  style={styles.row}>
        <Text style={[styles.purple, styles.field]}>Taxes</Text>
        <Text style={[styles.white, styles.field]}>{details.totalTaxe} €</Text>
      </View>
      <View  style={styles.row}>
        <Text style={[styles.purple, styles.field]}>Others</Text>
        <Text style={[styles.white, styles.field]}>{details.totalOther} €</Text>
      </View>
    </View>
    </>
  )
}
import { db } from '@/lib/firebase-config';
import styles from '@/styles/categoryDashboard-style';
import { AntDesign } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface Props{
  houseId: string
}
export default function Category(props:Props){
  const  {houseId} = props
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
    console.log("ID in useEffect:", id); // Check if `id` is available
    const fetchUserData = async () => {
      if (id) {
        console.log("Fetching data for id:", id);
        const usersRef = collection(db, 'expenses');
        const userQuery = query(usersRef, where('id_house', '==', id));
        const querySnapshot = await getDocs(userQuery);
        console.log(querySnapshot);  // This will help see if the query fetches anything
      }
    };
  
    fetchUserData();
  }, [id]);
  
  if(loading){
    return(
      <>     
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:"100%"}}>
          <ActivityIndicator size="large" color="#710096"/>
        </View>     
      </>
    )
  }

  return(
    <> 
    <View style={styles.container}>                
      <View style={styles.row}>
        <Text style={styles.field}>Materials</Text>
        <Text style={styles.field}>€</Text>
        {/* <Text >{details.totalMaterial} €	</Text> */}
      </View>
      <View style={styles.row}>
        <Text style={styles.field}>Electrician</Text>
        <Text style={styles.field}>{details.totalElet} €</Text>
      </View>
      {/* <View style={styles.row}>
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
      </View> */}
    </View>
    </>
  )
}
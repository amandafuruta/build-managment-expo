import { db } from '@/lib/firebase-config';
import styles from '@/styles/categoryDashboard-style';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Category(){
  const { id } = useLocalSearchParams()
      , [loading, setLoading] = useState(true)
      , [expensesTotal, setExpensesTotal] = useState({
          totalMaterial : 0
        , totalElet : 0
        , totalPaint : 0
        , totalPlum : 0
        , totalCarp : 0
        , totalTaxe : 0
        , totalOther : 0
      })

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        const usersRef = collection(db, 'expenses');
        const userQuery = query(usersRef, where('id_house', '==', id));
        const querySnapshot = await getDocs(userQuery);
        let totalMaterial = 0
          , totalElet = 0
          , totalPaint = 0
          , totalPlum = 0
          , totalCarp = 0
          , totalTaxe = 0
          , totalOther = 0

        querySnapshot.docs.forEach((doc) =>{           
          const expense = doc.data()
          if(parseFloat(expense.total)){
            let total = parseFloat(expense.total)
            switch (expense.category) {
              case 'materials':
                totalMaterial += total;
                break;
              case 'electrician':
                totalElet += total;
                break;
              case 'paint':
                totalPaint += total;
                break;
              case 'plumber':
                totalPlum += total;
                break;
              case 'carpenter':
                totalCarp += total;
                break;
              case 'taxes':
                totalTaxe += total;
                break;
              case 'others':
                totalOther += total;
                break;
              default:
                break;
            }
          }      
        })  

        setExpensesTotal({
          totalMaterial,
          totalElet,
          totalPaint,
          totalPlum,
          totalCarp,
          totalTaxe,
          totalOther,
        });
      }
      setLoading(false)
    };
  
    fetchUserData();
  }, [id]);
  
  if(loading){
    return(
      <>     
        <View style={{ justifyContent: 'center', alignItems: 'center', height: 100}}>
          <ActivityIndicator size="large" color="#417abb"/>
        </View>     
      </>
    )
  }

  return(
    <> 
    <View style={styles.container}>                
      <View style={styles.row}>
        <Text style={styles.field}>Materials</Text>
        <Text style={styles.field}>{expensesTotal.totalMaterial} €</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.field}>Electrician</Text>
        <Text style={styles.field}>{expensesTotal.totalElet} €</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.field}>Painter</Text>
        <Text style={styles.field}>{expensesTotal.totalPaint} €</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.field}>Plumber</Text>
        <Text style={styles.field}>{expensesTotal.totalPlum} €</Text>
      </View>
      <View  style={styles.row}>
        <Text style={styles.field}>Carpenter</Text>
        <Text style={styles.field}>{expensesTotal.totalCarp} €</Text>
      </View>
      <View  style={styles.row}>
        <Text style={styles.field}>Taxes</Text>
        <Text style={styles.field}>{expensesTotal.totalTaxe} €</Text>
      </View>
      <View  style={styles.row}>
        <Text style={styles.field}>Others</Text>
        <Text style={styles.field}>{expensesTotal.totalOther} €</Text>
      </View>
    </View>
    </>
  )
}
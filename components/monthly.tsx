import { db } from '@/lib/firebase-config';
import styles from '@/styles/monthlyDashboard-style';
import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Monthly(){
  const { id } = useLocalSearchParams()
      , [loading, setLoading] = useState(true)
      , [monthlyTotals, setMonthlyTotals] = useState<{ year: string; month: string; total: string }[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        const usersRef = collection(db, 'expenses');
        const userQuery = query(usersRef, where('id_house', '==', id));
        const querySnapshot = await getDocs(userQuery);
        const totalsByMonth: { [key: string]: number } = {}

        querySnapshot.docs.forEach((doc) =>{           
          const expense = doc.data()
          const { total, start } = expense
          
          if (total && start){
            const [day, month, year] = start.split('/');
            
            if(year > 1800){

              const expenseDate = new Date(year, month - 1, day); // Convert to Date object
              const monthYearKey = `${expenseDate.getFullYear()}-${expenseDate.getMonth() + 1}`;
      
              // Initialize if this month/year does not exist yet
              if (!totalsByMonth[monthYearKey]) {
                totalsByMonth[monthYearKey] = 0;
              }

              // Add the expense total to the corresponding month/year
              totalsByMonth[monthYearKey] += parseFloat(total);
            }
          }  
        })  

        const totalsArray = Object.keys(totalsByMonth).map((key) => {
          const [year, month] = key.split('-');
          return {
            year,
            month,
            total: totalsByMonth[key].toFixed(2),
          };
        });

        totalsArray.sort((a, b) => {
          const yearDiff = parseInt(a.year) - parseInt(b.year);
          if (yearDiff === 0) {
            return parseInt(a.month) - parseInt(b.month); // Sort by month if years are the same
          }
          return yearDiff;
        });

        setMonthlyTotals(totalsArray);
      }
      setLoading(false)
    };
  
    fetchUserData();
  }, [id]);

  const groupedByYear = monthlyTotals.reduce((acc, { year, month, total }) => {
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push({ month, total });
    return acc;
  }, {} as { [key: string]: { month: string; total: string }[] });
      
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
      {Object.keys(groupedByYear).map((year) => (
        <View key={year}>
          <Text style={styles.tableHeader}>{year}</Text>

          {groupedByYear[year].map(({ month, total }) => (
            <View key={`${year}-${month}`} style={styles.row}>
              <Text style={styles.field}>Month: {month}</Text>
              <Text style={styles.field}>Total: {total} €</Text>
            </View>
          ))}
        </View>
      ))}
      </View>
    </>
  )
}
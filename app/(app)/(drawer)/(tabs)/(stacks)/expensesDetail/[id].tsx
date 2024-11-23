import { db } from '@/lib/firebase-config'
import styles from '@/styles/expensesDetail-style'
import { AntDesign, Feather } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native'

interface Props{
  id_house: string
  category: string
  detail: string
  start: string
  end: string
  total: string
}

export default function ExpensesDetail(){
  const  router = useRouter()
      , { id } = useLocalSearchParams()
      , [expenses, setExpenses] = useState<Props[]>([])
      , [activityIndicator, setActivityIndicator] = useState(true)
      , [isRefreshing, setIsRefreshing] = useState(false)
      , expensesCollection = collection(db, 'expenses')
  
  useEffect(()=> {  
    Getexpenses() 
    setActivityIndicator(false)
  }, [])

  async function Getexpenses(){
    const expensesQuery = query(expensesCollection, where('id_house', '==', id))
    , expenseDoc= await getDocs(expensesQuery)
    , expensesData = expenseDoc.docs.map(doc => ({
      id_house: doc.data().id_house,
      category: doc.data().category,
      detail: doc.data().detail,
      start: doc.data().start,
      end: doc.data().end,
      total: doc.data().total
    }))

    setExpenses(expensesData)
  }

  const deleteAlert = (id: string) =>
    Alert.alert(
    "Alert Mesage!",
    "Are you sure you want to delete?",
    [
        {
        text: "Cancel",
        style: "cancel"
        },
        { text: "OK", onPress: () => confirmedDeleteAlert(id) }
    ]
  );

  const confirmedDeleteAlert = async(id:string) => {
    const expense = doc(db, 'expenses', id)
    await deleteDoc(expense)

    Alert.alert(
      "Deleted!",
      "",
      [ { text: "OK"} ]
    );
  }

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);

    setTimeout(() => {
      Getexpenses()
      setIsRefreshing(false); 
    }, 2000);
  }, []);
  
  if(activityIndicator){
    return(
      <>
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}>  
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Expense Details</Text>
      </View>      
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:"100%"}}>
        <ActivityIndicator size="large" color="#710096"/>
      </View>     
      </>
    )
  }

  return(
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
    }> 
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Expense Details</Text>
      </View>
      <View style={{padding:20}}>
        <Pressable >
          <Text style={[styles.mydash, {fontWeight: "bold"}]}>My Dashboard</Text>
        </Pressable>
        <Link 
          style={{width: '100%'}}
          href={{
            pathname: '/(app)/(drawer)/(tabs)/(stacks)/addExpense/[id]',
            params: { id: id as string },
          }}>
          <Text style={[styles.add_text, {fontWeight: "bold",}]}>Add expense</Text>
        </Link>
        {
          expenses.map((expense, index) => 
            <View key={index}  style={styles.card}>
              <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', marginBottom: 20}}>
                <Pressable>
                  <Text 
                  style={[
                    styles.add_text, 
                    {fontWeight: 'bold', 
                    color:"#710096"}]}>
                    Editar
                  </Text>
                </Pressable>
                <Pressable onPress={() => deleteAlert(expense.id_house)}>
                  <Feather name="trash-2" size={24} color="red" />
                </Pressable>
              </View>
              <View style={styles.infos}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Category: </Text>
                <Text style={{fontSize: 18}} >{expense.category}</Text>
              </View>
              <View style={styles.infos}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Detail: </Text>
                <Text style={{fontSize: 18}} >{expense.detail}</Text>
              </View> 
              <View style={styles.infos}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Start: </Text>
                <Text style={{fontSize: 18}} key={index}>{expense.start}</Text>
              </View>
              <View style={styles.infos}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>End: </Text>
                <Text style={{fontSize: 18}} key={index}>{expense.end}</Text>
              </View>
              <View style={styles.infos}>
                <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>Total : </Text>
                <Text style={{fontSize: 18}} key={index}>{expense.total} &euro;</Text>
              </View>
          </View>
          )
        }
      </View>
    </ScrollView> 
  )
}
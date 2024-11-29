import { db } from '@/lib/firebase-config'
import styles from '@/styles/expensesDetail-style'
import { AntDesign, Feather } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Pressable, RefreshControl, ScrollView, Text, View } from 'react-native'

interface Props{
  id: string
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
      , [loading, setloading] = useState(true)
      , [isRefreshing, setIsRefreshing] = useState(false)
      , expensesCollection = collection(db, 'expenses')
      , [selectedExpense, setSelectedExpense] = useState<Props | null>(null)
      , [modalVisible, setModalVisible] = useState(false)
      , [deleteLoad, setDeleteLoad] = useState(false)

  useEffect(()=> {  
    Getexpenses() 
    setloading(false)
  }, [])

  async function Getexpenses(){
    const expensesQuery = query(expensesCollection, where('id_house', '==', id))
    , expenseDoc= await getDocs(expensesQuery)
    , expensesData = expenseDoc.docs.map(doc => ({
      id: doc.id,
      id_house: doc.data().id_house,
      category: doc.data().category,
      detail: doc.data().detail,
      start: doc.data().start,
      end: doc.data().end,
      total: doc.data().total
    }))

    setExpenses(expensesData)
  }

  const deleteAlert = async (id: string) =>{
    Alert.alert(
      "Alert Mesage!",
      "Are you sure you want to delete?",
      [
        {
        text: "Cancel",
        style: "cancel"
        },
        { text: "OK", onPress: () => [confirmedDeleteAlert(id), setDeleteLoad(true)] }
      ]
    );
  }

  const confirmedDeleteAlert = async(id:string) => {
    try{
      const expense = doc(db, 'expenses', id)
      await deleteDoc(expense)
      setDeleteLoad(false)
    } catch (e){
      console.log(e)
    }

    Alert.alert(
      "Deleted!",
      "Reload the page",
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

  const openBox = (expense: Props) => {
    setSelectedExpense(expense);
    setModalVisible(!modalVisible);
  };
  
  if(loading){
    return(
      <>
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <View style={styles.subtitle_box}>
          <Text style={styles.subtitle_text}>
           Expenses
          </Text>
        </View>
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
        <View style={styles.subtitle_box}>
          <Text style={styles.subtitle_text}>
           Expenses
          </Text>
        </View>
      </View>
      <View style={{paddingVertical:50, paddingHorizontal:20}}>
        <Link 
          style={{width: '100%', marginVertical:20}}
          href={{
            pathname: '/(app)/(drawer)/(tabs)/(stacks)/addExpense/[id]',
            params: { id: id as string },
          }}>
          <Text style={[styles.add_text, {fontWeight: "bold",}]}>Add expense</Text>
        </Link>
        {
          expenses.map((expense, index)=>
            <View key={index}  style={styles.card}>
              {modalVisible && selectedExpense?.id === expense.id &&
                <View style={styles.modal}>
                  <Link 
                  href={{
                    pathname: '/(app)/(drawer)/(tabs)/(stacks)/editExpense/[id]',
                    params: { id: expense.id },
                  }}
                  style={{ 
                    marginBottom: 20, 
                    width:'100%',
                  }}>
                    <View style={{display:'flex', flexDirection:'row'}}>
                      <AntDesign name="edit" size={20} color="#710096" style={{ marginRight: 15 }} />
                      <Text style={{color:"#710096", fontWeight:500}}>Edit</Text>  
                    </View>                                                                            
                  </Link>
                  {
                    deleteLoad ?
                    <ActivityIndicator/>
                    :
                    <Pressable onPress={() => deleteAlert(expense.id)}>
                      <View style={{display:'flex', flexDirection: 'row'}}>
                        <AntDesign name="delete" size={20} color="#d60404" style={{ marginRight: 15 }} />
                        <Text style={{ color: '#d60404' }}>Delete</Text>
                      </View>
                    </Pressable>
                  }
                </View>
              }
              <Pressable 
              style={styles.moreBtn}
              onPress={() => openBox(expense)}>
                <Feather 
                name="more-horizontal" 
                size={24} 
                color="#490061" 
                style={{position:'absolute', right: 10}}/>
              </Pressable>
              <View style={styles.infos}>
                <Text style={styles.label}>Category: </Text>
                <Text style={{fontSize: 18}} >{expense.category}</Text>
              </View>
              <View style={styles.infos}>
                <Text style={styles.label}>Detail: </Text>
                <Text style={{fontSize: 18}} >{expense.detail}</Text>
              </View> 
              <View style={styles.infos}>
                <Text style={styles.label}>Start: </Text>
                <Text style={{fontSize: 18}} key={index}>{expense.start}</Text>
              </View>
              <View style={styles.infos}>
                <Text style={styles.label}>End: </Text>
                <Text style={{fontSize: 18}} key={index}>{expense.end}</Text>
              </View>
              <View style={styles.infos}>
                <Text style={styles.label}>Total : </Text>
                <Text style={{fontSize: 18}} key={index}>{expense.total} &euro;</Text>
              </View>
            </View>
          )
        }
      </View>
    </ScrollView> 
  )
}
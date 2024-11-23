import styles from '@/styles/expensesDetail-style'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'

export default function ExpensesDetail(){
  const  router = useRouter()
  
  return(
    <ScrollView> 
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Build Details</Text>
      </View>
      <View style={{padding:20}}>
        <Pressable >
          <Text style={[styles.mydash, {fontWeight: "bold"}]}>My Dashboard</Text>
        </Pressable>
        <Pressable >
          <Text style={[styles.add_text, {fontWeight: "bold",}]}>Adicionar</Text>
        </Pressable>
      </View>
    </ScrollView> 
  )
}
import { useSession } from '@/context';
import { db } from '@/lib/firebase-config';
import styles from '@/styles/home-style';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation } from 'expo-router';
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StatusBar, Text, View } from 'react-native';

interface House {
  id: string;
  address: string;
  start: string;
  end: string;
  nome: string;
  tipologia: string;
}

export default function Home(){
  const [refreshing, setRefreshing] = useState(false)
      , [loading, setLoading] = useState(true)
      , [builds, setBuilds] = useState<House[]>([])  
      , housesCollection = collection(db, 'houses')
      , navigation = useNavigation<DrawerNavigationProp<any>>()
      , { user, isLoading } = useSession()
      , [username, setUsername] = useState('')

  useEffect(()=> {  
    if(user){
      const getUser = async() => {
        const usersRef = collection(db, 'users')
            , querySnapshot = await getDocs(usersRef)
        querySnapshot.forEach((doc) => {
          const data = doc.data(); 
          if (doc.id === user.uid) {
            setUsername(data.name)
          }
        })
      }
      getUser()
    }  
    gethouses()
  }, [])

  const gethouses =  async() => {
    setLoading(true);
    const querySnapshot = await getDocs(housesCollection)        

    const houses: House[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      address: doc.data().address,
      start: doc.data().start,
      end: doc.data().end,
      nome: doc.data().nome,
      tipologia: doc.data().tipologia,
    }));
    
    setBuilds(houses)
    setLoading(false)
  }

  const onRefresh = async () => {
    setRefreshing(true);
    await gethouses()
    setRefreshing(false)
  }

  if(loading){
    return(
      <>
      <View style={styles.box_title}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        />
        <Pressable
          onPress={() => navigation.openDrawer()}
          style={{ marginLeft: 16 }} >
          <Ionicons name="menu" size={24} color="#fff" />
        </Pressable>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', height:"100%"}}>
        <ActivityIndicator size="large" color="#417abb"/>
      </View>
      </>
    )
  }

  return(
    <View style={{flex:1, backgroundColor: '#e9e8e8'}}>
      <View style={styles.box_title}>
        <LinearGradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        />
        <View style={styles.content}>
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 16 }} >
            <Ionicons name="menu" size={24} color="#fff" />
          </Pressable>
          <Text style={styles.title}>
            Welcome, {username}
          </Text>
        </View>
        <View style={styles.subtitle_box}>
          <Text style={styles.subtitle_text}>
           My builds
          </Text>
        </View>
      </View>
      <View style={{paddingTop: 70, paddingHorizontal: 20}}>
        <FlatList
          data={builds}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <Link
            style={{width:'100%', marginBottom: 10}}
            href={{
              pathname: './buildDetail/[id]',
              params: { id: item.id },
            }}>
              <View
                style={styles.pressable} >
                <Text style={styles.text}>{item.nome}</Text>
                <AntDesign name="arrowright" size={24} color="#417abb" />
              </View>
            </Link>
          )}        
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              
            </View>
          }
        />
      </View>
    </View>
  )
}
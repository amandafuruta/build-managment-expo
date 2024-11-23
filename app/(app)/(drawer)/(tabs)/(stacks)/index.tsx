import { db } from '@/lib/firebase-config';
import styles from '@/styles/home-style';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useNavigation } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, Text, View } from 'react-native';

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
      , [build, setBuild] = useState<House[]>([])  
      , housesCollection = collection(db, 'houses')
      , navigation = useNavigation<DrawerNavigationProp<any>>()
  
  useEffect(()=> {    
    gethouses()
  }, [])

  const gethouses =  async() => {
    const querySnapshot = await getDocs(housesCollection)        

    const houses: House[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      address: doc.data().address,
      start: doc.data().start,
      end: doc.data().end,
      nome: doc.data().nome,
      tipologia: doc.data().tipologia,
    }));
    
    setBuild(houses)
  }

  const onRefresh = () => {
    setRefreshing(true);
    gethouses()
    setRefreshing(false)
  }

  return(
    <FlatList
      data={build}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <Link
        style={{width:'100%'}}
        href={{
          pathname: './buildDetail/[id]',
          params: { id: item.id },
        }}>
          <View
            style={
              index % 2 === 0
                ? [{ backgroundColor: '#fff' }, styles.pressable]
                : [{ backgroundColor: '#f0ddf7' }, styles.pressable]
            } >
            <Text style={styles.text}>{item.nome}</Text>
            <AntDesign name="arrowright" size={24} color="#710096" />
          </View>
        </Link>
      )}
      ListHeaderComponent={
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
          <Text style={styles.title}>
            My Builds
          </Text>
        </View>
      }
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#710096" />
        </View>
      }
    />
  )
}
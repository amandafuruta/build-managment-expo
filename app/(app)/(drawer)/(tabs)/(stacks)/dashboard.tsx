import styles from '@/styles/dashboard-style';
import { AntDesign } from '@expo/vector-icons';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function Dashboard(){
  const router = useRouter()
      , { id } = useLocalSearchParams() //house id

  return(
    <>
      <View style={styles.header}>
        <Pressable onPress={()=> router.back()}> 
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <View style={{paddingVertical:40, paddingHorizontal:20}}>
        <View style={[styles.dashboard]}>          
          <Pressable style={[styles.btn]}>
            <Text style={[styles.btn_title]}>
              Month
            </Text>
          </Pressable>          
          <View style={[styles.btn]}>
            <Link 
              style={{width: '100%'}}
              href={{
                pathname: '/(app)/(drawer)/(tabs)/(stacks)/categoryDashboard',
                params: { id: id as string },
            }}> 
              <Text style={[styles.btn_title]}>
                Category
              </Text>
            </Link>
          </View>
          <Pressable style={[styles.btn]}>
            <Text style={[styles.btn_title]}>
              Average
            </Text>
          </Pressable>
        </View>
      </View>      
    </>
  )
}
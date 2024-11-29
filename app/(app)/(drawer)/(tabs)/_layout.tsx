import { AntDesign, Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Tabs, useNavigation } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function TabsLayout(){
  const navigation = useNavigation<DrawerNavigationProp<any>>();
  
  return(
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(stacks)"
        options={{
          headerShown: false,
          title: "",
          tabBarLabelStyle: { 
            fontSize: 14,
          },
          tabBarStyle:{
            height: 50,
            paddingTop: 5,
          },
          tabBarIcon: ({ focused }) => (
              <AntDesign  
              name="home"  
              style={{
                color: focused? '#417abb' : '#757474', 
                fontSize: focused? 26 : 24,
              }}/>
          ),
          // tabBarLabel: ({ focused }) => (
          //   <Text style={{ color: focused ? '#710096' : '#757474', fontSize: 14 }}>
          //     Home
          //   </Text>
          // ),
          headerStyle: {
            backgroundColor: "#16011d", 
          },
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 16 }}
            >
              <Ionicons
                name="menu"
                size={24}
                color={'#fff'} 
              />
            </Pressable>
          ),        
        }}
      />
      <Tabs.Screen
        name="addBuild" 
        options={{
          title: "",
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons 
            name="add-outline"  
            style={{
              color: focused? '#417abb' : '#757474', 
              fontSize: focused? 26 : 24}} />
          ),
          // tabBarLabel: ({ focused }) => (
          //   <Text style={{ color: focused ? '#710096' : '#757474', fontSize: 14 }}>
          //     Add Build
          //   </Text>
          // ),
          headerStyle: {
            backgroundColor: "#16011d", 
          },
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 16 }}
            >
              <Ionicons
                name="menu"
                size={24}
                color={'#fff'} 
              />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  )
}
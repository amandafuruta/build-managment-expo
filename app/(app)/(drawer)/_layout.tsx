import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useSession } from "@/context";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function DrawerLayout(){
  const { signOut, user } = useSession();

  const handleLogout = async () => {
    await signOut();
    router.replace("/signIn");
  };

  // Custom Drawer content
  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        {/* Drawer Items */}
        <View style={{ flex: 1 }}>
          <DrawerItemList {...props} />
        </View>
        
        {/* Logout Button */}
        <View style={{ padding: 20 }}>
          <Pressable
            onPress={handleLogout}
            style={{
              backgroundColor: "#417abb39",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#417abb", fontSize: 16 }}>Logout</Text>
          </Pressable>
        </View>
      </DrawerContentScrollView>
    );
  };
  
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          paddingTop: 10,
          borderTopEndRadius: 0,
          borderBottomEndRadius: 0,
          maxWidth: 300,
        },
        drawerActiveBackgroundColor: '#417abb1f',
        drawerActiveTintColor: '#417abb',
        drawerItemStyle: {
          borderRadius: 5, 
          marginVertical: 5,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            headerShown: false,
          }}          
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile", 
            headerShown: false,
          }}
        />
      </Drawer>      
    </GestureHandlerRootView>
  )
}
import { Stack } from "expo-router";

export default function StacksLayout(){
  return(
    <Stack>
     <Stack.Screen name="index" options={{headerShown: false}}/>
     <Stack.Screen name="buildDetail/[id]" options={{headerShown: false}}/>
     <Stack.Screen name="expensesDetail" options={{headerShown: false}}/>
    </Stack>
  )
}
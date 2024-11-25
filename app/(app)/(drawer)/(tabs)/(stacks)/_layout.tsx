import { Stack } from "expo-router";

export default function StacksLayout(){
  return(
    <Stack>
     <Stack.Screen name="index" options={{headerShown: false}}/>
     <Stack.Screen name="buildDetail/[id]" options={{headerShown: false}}/>
     <Stack.Screen name="expensesDetail/[id]" options={{headerShown: false}}/>
     <Stack.Screen name="addExpense/[id]" options={{headerShown: false}}/>
     <Stack.Screen name="editExpense/[id]" options={{headerShown: false}}/>
     <Stack.Screen name="dashboard" options={{headerShown: false}}/>
     <Stack.Screen name="categoryDashboard" options={{headerShown: false}}/>
    </Stack> 
  )
}
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />            
      <Stack.Screen name="projects" />         
      <Stack.Screen name="addDetails" />       
      <Stack.Screen name="manageTasks" />   
      <Stack.Screen name="[client]" />  
      <Stack.Screen name="summary" />
      <Stack.Screen name="Dashboard" />
      <Stack.Screen name="Stakeholders" />
     
    </Stack>
  );
}

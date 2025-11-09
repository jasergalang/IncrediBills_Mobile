import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BillCategories from "../screens/bills/BillCategories";
import WaterBills from "../screens/bills/uploadBills/WaterBills";
import WaterBillDetails from "../screens/bills/billsDetails/WaterBillDetails";
import ElectricBills from "../screens/bills/uploadBills/ElectricBills";
import ElectricBillDetails from "../screens/bills/billsDetails/ElectricBillDetails"; 
const Stack = createStackNavigator();

export default function UploadNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BillCategories" component={BillCategories} />
      <Stack.Screen name="WaterBills" component={WaterBills} />
      <Stack.Screen name="WaterBillDetails" component={WaterBillDetails} />
      <Stack.Screen name="ElectricBills" component={ElectricBills} />
      <Stack.Screen name="ElectricBillDetails" component={ElectricBillDetails} /> 
    </Stack.Navigator>
  );
}
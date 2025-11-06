import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WaterBills from "../screens/bills/uploadBills/WaterBills";
import ElectricBills from "../screens/bills/uploadBills/ElectricBills";
import BillCategories from "../screens/bills/BillCategories";

const Stack = createStackNavigator();
export default function UploadNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BillCategories" component={BillCategories} />
      <Stack.Screen name="WaterBills" component={WaterBills} />
      <Stack.Screen name="ElectricBills" component={ElectricBills} />
    </Stack.Navigator>
  );
}

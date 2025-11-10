import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BillCategories from "../screens/bills/BillCategories";
import WaterBills from "../screens/bills/uploadBills/WaterBills";
import WaterBillDetails from "../screens/bills/billsDetails/WaterBillDetails";
import ElectricBills from "../screens/bills/uploadBills/ElectricBills";
import ElectricBillDetails from "../screens/bills/billsDetails/ElectricBillDetails";
import TransportBills from "../screens/bills/uploadBills/TransportBills";
import TransportBillDetails from "../screens/bills/billsDetails/TransportBillDetails";
import KitchenGasBills from "../screens/bills/uploadBills/KitchenGasBills";
import KitchenGasBillDetails from "../screens/bills/billsDetails/KitchenGasBillDetails";
import GroceryBills from "../screens/bills/uploadBills/GroceryBills";
import GroceryBillDetails from "../screens/bills/billsDetails/GroceryBillDetails";

const Stack = createStackNavigator();

export default function UploadNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BillCategories" component={BillCategories} />
      <Stack.Screen name="WaterBills" component={WaterBills} />
      <Stack.Screen name="WaterBillDetails" component={WaterBillDetails} />
      <Stack.Screen name="ElectricBills" component={ElectricBills} />
      <Stack.Screen
        name="ElectricBillDetails"
        component={ElectricBillDetails}
      />
      <Stack.Screen name="TransportBills" component={TransportBills} />
      <Stack.Screen
        name="TransportBillDetails"
        component={TransportBillDetails}
      />
      <Stack.Screen name="KitchenGasBills" component={KitchenGasBills} />
      <Stack.Screen
        name="KitchenGasBillDetails"
        component={KitchenGasBillDetails}
      />
      <Stack.Screen name="GroceryBills" component={GroceryBills} />
      <Stack.Screen
        name="GroceryBillDetails"
        component={GroceryBillDetails}
      />
    </Stack.Navigator>
  );
}

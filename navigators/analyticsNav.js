import { createStackNavigator } from "@react-navigation/stack";
import Analytics from "../screens/analytics/Analytics";

const Stack = createStackNavigator();

export default function AnalyticsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Analytics" component={Analytics} />
    </Stack.Navigator>
  );
}

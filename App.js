import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  createBottomTabNavigator,
} from "@react-navigation/native-stack";
import TodoScreen from "./screens/TodoScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Todo" component={TodoScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false, gestureEnabled: false }}
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          name="Home"
          component={HomeTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

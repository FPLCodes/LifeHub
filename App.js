import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import TodoScreen from "./screens/TodoScreen";
import HabitScreen from "./screens/HabitScreen";
import FinanceScreen from "./screens/FinanceScreen";
import PomodoroScreen from "./screens/PomodoroScreen";
import { Icon } from "react-native-elements";

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
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
    </Stack.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Todo":
              iconName = "list";
              break;
            case "Habit":
              iconName = "calendar";
              break;
            case "Finance":
              iconName = "dollar-sign";
              break;
            case "Pomodoro":
              iconName = "clock";
              break;
          }

          return (
            <Icon name={iconName} type="feather" size={size} color={color} />
          );
        },
        tabBarActiveTintColor: "royalblue",
        tabBarInactiveTintColor: "silver",
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          gestureEnabled: false,
          tabBarBadge: 4,
        }}
        name="Todo"
        component={TodoScreen}
      />
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="Habit"
        component={HabitScreen}
      />
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="Finance"
        component={FinanceScreen}
      />
      <Tab.Screen
        options={{ headerShown: false, gestureEnabled: false }}
        name="Pomodoro"
        component={PomodoroScreen}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Auth"
          component={AuthStack}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <RootStack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;

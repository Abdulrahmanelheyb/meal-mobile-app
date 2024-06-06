import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import {MealType} from "../types";

export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
  RecipeDetailScreen: MealType | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type NavigationProps<T extends keyof RootStackParamList > = NativeStackScreenProps<RootStackParamList, T>;

function AppNavigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={'Welcome'} screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Welcome" component={WelcomeScreen} />
        <RootStack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
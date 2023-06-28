import React, { useState, useEffect } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import registerNNPushToken from "native-notify";
import ThemeProvider from "./src/styles/themes";
import Home from "./src/screens/Home";



const Stack = createNativeStackNavigator();
export default function App() {
  return (
      <ThemeProvider>
      <NavigationContainer>
          <Stack.Navigator>


              <Stack.Screen name="Home" options={{headerShown: false}}>
                  {props => <Home {...props} />}
              </Stack.Screen>


          </Stack.Navigator>
      </NavigationContainer>
      </ThemeProvider>
  );
}

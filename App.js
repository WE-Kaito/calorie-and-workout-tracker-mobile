import React, { useState, useEffect } from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import registerNNPushToken from "native-notify";

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>

              <Stack.Screen name="Home" options={{headerShown: false}}>
                  {props => <Home {...props} GlobalState={GlobalState} />}
              </Stack.Screen>

          </Stack.Navigator>
      </NavigationContainer>
  );
}

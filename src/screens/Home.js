import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Backdrop from "../../assets/Backdrop";
import PagesIcon from "../../assets/PagesIcon";
import SettingsIcon from "../../assets/SettingsIcon";
import useStore from "../utils/useStore";
import { unixDate } from "../utils/useStore";
import {ThemeContext} from "../styles/themes";
import Constants from "expo-constants/src/Constants";
import themeContext from "@react-navigation/native/src/theming/ThemeContext";
import AddCalories from "../components/AddCalories/AddCalories";
import CountDisplay from "../components/CountDisplay";


export default function Home({navigation}){
    const { theme } = useContext(ThemeContext);


return (
    <View style={[styles.screen, { backgroundColor: theme.primary }]}>
        <Backdrop/>
        <CountDisplay theme={theme}/>
<AddCalories theme={theme}/>
    </View>
)



}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
});

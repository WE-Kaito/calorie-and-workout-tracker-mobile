import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Backdrop from "../../assets/Backdrop";
import PagesIcon from "../../assets/PagesIcon";
import SettingsIcon from "../../assets/SettingsIcon";
import useStore from "../utils/useStore";
import { unixDate } from "../utils/useStore";
import {ThemeContext} from "../styles/themes";

export default function Home({navigation}){
    const { theme } = useContext(ThemeContext);


return (
<Backdrop/>
)

}
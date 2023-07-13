import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {FontAwesome} from '@expo/vector-icons'
import Backdrop from "../../assets/Backdrop";
import PagesIcon from "../../assets/PagesIcon";
import SettingsIcon from "../../assets/SettingsIcon";
import useStore from "../utils/useStore";
import {ThemeContext} from "../themes";
import Constants from "expo-constants/src/Constants";
import themeContext from "@react-navigation/native/src/theming/ThemeContext";
import AddCalories from "../components/AddCalories/AddCalories";
import CountDisplay from "../components/CountDisplay";
import SettingsMoodle from "../components/SettingsMoodle/SettingsMoodle";


export default function Home({navigation}) {


    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const {theme, swap} = useContext(ThemeContext);
    const reset = useStore(state => state.resetStore); // for testing purposes
    const setCalorieGoal = useStore(state => state.setCalorieGoal);
    useEffect(() => {
        setCalorieGoal();
    }, []);

    return (

        <View style={[styles.screen, {backgroundColor: theme.primary}]}>


            <SettingsMoodle theme={theme} toggleTheme={swap.valueOf()} isSettingsVisible={isSettingsVisible}
                            setIsSettingsVisible={setIsSettingsVisible}/>

            {!isSettingsVisible && <CountDisplay theme={theme}/>}
            {!isSettingsVisible && <AddCalories theme={theme}/>}
            <Backdrop/>

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

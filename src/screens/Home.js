import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import Backdrop from "../../assets/Backdrop";
import useStore from "../utils/useStore";
import {ThemeContext} from "../themes";
import Constants from "expo-constants/src/Constants";
import AddCalories from "../components/AddCalories/AddCalories";
import CountDisplay from "../components/CountDisplay";
import SettingsMoodle from "../components/SettingsMoodle/SettingsMoodle";
import AppCalendar from "../components/Calendar/AppCalendar";


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
            {// settings sollte kein moddle sein sondern Counter ersetzen
            }
            <AppCalendar/>

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

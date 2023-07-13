import styled from "styled-components/native";
import SettingsIcon from "../../../assets/SettingsIcon";
import { useState } from "react";
import Constants from "expo-constants";
import {StyleSheet, TouchableOpacity, Text} from "react-native";
import CalorieGoalSettings from "./CalorieGoalSettings";
import {FontAwesome5} from "@expo/vector-icons";
export default function SettingsMoodle({ theme, toggleTheme, isSettingsVisible ,setIsSettingsVisible }) {



    function openClose() {
        setIsSettingsVisible(!isSettingsVisible);
    }

    return !isSettingsVisible ? (

        <SettingsButton onPress={openClose} style={styles.paddingTop}>
            <SettingsIcon />
        </SettingsButton>
    ) : (
        <MoodleContainer>
            <Moodle>
                <SettingsButton onPress={openClose} style={[styles.paddingTop, styles.paddingLeft]}>
                    <SettingsIcon />
                </SettingsButton>
<CalorieGoalSettings theme={theme}/>

                <TouchableOpacity onPress={toggleTheme} style={{width:155, height:55, backgroundColor:"green"}}>
                    <Text adjustsFontSizeToFit={true} style={{fontSize:30}}>
                        THEME <FontAwesome5 name="retweet" color={theme.secondary} solid={true}/>
                    </Text>
                </TouchableOpacity>

            </Moodle>
        </MoodleContainer>
    );
}

const SettingsButton = styled.TouchableOpacity`
  width: 67px;
  height: 67px;
  z-index: 100;
  position: absolute;
  top: 0px;
  left: 6%;
`;

const MoodleContainer = styled.View`
  flex: 1;
  z-index: ${props => props.isSettingsVisible ? "3000" : "0"};
`;

const Moodle = styled.View`
  width: 255px;
  height: 275px;
  position: absolute;
  left: -190px;
  top: -50px;
  background-color: red;
  z-index: 2000;
  border-bottom-right-radius: 200px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 20px;
`;

const styles = StyleSheet.create({
    paddingTop: {
        paddingTop: Constants.statusBarHeight,
    },
    paddingLeft: {
        paddingLeft: 10,
    }
})
import styled from "styled-components/native";
import SettingsIcon from "../../assets/SettingsIcon";
import { useState } from "react";
import Constants from "expo-constants";
import {StyleSheet, TouchableOpacity, Text} from "react-native";
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


                <TouchableOpacity onPress={toggleTheme} style={{position:"absolute", width:80, height:80, right:0, bottom:0, backgroundColor:"green"}}>
                    <Text>THEME swap</Text>
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
`;

const styles = StyleSheet.create({
    paddingTop: {
        paddingTop: Constants.statusBarHeight,
    },
    paddingLeft: {
        paddingLeft: 10,
    }
})
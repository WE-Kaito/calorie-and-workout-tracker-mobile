import React, {useEffect} from "react";
import {FontAwesome5} from "@expo/vector-icons";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import unixDate from "../../utils/unixDate";
import useStore from "../../utils/useStore";

function CalorieGoalSettings({theme}) {
    const setCalorieGoal = useStore(state => state.setCalorieGoal);
    const calorieGoals = useStore(state => state.calorieGoals);
    const todaysGoal = calorieGoals.find(
        (entry) => entry.date === unixDate()
    )?.goal;



    return (
        <View>
            <Text>
                Set Calorie Goal:
            </Text>
            <View style={{flexDirection: 'row',}}>
                <TextInput onChangeText={(e) => setCalorieGoal(parseInt(e.valueOf().substring(0, 4)))}
                           placeholder={todaysGoal.toString()}
                           style={{height: 40, width: 120, borderColor: 'gray', borderWidth: 1}}/>

                <TouchableOpacity>
                    <Text adjustsFontSizeToFit={true} style={{fontSize: 30}}>
                        <FontAwesome5 name="save" color={theme.secondary} solid={false}/>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default CalorieGoalSettings;
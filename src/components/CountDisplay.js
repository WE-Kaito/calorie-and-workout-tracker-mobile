import {useState} from 'react';
import useStore from "../utils/useStore";
import unixDate from "../utils/unixDate";
import styled from "styled-components/native";
import ConsumedList from "./ConsumedList";

function CountDisplay({theme}) {
    const { calorieGoals, history } = useStore();
    const [isListVisible, setIsListVisible] = useState(false);
console.log(unixDate());
    const todaysGoal = calorieGoals.find(
        (entry) => entry.date === unixDate()
    )?.goal;

    function getCaloriesConsumed(day = unixDate()) {
        return history.find((entry) => entry.date === day)
            ? history
                .slice()
                .filter((entry) => entry.date === day)
                .map((entry) => parseInt(entry.calories))
                .reduce((accumulator, current) => {
                    return accumulator + current;
                })
            : 0;
    }

    function getGoalExceeded() {
        return history.find((entry) => entry.date === unixDate())
            ? todaysGoal >= getCaloriesConsumed()
            : true;
    }


    return (
        <>
            <CalorieCounterButton
                theme={theme}
                onPress={(event) => {
                    setIsListVisible(!isListVisible);
                }}
            >
                <CalorieCounterText theme={theme}
                                    notExceeded={getGoalExceeded()}>
                    {(Math.abs(calorieGoals.at(-1).goal - getCaloriesConsumed())).toString()}
                    {'\n'}
                    {getGoalExceeded() ? "left" : "over"}
                </CalorieCounterText>
            </CalorieCounterButton>
            {isListVisible && <ConsumedList theme={theme} setIsListVisible={setIsListVisible}/>}
        </>
    );
}

export default CountDisplay;

export const CalorieCounterButton = styled.TouchableOpacity`
  display: flex;
    justify-content: center;
    align-items: center;
  width: 172px;
  height: 172px;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  background: ${({theme}) => theme.secondary};
  box-shadow: 0 2px 7px black;
  padding-top: 5px;
  elevation: ${100};

  position: absolute;
    top: 130px;
`;

export const CalorieCounterText = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ notExceeded, theme }) => (notExceeded ? theme.accentPositive : theme.accentNegative)};
  font-size: 36em;
  font-weight: 800;
`;
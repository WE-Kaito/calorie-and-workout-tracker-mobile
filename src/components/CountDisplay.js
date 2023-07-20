import {useState} from 'react';
import useStore from "../utils/useStore";
import styled from "styled-components/native";
import ConsumedList from "./ConsumedList";

export default function CountDisplay({theme}) {
    const [isListVisible, setIsListVisible] = useState(false);
    const calorieGoals = useStore((state) => state.calorieGoals);
    const getCaloriesConsumed = useStore(state => state.getCaloriesConsumed);
    const isGoalExceeded = useStore(state => state.isGoalExceeded);

    return (
        <>
            <CalorieCounterButton theme={theme}
                                  onPress={(event) => setIsListVisible(!isListVisible)}
            >
                <CalorieCounterText theme={theme} goalExceeded={isGoalExceeded()}>
                    {(Math.abs(calorieGoals.at(-1).goal - getCaloriesConsumed())).toString()}
                    {'\n'}
                    {isGoalExceeded() ? "over" : "left"}
                </CalorieCounterText>
            </CalorieCounterButton>
            {isListVisible && <ConsumedList theme={theme} setIsListVisible={setIsListVisible}/>}
        </>
    );
}

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
  color: ${({goalExceeded, theme}) => (goalExceeded ? theme.accentNegative : theme.accentPositive)};
  font-size: 36em;
  font-weight: 800;
`;
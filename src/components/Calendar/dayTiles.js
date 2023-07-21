import React from "react";
import useStore from "../../utils/useStore";
import unixDate from "../../utils/unixDate";
import styled from "styled-components/native";

export default function dayTiles(date) {
    const tileDate = new Date(date.year, date.month - 1, date.day);
    const roundedTileDate = tileDate.setHours(0, 0, 0, 0);
    const today = roundedTileDate === unixDate()

    const caloriesConsumed = useStore((state) => state.getCaloriesConsumed(roundedTileDate));
    const goalExceeded = useStore((state) => state.isGoalExceeded(roundedTileDate));

     function dayTileColor() {
        if (caloriesConsumed !== 0 ) {
            return goalExceeded ? 'hotpink' : 'aquamarine';
        } else {
            return null;
        }
     }

    return (
        <DayTile>
            {dayTileColor() !== null && <InnerDayTileContainer style={{backgroundColor: `${dayTileColor()}`}}/>}
            <DayTileText style={{color: today ? 'red' : null}}>
                {date.day}
            </DayTileText>

        </DayTile>
    );
}

const DayTile = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerDayTileContainer = styled.View`
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;


const DayTileText = styled.Text`
  text-align: center;
  color: black;
  font-size: 16px;
`;
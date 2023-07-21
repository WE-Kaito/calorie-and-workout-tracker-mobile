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
    const hasConsumed = caloriesConsumed !== 0;


    return (
        <DayTile onPress={() => console.error('selected day', roundedTileDate, ': ', caloriesConsumed, goalExceeded)}>
            {hasConsumed && goalExceeded && <CircleNegative/>}
            {hasConsumed && !goalExceeded && <CirclePositive/>}
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

const CircleNegative = styled.View`
  position: absolute;
  width: 35px;
  height: 35px;
  border-radius: 50%;
    background: hotpink;
`;

const CirclePositive = styled(CircleNegative)`
  background-color: aquamarine;
`;

const DayTileText = styled.Text`
  text-align: center;
  color: black;
  font-size: 16px;
`;
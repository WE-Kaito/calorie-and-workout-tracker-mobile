import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import styled from "styled-components/native";
import unixDate from "../../utils/unixDate";
import useStore from "../../utils/useStore";

LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    dayNamesShort: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    today: "today"
};

LocaleConfig.defaultLocale = 'en';

function AppCalendar() {

    function dayTiles(date) {
        const tileDate = new Date(date.year, date.month - 1, date.day);
        const roundedTileDate = tileDate.setHours(0, 0, 0, 0);

        const caloriesConsumed = useStore((state) => state.getCaloriesConsumed(roundedTileDate));
        const goalExceeded = useStore((state) => state.isGoalExceeded(roundedTileDate));

        function dayTileColor() {
            if (caloriesConsumed !== 0) {
                return goalExceeded ? 'hotpink' : 'aquamarine';
            } else {
                return null;
            }
        }

        return (
            <DayTile>
                {dayTileColor() !== null && <InnerDayTileContainer style={{backgroundColor: `${dayTileColor()}`}}/>}
                <DayTileText style={{color: roundedTileDate === unixDate() ? 'red' : null}}>
                    {date.day}
                </DayTileText>

            </DayTile>
        );
    }


    return (
        <CalendarContainer>
            <Calendar
                style={{
                    borderWidth: 0,
                    borderColor: 'none',
                    backgroundColor: 'none',
                    width: 300,
                }}
                theme={{
                    calendarBackground: 'none',
                    weekVerticalMargin: 4,
                }}
                dayComponent={({date}) => dayTiles(date)}
                hideExtraDays={true}
                enableSwipeMonths={true}
                onDayPress={day => {
                    console.log('selected day', day);
                }}

                initialDate={unixDate()}
            />
        </CalendarContainer>
    );
}

export default AppCalendar;

const CalendarContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 56.5%;
`;

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
`;
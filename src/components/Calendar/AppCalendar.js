import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import styled from "styled-components/native";
import unixDate from "../../utils/unixDate";
import useStore from "../../utils/useStore";
import dayTiles from "./dayTiles";

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

export default function AppCalendar() {

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

                initialDate={unixDate()}
            />
        </CalendarContainer>
    );
}

const CalendarContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 56.5%;
`;

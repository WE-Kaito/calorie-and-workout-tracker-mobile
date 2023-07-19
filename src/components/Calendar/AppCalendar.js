import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

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

    return (
        <Calendar
            // Customize the appearance of the calendar
            style={{
                borderWidth: 0,
                borderColor: 'none',
                height: 50,
                backgroundColor: 'none',
                margin: 12,
            }}
            theme={{
                calendarBackground: 'none',
            }}
            // Specify the current date
            current={'2012-03-01'}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
                console.log('selected day', day);
            }}
            // Mark specific dates as marked
            markedDates={{
                '2023-07-10': {selected: true, marked: true, selectedColor: 'hotpink'},
            }}
            initialDate={new Date().toString()}
        />
    );
}

export default AppCalendar;
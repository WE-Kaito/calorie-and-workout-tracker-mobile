import {useState} from 'react';
import {CalorieCounterButton, CalorieCounterText} from "../styles/styles.js";
import useStore from "../utils/useStore";

function CountDisplay({theme}) {
    const { calorieGoals, history, unixDate } = useStore();
    const [isListVisible, setIsListVisible] = useState(false);

    const todaysGoal = calorieGoals.find(
        (entry) => entry.date === unixDate
    )?.goal;

    function getCaloriesConsumed(day = unixDate) {
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
        return history.find((entry) => entry.date === unixDate)
            ? todaysGoal >= getCaloriesConsumed()
            : true;
    }

    return (
        <CalorieCounterButton
            theme={theme}
            onClick={(event) => {
                event.stopPropagation();
                history.find((entry) => entry.date === unixDate) &&
                setIsListVisible(!isListVisible);
            }}
        >
            <CalorieCounterText theme={theme}
                                notExceeded={getGoalExceeded()}>
            {Math.abs(calorieGoals.at(-1).goal - getCaloriesConsumed())}
            {'\n'}
            {getGoalExceeded() ? "left" : "over"}
            </CalorieCounterText>
        </CalorieCounterButton>
    );
}

export default CountDisplay;
import {uid} from "uid";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import unixDate from "./unixDate";
import {FIRESTORE_DB} from "../../firebaseConfig.js";
import {doc, setDoc, deleteDoc} from "firebase/firestore";

type HistoryEntry = {
    id: string;
    date: number;
    meal: string;
    calories: string;
    time_stamp: string;
};

type CalorieGoal = {
    date: number;
    goal: number;
}

type Dish = {
    meal: string,
    calories: string,
    mass: string,
    proteins: string,
    carbs: string,
    fats: string,
    notes: string,
}

type Exercise = {
    id: string,
    workout: string,
    title: string,
    sets: number,
    reps: number,
    weight: number,
    time: string,
    notes: string,
}

type State = {
    history: HistoryEntry[];
    calorieGoals: CalorieGoal[];
    dishes: Dish[]; // Add appropriate type for dishes
    exercises: Exercise[]; // Add appropriate type for exercises
    routine: any; // Add appropriate type for routine
    routineDisplay: any[]; // Add appropriate type for routineDisplay
    completedWorkouts: any[]; // Add appropriate type for completedWorkouts
    savedTheme: Theme;
    saveTheme: (theme: any) => void; // Add appropriate type for theme
    setCalorieGoal: (userInput?: number) => Promise<void>;
    addHistoryEntry: (
        caloriesInput: number,
        mealInput?: string
    ) => Promise<void>;
    resetStore: () => void;
    deleteHistoryEntry: (entryToDelete: HistoryEntry) => Promise<void>;
    getCaloriesConsumed: (day?: number) => number;
    isGoalExceeded: (day?: number) => boolean;
    addDish: (
        mealInput: string,
        caloriesInput: number,
        massInput?: number,
        proteinsInput?: number,
        carbsInput?: number,
        fatsInput?: number,
        notesInput?: string
    ) => Promise<void>;
    deleteDish: (dishToDelete: any) => Promise<void>; // Add appropriate type for dishToDelete
    addWorkout: (workoutTitle: string) => void; // Add appropriate type for workoutTitle
    addExercise: (workoutTitle: string) => Promise<void>; // Add appropriate type for workoutTitle
    setExercise: (id: string, index: number, formData: any) => Promise<void>; // Add appropriate type for formData
    deleteWorkout: (workoutTitle: string) => void; // Add appropriate type for workoutTitle
    deleteExercise: (id: string) => void; // Add appropriate type for id
    setRoutine: (routineArr: any[]) => void; // Add appropriate type for routineArr
    setRoutineDisplay: (routineArr: any[]) => void; // Add appropriate type for routineArr
    setCompletedWorkouts: (date: string) => void; // Add appropriate type for date
};

type Theme = {
    primary: string;
    secondary: string;
    tertiary: string;
    black: string;
    white: string;
    accentPositive: string;
    accentNegative: string;
    backAlt: string;
    positive: string;
    negative: string;
    whiteAlt: string;
};

const useStore = create<State>()(
    persist(
        (set, get) => {
            const hour: number = new Date().getHours();
            const minute: number = new Date().getMinutes();

            return {
                history: [],
                calorieGoals: [{date: unixDate(), goal: 1600}],
                dishes: [],
                exercises: [],
                routine: [],
                routineDisplay: [],
                completedWorkouts: [],
                savedTheme: {
                    primary: "#6E85B7",
                    secondary: "#14244E",
                    tertiary: "#F8F9D7",
                    black: "#191A1C",
                    white: "ghostwhite",
                    accentPositive: "aquamarine",
                    accentNegative: "lightcoral",
                    backAlt: "#c4d7e0",
                    positive: "#00A36C",
                    negative: "crimson",
                    whiteAlt: "#D9D9D9",
                },

                saveTheme: (theme: Theme) => {
                    set(({savedTheme: theme}));
                },

                setCalorieGoal: async (userInput: number) => {
                    const newGoal =
                        userInput !== undefined
                            ? userInput
                            : get().calorieGoals.at(-1).goal;

                    set((state): { calorieGoals: CalorieGoal[] } => ({
                        calorieGoals: [
                            ...state.calorieGoals
                                .filter((goalEntry: CalorieGoal) => goalEntry.date !== unixDate()),
                            {date: unixDate(), goal: newGoal},
                        ],
                    }));
                    try {
                        const ref = doc(FIRESTORE_DB, `calorieGoals/${unixDate()}`);
                        await setDoc(ref, {
                            date: unixDate(),
                            goal: newGoal
                        });
                    } catch (error) {
                        console.log("Error setting goal: ", error);
                    }
                },

                addHistoryEntry: async (caloriesInput: number, mealInput : string = "⚡️ ---") => {
                    const entry = {
                        id: uid(),
                        date: unixDate(),
                        meal: `${mealInput}`,
                        calories: `${caloriesInput}`,
                        time_stamp: `${hour < 10 ? "0" + hour : hour}:${
                            minute < 10 ? "0" + minute : minute
                        }`,
                    };
                    const previousHistory: HistoryEntry[] = get().history;
                    set({history: [...previousHistory, entry]});
                    try {
                        const ref = doc(FIRESTORE_DB, `history/${entry.id}`);
                        await setDoc(ref, entry);
                    } catch (error) {
                        console.log("Error adding entry: ", error);
                    }
                },

                resetStore: () => // currently only for testing
                    set(() => ({
                        history: [],
                        calorieGoals: [{date: unixDate(), goal: 1600}],
                        dishes: [],
                        exercises: [],
                        routine: [],
                        routineDisplay: [],
                        completedWorkouts: [],
                    })),


                deleteHistoryEntry: async (entryToDelete) => {
                    set((state) => ({
                        history: state.history.filter(
                            (entry) => entry.id !== entryToDelete.id
                        ),
                    }));
                    try {
                        const ref = doc(FIRESTORE_DB, `history/${entryToDelete.id}`);
                        await deleteDoc(ref);
                    } catch (error) {
                        console.log("Error deleting entry: ", error);
                    }
                },

                getCaloriesConsumed: (day : number = unixDate()) : number => {
                    return get().history.find((entry) => entry.date === day)
                        ? get().history
                            .slice()
                            .filter((entry) => entry.date === day)
                            .map((entry) => parseInt(entry.calories))
                            .reduce((accumulator, current) => {
                                return accumulator + current;
                            })
                        : 0;
                },

                isGoalExceeded: (day: number = unixDate()) : boolean => {

                    const todaysGoal : number = get().calorieGoals
                        .find((entry) => entry.date === unixDate())?.goal;

                    return get().history.find((entry) => entry.date === unixDate())
                        ? todaysGoal <= get().getCaloriesConsumed(day)
                        : false;
                },

                addDish: async (
                    mealInput : string,
                    caloriesInput : number,
                    massInput : number = 0,
                    proteinsInput : number = 0,
                    carbsInput : number = 0,
                    fatsInput : number = 0,
                    notesInput : string = ""
                ) => {
                    const dish: Dish = {
                        meal: `${mealInput}`,
                        calories: `${caloriesInput}`,
                        mass: `${massInput}`,
                        proteins: `${proteinsInput}`,
                        carbs: `${carbsInput}`,
                        fats: `${fatsInput}`,
                        notes: `${notesInput}`,
                    }
                    set((state) => ({
                        dishes: [dish, ...state.dishes],
                    }));
                    try {
                        const ref = doc(FIRESTORE_DB, `dishes/${mealInput}`);
                        await setDoc(ref, {dish});
                    } catch (error) {
                        console.log("Error adding dish: ", error);
                    }

                },

                deleteDish: async (dishToDelete: Dish) => {
                    set((state) => ({
                        dishes: state.dishes
                            .slice()
                            .filter((dish) => dish !== dishToDelete),
                    }));
                    try {
                        const ref = doc(FIRESTORE_DB, `history/${dishToDelete.meal}`);
                        await deleteDoc(ref);
                    } catch (error) {
                        console.log("Error deleting entry: ", error);
                    }
                },

                addWorkout: (workoutTitle) =>
                    set((state) => ({
                        exercises: [
                            {
                                id: uid(),
                                workout: workoutTitle,
                                title: " NEW ",
                                sets: 0,
                                reps: 0,
                                weight: 0,
                                time: "00:00",
                                notes: "",
                            },
                            ...state.exercises,
                        ],
                    })),

                addExercise: async (workoutTitle : string) => {
                    const id = uid();
                    const newExercise : Exercise = {
                        id: id,
                        workout: workoutTitle,
                        title: " NEW ",
                        sets: 0,
                        reps: 0,
                        weight: 0,
                        time: "00:00",
                        notes: "",
                    }
                    set((state) => ({
                        exercises: [
                            ...state.exercises,
                            newExercise,
                        ],
                    }));
                    try {
                        const ref = doc(FIRESTORE_DB, `exercises/${id}`);
                        await setDoc(ref, {newExercise});
                    } catch (error) {
                        console.log("Error adding exercise: ", error);
                    }
                },

                setExercise: async (id :string, index : number, formData: Exercise) => {
                    const exercises = get().exercises;
                    exercises.splice(index, 1, formData);
                    set(() => ({
                        exercises: exercises,
                    }));
                    try {
                        const ref = doc(FIRESTORE_DB, `exercises/${id}`);
                        await setDoc(ref, {formData});
                    } catch (error) {
                        console.log("Error setting exercise: ", error);
                    }
                },

                deleteWorkout: (workoutTitle : string) => {
                    const exercises = useStore
                        .getState()
                        .exercises.filter((exercise) => exercise.workout !== workoutTitle);
                    set(() => ({
                        exercises: exercises,
                    }));
                },

                deleteExercise: (id : string) =>
                    set((state) => ({
                        exercises: state.exercises.filter((exercise) => exercise.id !== id),
                    })),

                setRoutine: (routineArr : any) => {
                    const calendarRoutine = [];

                    const datedWorkouts = routineArr.map((workout: Exercise, index) => ({
                        id: workout.id,
                        workout: workout.workout,
                        date: unixDate() + index * 86400000,
                    }));

                    for (let i = 0; i < 100; i++) {
                        datedWorkouts.forEach((workout) => {
                            if (calendarRoutine.length < 1000) {
                                    calendarRoutine.push({
                                        id: workout.id,
                                        workout: workout.workout,
                                        date: workout.date + i * (datedWorkouts.length * 86400000),
                                    });
                            }
                        });
                    }
                    set(() => ({
                        routine: calendarRoutine,
                    }));
                },

                setRoutineDisplay: (routineArr) => {
                    set(() => ({
                        routineDisplay: routineArr,
                    }));
                },
                setCompletedWorkouts: (date) => {
                    set((state) => ({
                        completedWorkouts: [...state.completedWorkouts, {date: date}],
                        routine: state.routine.filter((workout) => workout.date !== date),
                    }));
                },
            };
        },
        {
            name: "trackedDataStorage",
            storage: {
                getItem: async (key) => {
                    const value = await SecureStore.getItemAsync(key);
                    return value ? JSON.parse(value) : undefined;
                },
                setItem: async (key, value) => {
                    await SecureStore.setItemAsync(key, JSON.stringify(value));
                },
                removeItem: async (key) => {
                    await SecureStore.deleteItemAsync(key);
                },

            },

        }
    )
);

export default useStore;

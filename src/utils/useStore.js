import {uid} from "uid";
import {create} from "zustand";
import {persist} from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import unixDate from "./unixDate";

import {FIRESTORE_DB} from "../../firebaseConfig.js";
import {doc, setDoc, deleteDoc} from "firebase/firestore";

const useStore = create(
    persist(
        (set, get) => {
            const hour = new Date().getHours();
            const minute = new Date().getMinutes();

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

                saveTheme: (theme) => {
                    set(({savedTheme: theme}));
                },

                setCalorieGoal: async (userInput) => {
                    const newGoal =
                        userInput !== undefined
                            ? userInput
                            : get().calorieGoals.at(-1).goal;

                    set((state) => ({
                        calorieGoals: [
                            ...state.calorieGoals
                                .filter((goalEntry) => goalEntry.date !== unixDate()),
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

                addHistoryEntry: async (caloriesInput, mealInput = "⚡️ ---") => {
                    const entry = {
                        id: uid(),
                        date: unixDate(),
                        meal: `${mealInput}`,
                        calories: `${caloriesInput}`,
                        time_stamp: `${hour < 10 ? "0" + hour : hour}:${
                            minute < 10 ? "0" + minute : minute
                        }`,
                    };
                    const previousHistory = get().history;
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

                addDish: async (
                    mealInput,
                    caloriesInput,
                    massInput = 0,
                    proteinsInput = 0,
                    carbsInput = 0,
                    notesInput = ""
                ) => {
                    const dish = {
                        meal: `${mealInput}`,
                        calories: `${caloriesInput}`,
                        mass: `${massInput}`,
                        proteins: `${proteinsInput}`,
                        carbs: `${carbsInput}`,
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

                deleteDish: async (dishToDelete) => {
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

                addExercise: async (workoutTitle) => {
                    const id = uid();
                    const newExercise = {
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

                setExercise: async (id, index, formData) => {
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

                deleteWorkout: (workoutTitle) => {
                    const exercises = useStore
                        .getState()
                        .exercises.filter((exercise) => exercise.workout !== workoutTitle);
                    set(() => ({
                        exercises: exercises,
                    }));
                },

                deleteExercise: (id) =>
                    set((state) => ({
                        exercises: state.exercises.filter((exercise) => exercise.id !== id),
                    })),

                setRoutine: (routineArr) => {
                    const calendarRoutine = [];

                    const datedWorkouts = routineArr.map((workout, index) => ({
                        id: workout.id,
                        workout: workout.workout,
                        date: unixDate + index * 86400000,
                    }));

                    for (let i = 0; i < 100; i++) {
                        datedWorkouts.forEach((workout) => {
                            if (calendarRoutine.length < 1000) {
                                if (true) {
                                    calendarRoutine.push({
                                        id: workout.id,
                                        workout: workout.workout,
                                        date: workout.date + i * (datedWorkouts.length * 86400000),
                                    });
                                }
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

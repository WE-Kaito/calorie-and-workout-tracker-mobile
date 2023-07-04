import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { AddEntryContainer, StyledInput } from "../../styles/styles";
import { ThemeContext } from "../../styles/themes";
import { FontAwesome5 } from '@expo/vector-icons';
import useStore from "../../utils/useStore";
import PlusButton from "./PlusButton";

function AddCalories({ theme }) {
    const { addHistoryEntry} = useStore();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [meal, setMeal] = useState("");
    const [kcal, setKcal] = useState(0);

    function handleSubmit() {
        meal !== "" ? addHistoryEntry(kcal, meal) : addHistoryEntry(kcal);
    }

    return (
        !isFormOpen ? (
            <PlusButton theme={theme} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} handleSubmit={handleSubmit} />
        ) : (
            <AddEntryContainer theme={theme}>
                <StyledInput onChangeText={(e) => setMeal(e.valueOf().substring(0,20))} placeholder="meal" placeholderTextColor={theme.primary} theme={theme} />
                <StyledInput onChangeText={(e) => setKcal(parseInt(e.valueOf().substring(0,4)))} placeholder="kcal" placeholderTextColor={theme.primary} theme={theme} />
                <PlusButton theme={theme} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} handleSubmit={handleSubmit} />
            </AddEntryContainer>
        )
    );
}

export default AddCalories;

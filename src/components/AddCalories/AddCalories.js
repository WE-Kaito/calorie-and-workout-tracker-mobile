import React, {useState} from 'react';
import useStore from "../../utils/useStore";
import PlusButton from "./PlusButton";
import styled from "styled-components/native";

function AddCalories({theme}) {
    const addHistoryEntry = useStore(state => state.addHistoryEntry);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [meal, setMeal] = useState("");
    const [kcal, setKcal] = useState(0);

    function handleSubmit() {
        (meal !== "" ? addHistoryEntry(kcal, meal) : addHistoryEntry(kcal));
        setMeal("");
        setKcal(0);
    }

    return (
        !isFormOpen ? (
            <PlusButton theme={theme} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}
                        handleSubmit={handleSubmit}/>
        ) : (
            <AddEntryContainer theme={theme}>
                <StyledInput onChangeText={(e) => setMeal(e.valueOf().substring(0, 20))} placeholder="meal"
                             placeholderTextColor={theme.primary} theme={theme}/>
                <StyledInput onChangeText={(e) => setKcal(parseInt(e.valueOf().substring(0, 4)))} placeholder="kcal"
                             placeholderTextColor={theme.primary} theme={theme}/>
                <PlusButton theme={theme} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen}
                            handleSubmit={handleSubmit}/>
            </AddEntryContainer>
        )
    );
}

export default AddCalories;

export const AddEntryContainer = styled.View`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.backAlt};
  gap: 14px;

  width: 260px;
  height: 210px;
  border-radius: 25px;
  border: 3px solid ${({theme}) => theme.secondary};

  elevation: ${100};

  box-shadow: 0 2px 3px black;
  padding-bottom: 68px;
  top: 140px;
`;

export const StyledInput = styled.TextInput`
  display: flex;
  text-align: center;
  width: 200px;
  height: 32px;
  background-color: ${({theme}) => theme.tertiary};
  border-radius: 6px;
  border: 1.5px solid ${({theme}) => theme.secondary};
`;
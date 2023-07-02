import React from 'react';
import {FontAwesome5} from "@expo/vector-icons";
import {StyledPlusButton} from "../../styles/styles";

function PlusButton({theme, isFormOpen, setIsFormOpen, handleSubmit}) {

    return (
        <StyledPlusButton theme={theme} isFormOpen={isFormOpen} onPress={() => {
            isFormOpen && handleSubmit();
            setIsFormOpen(!isFormOpen);
        }}>
            <FontAwesome5 name="plus" size={20} color={theme.secondary} solid={true} style={{fontWeight: '100'}}/>
        </StyledPlusButton>
    );
}

export default PlusButton;
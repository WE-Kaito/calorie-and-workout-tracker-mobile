import React from 'react';
import {FontAwesome5} from "@expo/vector-icons";
import styled from "styled-components/native";

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

export const StyledPlusButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${({isFormOpen}) => isFormOpen ? "127px" : "270px"};
  background-color: ${({theme}) => theme.tertiary};
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-style: italic;
  font-weight: bold;

  elevation: ${100};
  box-shadow: 0 2px 3px black;
`;


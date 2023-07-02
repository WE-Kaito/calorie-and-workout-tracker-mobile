import styled from "styled-components/native";

// AddCalories.js =>
///////////////////////////////////////////////
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

  elevation: 100;
  box-shadow: 0 2px 3px black;
`;

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

  elevation: 100;

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
///////////////////////////////////////////////


///////////////////////////////////////////////
// CountDisplay.js =>
export const CalorieCounterButton = styled.TouchableOpacity`
  display: flex;
    justify-content: center;
    align-items: center;
  width: 172px;
  height: 172px;
  border: none;
  border-radius: 100%;
  cursor: pointer;
  background: ${({theme}) => theme.secondary};
  box-shadow: 0 2px 7px black;
  padding-top: 5px;
  elevation: 100;

  position: absolute;
    top: 130px;
`;

export const CalorieCounterText = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: ${({ notExceeded, theme }) => (notExceeded ? theme.accentPositive : theme.accentNegative)};
  font-size: 36em;
  font-weight: 800;
`;
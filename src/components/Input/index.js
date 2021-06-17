import React from 'react';
import styled from 'styled-components';


export const Input = ({ ...rest }) => {
    return (
        <StyledInput {...rest}></StyledInput>
    )
}


const StyledInput = styled.input`
    height: 35px;
    background-color: transparent;
    border: solid 1px #c5c5c5;
    border-radius: 5px;
    padding: 0 5px
`
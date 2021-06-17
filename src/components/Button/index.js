import React from 'react';
import styled from 'styled-components';

export const Button = ({title,deleteColor = false, ...rest}) =>{
    return(
        <StyledButton {...rest} deleteColor={deleteColor}>
            <span>{title}</span>
        </StyledButton>
    )
}

const StyledButton = styled.button`
    background-color:${props => props.deleteColor ? '#c72b2b' : '#4CAF50'} ;
    border: none;
    color: white;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 15px;
    cursor: pointer;
    border-radius: 5px;
    margin: 0 10px;
`
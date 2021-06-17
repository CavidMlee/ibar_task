import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled, { keyframes } from 'styled-components';

export const UndoData = forwardRef(({ undo }, ref) => {
    const [show, setShow] = useState(false)
    const [done, setDone] = useState(false)

    useImperativeHandle(ref, () => ({

        showUndoPanel(show) {
            setShow(show)
            setDone(false)
        }

    }));

    const onUndoItems = () => {
        undo()
        setDone(true)
    }
    return (
        <div>
            {show &&
                <Container >
                    <BodyContainer >
                        <div className='cancle_btn' onClick={() => setShow(false)}>X</div>
                        {done ? <span>Geri qaytarıldı</span>
                            : <div className='undo_btn' onClick={onUndoItems} >Geri qaytar</div>
                        }
                    </BodyContainer>

                </Container>
            }
        </div>

    )
})
const center = `
    display: flex;
    justify-content: center;
    align-items: center;
`
const swingViewport = keyframes`
    from {
      transform: translateX(-300px);
    }
    to {
      transform: translateX(0px);
    }
  `

const Container = styled.div`
    position:absolute;
    bottom: 50px;
    left: 20px;
    width: 250px;
    height: 80px;
    background-color: rgb(216 227 255);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    animation: 1s ease-in-out ${swingViewport};
    display: block;
    border-bottom: 4px solid rgb(60, 97, 197);
`
const BodyContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    ${center}
    .cancle_btn{
        position: absolute;
        top:5px;
        right: 10px;
        color:black;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
    
    }
    .undo_btn{
        width: 100px;
        height: 40px;
        background-color: rgb(37, 90, 236);
        color:white;
        border-radius: 5px;
        ${center}
        cursor: pointer;
    }
`
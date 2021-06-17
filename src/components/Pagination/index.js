import React from 'react';
import styled from 'styled-components';

export const Pagination = ({ maxPages, currentPage, setCurrentPage }) => {


    let items = [];
    let leftSide = currentPage - 2;
    if (leftSide <= 0) { leftSide = 1 };
    let rightSide = currentPage + 2;
    if (rightSide > maxPages) { rightSide = maxPages };
    for (let number = leftSide; number <= rightSide; number++) {
        items.push(
            <RoundEffect key={number} active={number === currentPage} onClick={() => { setCurrentPage(number) }}>
                {number}
            </RoundEffect>,
        );
    }
    const nextPage = () => {
        if (currentPage < maxPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const paginationRender = (
        <Container>
            <div className="paginate-ctn">
                <RoundEffect onClick={prevPage}> &lsaquo; </RoundEffect>
                {items}
                <RoundEffect  onClick={nextPage}> &rsaquo; </RoundEffect>
            </div>
        </Container>
    );
    return (paginationRender);
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &>div{
      padding-top:10px;
  }
  .paginate-ctn{
    display: flex;
  }

`

const RoundEffect = styled.div`
  color: ${props=>props.active ? 'white' : ' rgb(37, 90, 236)'};
  background-color: ${props=>props.active ? 'rgb(37, 90, 236)' : '#FFF'} ;
  cursor:pointer;
  font-size:16px;
  display:flex;
  justify-content: center;
  align-items: center;
  padding:10px;
  border-radius: 20%;
  height: 30px;
  width: 30px;
  margin:5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  text-decoration: none;
  &:hover{
    text-decoration: none;
    background:rgb(37, 90, 236);
    color:#FFF;  
    a{
     text-decoration: none;
     color:#FFF;
    }
  }
`
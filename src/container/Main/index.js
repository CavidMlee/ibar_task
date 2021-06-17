import React, { useState, useEffect, useRef } from 'react';
import json from '../../data/index.json';
import { Pagination, UndoData, Button, Input } from '../../components';
import styled from 'styled-components';


const rowCount = 10
let allDeletedItem = []
let lastDeleteItems = []
let allEditItems = []


const Main = () => {

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [firstData, setFirstData] = useState([])
    const [editItem, setEditItem] = useState(null)
    const [checkedItems, setCheckedItems] = useState([])


    const undoRef = useRef();


    useEffect(() => {
        setFirstData(json)
    }, [])

    useEffect(() => {
        const sortFirstData = firstData.sort((a, b) => a.id - b.id);
        setData(sortFirstData.slice(page * rowCount - rowCount, page * rowCount))
    }, [page, firstData])

    const onHandleEdit = (item) => {
        setEditItem(item)
    }

    const onSubmite = (event) => {
        event.preventDefault();

        const form = event.target;
        const formdata = new FormData(form);

        let newData = [...firstData]
        let index = newData.findIndex(item => item.id.toString() === formDataValue(formdata).id)

        if (index > -1) {
            const item = newData[index];

            const baseDataSort = Object.keys(item).sort().reduce(
                (obj, key) => {
                    obj[key] = item[key];
                    return obj;
                },
                {}
            );

            const changeDataSort = Object.keys(formDataValue(formdata)).sort().reduce(
                (obj, key) => {
                    obj[key] = formDataValue(formdata)[key];
                    return obj;
                },
                {}
            );

            if (Object.entries(baseDataSort).toString() === Object.entries(changeDataSort).toString()) {
                setEditItem(null)
                alert('Məlumatlar eyni olduğu üçün yenilənmə olmadı')
            }
            else {
                newData.splice(index, 1, { ...item, ...formDataValue(formdata) })
                setFirstData(newData)
                allEditItems = [...allEditItems, { ...item, ...formDataValue(formdata) }]
            }

        }


    }

    const formDataValue = (fd) => {
        const data = {};
        for (let key of fd.keys()) {
            data[key] = fd.get(key);
        }
        return data;
    }


    const onHandleDelete = async () => {

        let dataCopy = firstData
        lastDeleteItems = []
        for (let i = 0; i < checkedItems.length; i++) {

            const deletedItem = [...dataCopy.splice(firstData.map(item => { return item.id.toString() }).indexOf(checkedItems[i]), 1)]
            allDeletedItem = [...allDeletedItem, ...deletedItem];
            lastDeleteItems = [...lastDeleteItems, ...deletedItem];

            let allEditItemsIndex = allEditItems.map(item => { return item.id.toString() }).indexOf(checkedItems[i])
            if (allEditItemsIndex > -1) {
                allEditItems.splice(allEditItemsIndex, 1)
            }
        }

        setCheckedItems([])
        setFirstData([...dataCopy])

        undoRef.current.showUndoPanel(true)

    }

    const onUndoItem = () => {
        setFirstData([...firstData, ...lastDeleteItems])

        for (let i = 0; i < lastDeleteItems.length; i++) {
            allDeletedItem.splice(allDeletedItem.map(item => { return item.id.toString() }).indexOf(lastDeleteItems[i]), 1)
        }
    }


    const onCheckedRow = (event, id) => {

        let checked = event.target.checked;

        if (event.target.name === 'all') {
            if (!checked) {
                setCheckedItems([])
            }
            else {
                const notInclude = data.filter(item => !checkedItems.includes(item.id.toString())).map(i => { return i.id.toString() })
                setCheckedItems([
                    ...checkedItems,
                    ...notInclude

                ])
            }

        }
        else {
            if (checkedItems.includes(id.toString())) {
                if (checked === false) {
                    const checkItemsCopy = [...checkedItems]
                    checkItemsCopy.splice(checkedItems.indexOf(id.toString()), 1);
                    setCheckedItems(checkItemsCopy);
                }
            }
            else {
                setCheckedItems([...checkedItems, event.target.name]);
            }

        }
    }

    const handleSerchItem = (e) => {
        const filterData = json.filter(item => item.title.toUpperCase().includes(e.target.value.toUpperCase() || ''))

        Promise.all(filterData).then(function (results) {
            setFirstData(results)
        })
    }

    return (
        <Container >
            <SearchContainer>
                <label>Search title: </label>
                <Input name='search' onChange={handleSerchItem} />
            </SearchContainer>
            <form id='table_form' onSubmit={(e) => onSubmite(e)}></form>
            <StyledTable>
                <thead>
                    <tr>
                        <th><input type="checkbox" checked={checkedItems.length >= data.length} id="all" name="all" onChange={(e) => onCheckedRow(e)} /></th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Date of birth</th>
                        <th>Position</th>
                        <th>Phone number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => {
                        const { id, name, surname,dateOfBirth,position,phoneNumber } = item


                        return (
                            <tr key={id}>
                                {id === editItem?.id ?
                                    <>
                                        <td><input hidden type="checkbox" id={id} checked={false} name={id} onChange={(e) => onCheckedRow(e)} /></td>

                                        <td>
                                            {id}
                                            <Input
                                                name='id'
                                                defaultValue={id}
                                                onChange={() => { }}
                                                hidden
                                                form='table_form'
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                defaultValue={name || " "}
                                                onChange={() => { }}
                                                name={`name`}
                                                form='table_form'
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                defaultValue={surname || " "}
                                                onChange={() => { }}
                                                name={`surname`}
                                                form='table_form'
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                defaultValue={dateOfBirth || " "}
                                                onChange={() => { }}
                                                name={`dateOfBirth`}
                                                form='table_form'
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                defaultValue={position || " "}
                                                onChange={() => { }}
                                                name={`position`}
                                                form='table_form'
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                defaultValue={phoneNumber || " "}
                                                onChange={() => { }}
                                                name={`phoneNumber`}
                                                form='table_form'
                                            />
                                        </td>

                                        <td>
                                            <Button form='table_form' type="submit" title='Save' />
                                            <Button onClick={() => setEditItem(null)} title='Cancel' />
                                        </td>

                                    </>
                                    :
                                    <>
                                        <td><input type="checkbox" checked={checkedItems.includes(id.toString())} id={id} name={id} onChange={(e) => onCheckedRow(e, id)} /></td>
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{surname}</td>
                                        <td>{dateOfBirth}</td>
                                        <td>{position}</td>
                                        <td>{phoneNumber}</td>

                                    </>
                                }
                                {id !== editItem?.id && <td>
                                    <Button type='button' onClick={() => onHandleEdit(item)} title='Edit' />

                                </td>
                                }


                            </tr>
                        )
                    })}

                </tbody>
            </StyledTable>

            <Button deleteColor onClick={onHandleDelete} title='Delete' />

            <Button onClick={() => console.log({ 'updated': allEditItems, 'deleted': allDeletedItem })} title='Submite' />

            <div>
                <Pagination currentPage={page} setCurrentPage={setPage} maxPages={Math.ceil(firstData.length / 10)} />
            </div>
            <UndoData ref={undoRef} undo={e => onUndoItem(e)} />

        </Container>
    )
}

export default Main;

const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;
`

const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    margin:50px 0;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    
  td, th {
    text-align: left;
    padding: 8px
    }
  th {
    background-color: rgb(82 116 210);
    color: white;
    }
  tr:nth-child(even)
    {background-color: #f2f2f2}

`
const SearchContainer = styled.div`
    margin-top:30px;
`
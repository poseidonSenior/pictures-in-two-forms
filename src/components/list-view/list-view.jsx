import React from 'react';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setData, setSort } from '../../store/actions';
import { ListCards } from './cards/list-cards';
import { useState } from 'react';

import './list-view.css';
import { Pagination } from '../pagination/pagination';
import { Loader } from '../loader/loader';
import { TreeView } from './tree-view/tree-view';


export function ListView() {
    const [currentPage, setCurrentPage] = useState(1)
    const [picturePerPage] = useState(10)
    const [viewSelect, setViewSelect] = useState(true)


    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const sort = useSelector(state => state.sort)
    const loading = useSelector(state => state.loading)

    const lastPageIndex = currentPage * picturePerPage;
    const firstPageIndex = lastPageIndex - picturePerPage;
    const currentData = data.slice(firstPageIndex, lastPageIndex)

    const identicalFields = () => {
        const newArrData = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data.length; j++) {
                newArrData.push(data[j].category)
            }
            const uniq = new Set(newArrData)
            return [...uniq];
        }
    }
    const pictureCategories = identicalFields();

    const treeViewData = () => {
        let filteredData = [];
        let convertedData = [];
        if (pictureCategories) {
            for (let i = 0; i < pictureCategories.length; i++) {
                convertedData[i] = [];
                for (let j = 0; j < data.length; j++) {
                    if (pictureCategories[i] === data[j].category) {
                        filteredData = data.filter(e => e.category === pictureCategories[i])
                    }
                }
                convertedData[i] = [...filteredData];
            }
            return convertedData.map((x, i) => ({ value: pictureCategories[i], source: x }))
        }
    }
    const treeData = treeViewData();

    useEffect(() => {
        if (localStorage.getItem('data')) {
            dispatch(setData(JSON.parse(localStorage.getItem('data'))));
            dispatch(setSort(localStorage.getItem('sort')));
        } else {
            dispatch(fetchData())
        }
    }, [])

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const deleteCard = (uniqId) => {
        setTimeout(() => {
            const dataFilter = data.filter(e => e.image !== uniqId);
            dispatch(setData(dataFilter))
            localStorage.setItem('data', JSON.stringify(dataFilter))
        }, 1000);
    }

    const returnAllCards = () => {
        dispatch(fetchData())
        dispatch(setSort('name'))
    }

    const dataSorting = (sortId) => {
        switch (sortId) {
            case 'category':
                const newDataCategory = [...data].sort((a, b) => new Intl.Collator('en-US').compare(a.category, b.category))
                return (
                    dispatch(setData(newDataCategory)),
                    dispatch(setSort(sortId)),
                    localStorage.setItem('data', JSON.stringify(newDataCategory)),
                    localStorage.setItem('sort', 'category')
                )
            case 'timestamp':
                const newDataTimestamp = [...data].sort((a, b) => a.timestamp - b.timestamp)
                return (
                    dispatch(setData(newDataTimestamp)),
                    dispatch(setSort(sortId)),
                    localStorage.setItem('data', JSON.stringify(newDataTimestamp)),
                    localStorage.setItem('sort', 'timestamp')
                )
            case 'name':
                const newDataImage = [...data].sort((a, b) => new Intl.Collator('en-US').compare(a.image, b.image))
                return (
                    dispatch(setData(newDataImage)),
                    dispatch(setSort(sortId)),
                    localStorage.setItem('data', JSON.stringify(newDataImage))),
                    localStorage.setItem('sort', 'name')
            case 'filesize':
                const newDataFilesize = [...data].sort((a, b) => a.filesize - b.filesize)
                return (
                    dispatch(setData(newDataFilesize)),
                    dispatch(setSort(sortId)),
                    localStorage.setItem('data', JSON.stringify(newDataFilesize))),
                    localStorage.setItem('sort', 'filesize')
            default:
                return null
        }
    }

    const isViewSelected = (viewSelectedId) => {
        switch (viewSelectedId) {
            case 'cardView':
                setViewSelect(true);
                break;
            case 'viewTreeList':
                setViewSelect(false);
                break;
            default:
                return null
        }
    }

    return (
        <div className='list-view-wrapper'>
            <Header dataSorting={dataSorting} sort={sort} viewSelect={viewSelect} isViewSelected={isViewSelected} />
            {viewSelect ? !loading ? <Loader /> : <div>
                <ListCards internalData={currentData} deleteCard={deleteCard} />
                <Pagination picturePerPage={picturePerPage} totalPicturies={data.length} paginate={paginate} currentPage={currentPage} />
            </div> : <TreeView treeData={treeData} />}
            <Footer returnAllCards={returnAllCards} viewSelect={viewSelect} />
        </div>
    );

}
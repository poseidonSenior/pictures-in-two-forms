import React, { useRef } from 'react';

import './header.css'

export function Header(props) {
    const refCategory = useRef()
    const refTimestamp = useRef()
    const refName = useRef()
    const refFilesize = useRef()

    if (!props.viewSelect || props.isBbuttonPressed) {
        refCategory.current.checked = false;
        refTimestamp.current.checked = false;
        refName.current.checked = false;
        refFilesize.current.checked = false;
    }
    return (
        <footer className='header-container'>
            <div className="header-sort">
                <form className='form-sort' onChange={(e) => props.dataSorting(e.target.value)}>
                    <p className='text-sort'> Сортировка:</p>
                    <input ref={refCategory} disabled={!props.viewSelect} type="radio" id="category" name='sorting'
                        value="category"></input>
                    <label htmlFor="category">По категории</label>

                    <input ref={refTimestamp} disabled={!props.viewSelect} type="radio" id="timestamp" name='sorting'
                        value="timestamp"></input>
                    <label htmlFor="timestamp">По дате</label>

                    <input ref={refName} disabled={!props.viewSelect} type="radio" id="name" name='sorting'
                        value="name"></input>
                    <label htmlFor="name">По названию</label>

                    <input ref={refFilesize} disabled={!props.viewSelect} type="radio" id="filesize" name='sorting'
                        value="filesize"></input>
                    <label htmlFor="filesize">По размеру файла</label>
                </form>
            </div>

            <div className="header-view_selection">
                <form className='form-view_selection' onChange={(e) => props.isViewSelected(e.target.value)}>
                    <p className='text-view_selection'> Вид списка:</p>

                    <input defaultChecked={props.viewSelect} type="radio" id="cardView" name='view_selection'
                        defaultValue="cardView"></input>
                    <label htmlFor="cardView">Вид "карточки"</label>

                    <input defaultChecked={!props.viewSelect} type="radio" id="viewTreeList" name='view_selection'
                        defaultValue="viewTreeList"></input>
                    <label htmlFor="viewTreeList">Вид "древовидный список"</label>

                </form>
            </div>
        </footer>
    );

}
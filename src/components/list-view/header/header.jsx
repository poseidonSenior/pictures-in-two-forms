import React from 'react';

import './header.css'

export function Header(props) {

    return (
        <footer className='header-container'>
            <div className="header-sort">
                <form className='form-sort' onChange={(e) => props.dataSorting(e.target.value)}>
                    <p className='text-sort'> Сортировка:</p>
                    <input disabled={!props.viewSelect} checked={props.sort === 'category'} type="radio" id="category" name='sorting'
                        value="category"></input>
                    <label htmlFor="category">По категории</label>

                    <input disabled={!props.viewSelect} checked={props.sort === 'timestamp'} type="radio" id="timestamp" name='sorting'
                        value="timestamp"></input>
                    <label htmlFor="timestamp">По дате</label>

                    <input disabled={!props.viewSelect} checked={props.sort === 'name'} type="radio" id="name" name='sorting'
                        value="name"></input>
                    <label htmlFor="name">По названию</label>

                    <input disabled={!props.viewSelect} checked={props.sort === 'filesize'} type="radio" id="filesize" name='sorting'
                        value="filesize"></input>
                    <label htmlFor="filesize">По размеру файла</label>
                </form>
            </div>

            <div className="header-view_selection">
                <form className='form-view_selection' onChange={(e) => props.isViewSelected(e.target.value)}>
                    <p className='text-view_selection'> Вид списка:</p>

                    <input checked={props.viewSelect} type="radio" id="cardView" name='view_selection'
                        value="cardView"></input>
                    <label htmlFor="cardView">Вид "карточки"</label>

                    <input checked={!props.viewSelect} type="radio" id="viewTreeList" name='view_selection'
                        value="viewTreeList"></input>
                    <label htmlFor="viewTreeList">Вид "древовидный список"</label>

                </form>
            </div>
        </footer>
    );

}
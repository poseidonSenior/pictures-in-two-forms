import React from 'react';

import './footer.css'

export function Footer(props) {
    return (
        <footer className='footer-container'>
            <p> &copy; 2022 Плиско Владимир</p>
            <button disabled={!props.viewSelect} className='footer-btn' onClick={props.returnAllCards}>Return All Cards</button>
        </footer>
    );

}
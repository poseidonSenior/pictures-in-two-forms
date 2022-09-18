import React from 'react'

import './pagination.css';

export function Pagination(props) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalPicturies / props.picturePerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination">
            {pageNumbers.map(number => (
                <li className={`page-item ${props.currentPage === number ? 'active' : ''}`} key={number} onClick={() => props.paginate(number)}>
                    <a href='#!' className="page-link" >{number}</a>
                </li>
            ))}
        </ul>
    )
}

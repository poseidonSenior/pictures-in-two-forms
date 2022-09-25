import React, { useEffect, useState } from 'react'

import './pagination.css';

export function Pagination(props) {
    const [valueInput, setValueInput] = useState(props.currentPage)
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.totalPicturies / props.picturePerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        if (pageNumbers[pageNumbers.length - 1] + 1 === +props.currentPage) {
            if (props.internalData.length === 0) {
                props.paginate(props.currentPage - 1)
                setValueInput(prev => prev - 1)
            }
        }
    }, [props.internalData])

    const handleChange = (ev) => {
        if (ev.code === 'Enter') {
            if (+ev.target.value < pageNumbers[0]) {
                props.paginate(1)
                setValueInput(1)
            }
            else if (+ev.target.value > pageNumbers[pageNumbers.length - 1]) {
                props.paginate(pageNumbers[pageNumbers.length - 1])
            }
            else {
                window.scrollTo(0, 0)
                props.paginate(ev.target.value)

            }
        }
        else {
            if (+ev.target.value > pageNumbers[pageNumbers.length - 1]) {
                setValueInput(pageNumbers[pageNumbers.length - 1])
            }
            else {
                setValueInput(ev.target.value)
            }
        }
    }


    const nextPage = () => {
        if (+props.currentPage === pageNumbers[pageNumbers.length - 1]) {
            props.paginate(pageNumbers[pageNumbers.length - 1])
            setValueInput(pageNumbers[pageNumbers.length - 1])
        }
        else {
            props.paginate(+props.currentPage + 1)
            setValueInput(prev => prev + 1)
            window.scrollTo(0, 0)
        }
    }

    const prevPage = () => {
        if (+props.currentPage === 1) {
            props.paginate(1)
            setValueInput(1)
        }
        else {
            props.paginate(+props.currentPage - 1)
            setValueInput(prev => prev - 1)
            window.scrollTo(0, 0)
        }
    }

    return (
        <div className="pagination">
            <button className="prev-btn btn" onClick={prevPage}><i className="arrow left"></i></button>
            <div className="page-number">
                <input className="current-page-number" type="number" value={valueInput} onChange={handleChange} onKeyPress={handleChange} />
                <span className='total-page-text'>
                    of {pageNumbers[pageNumbers.length - 1]}
                </span>
            </div>
            <button className="next-btn btn" onClick={nextPage}><i className="arrow right"></i></button>
        </div>
    )
}

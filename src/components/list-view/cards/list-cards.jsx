import { useState } from 'react';
import './list-cards.css'

export function ListCards(props) {
    return (
        <div className='list-cards-container'>
            {props.internalData.map((data, index) => {
                return (
                    <Card key={index} data={data} deleteCard={props.deleteCard} />
                )
            })}
        </div>
    );
}


function Card(props) {
    const { data, deleteCard } = props;
    const [isDeleted, setIsDeleted] = useState(false)

    const returnViewState = () => {
        setIsDeleted(true)
        setTimeout(() => {
            setIsDeleted(false)
        }, 1000);
    }

    return (
        <div className={`card-container ${isDeleted ? 'hidden-img' : ''}`}>
            <div className="card">
                <div className="close" onClick={() => { deleteCard(data.image); returnViewState() }}></div>
                <img className="card-picture" src={`http://contest.elecard.ru/frontend_data/${data.image}`} />
                <div className="card-text">
                    <div className="name-text">Имя файла: {data.image.split('/')[1]}</div>
                    <div className="category-text">Категория: {data.category}</div>
                    <div className="filesize-text">Размер: {data.filesize / 1000}kB</div>
                    <div className="date-text">Дата: {new Date(data.timestamp).toLocaleDateString()}</div>
                </div>
            </div>
        </div >
    );
}


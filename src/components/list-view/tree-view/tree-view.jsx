import React, { useState } from 'react'

import './tree-view.css'

export function TreeView(props) {
    const [expandCategories, setExpandCategories] = useState(true);
    const { treeData } = props
    return (
        <div className='tree-view-wrapper'>
            <div className='tree-view-container'>
                <div onClick={() => setExpandCategories(!expandCategories)} className={`tree-categories ${expandCategories ? 'show' : 'hide'}`} >Categories</div>
                <div style={{ display: expandCategories ? "block" : "none" }}>
                    {treeData && treeData.map((elements, index) =>
                        <div className='view-category' key={index}>
                            <CotegoryView elements={elements} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function CotegoryView(props) {
    const [expandCategory, setExpandCategory] = useState(false);
    const { elements } = props
    return (
        <div>
            <div onClick={() => setExpandCategory(!expandCategory)} className={` category ${expandCategory ? 'show' : 'hide'}`}>
                {elements.value}
            </div>
            {elements.source.map((elem, index) =>
                <div style={{ display: expandCategory ? "block" : "none", paddingLeft: 30 }} key={index}>
                    <ImageThumbnail image={elem.image} />
                </div>
            )}
        </div>
    )
}

function ImageThumbnail(props) {
    const [viewImage, setViewImage] = useState(false);
    const { image } = props
    return (
        <div className='thumbnail-wrapper'>
            <img onClick={() => setViewImage(!viewImage)} className='img-thumbnail' src={`http://contest.elecard.ru/frontend_data/${image}`} />
            <div className={`text-img ${viewImage && 'active-img'}`}>
                {image.split('/')[1]}
            </div>
            {viewImage && <ImageModal image={image} active={viewImage} setActive={setViewImage} />}
        </div>
    )
}

function ImageModal(props) {
    const { image, setActive } = props
    return (
        <div className='img-modal' onClick={() => setActive(false)}>
            <div className='img-modal__content'>
                <img src={`http://contest.elecard.ru/frontend_data/${image}`} />
            </div>
        </div>
    )
}

import React from 'react'
import {IoAdd} from 'react-icons/io5'

function PlusButton({onClick}) {
    return (
        <button className={'btn btn-sm btn-primary rounded-pill p-3 position-fixed plus-btn'} onClick={onClick}>
            <IoAdd size={'2.5rem'}/></button>
    )
}

export default PlusButton
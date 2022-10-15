import React from 'react'
import {Link} from 'react-router-dom'
import {IoPencil, IoTrash} from 'react-icons/io5'

function Card({data, edit, del}) {
    return (
        <Link to={`/firm/${data._id}`} className={'col-md-3 text-decoration-none'}>
            <div className={'card p-2 my-card'}>
                <div className="card-body">
                    <h5 className="card-title h4">{data.name}</h5>
                </div>
                <div className="card-footer d-flex justify-content-end gap-3">
                    <button className={'btn btn-warning'} onClick={(e) => {
                        e.preventDefault()
                        edit(data)
                    }}><IoPencil size={'1.5rem'}/></button>
                    <button className={'btn btn-danger'} onClick={(e) => {
                        e.preventDefault()
                        del(data)
                    }}><IoTrash size={'1.5rem'}/></button>
                </div>
            </div>
        </Link>
    )
}

export default Card
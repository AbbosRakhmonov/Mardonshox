import React from 'react'

function FirmBody({name = ''}) {
    return (
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Фирма номи</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"
                   placeholder="Нур" name={'firm'} defaultValue={name}/>
        </div>
    )
}

export default FirmBody
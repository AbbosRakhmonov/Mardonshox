import React, {useState} from 'react'

function TodoBody({inc = 0, out = 0, comment = ''}) {
    const [income, setIncome] = useState(inc)
    const [outcome, setOutcome] = useState(out)
    const [option, setOption] = useState(() => {
        if (Number(inc) > 0) {
            return 'income'
        } else if ((Number(out)) > 0) {
            return 'outcome'
        }
        return ''
    })

    const handleChange = (e) => {
        let val = e.target.value.replace(/^0+/, '')
        if (e.target.name === 'income') {
            setIncome(val)
        } else {
            setOutcome(val)
        }
    }

    const handleChangeSelect = (e) => {
        setOption(e.target.value)
    }

    return (
        <div className={'row g-3'}>
            <div className="col-md-12">
                <select className="form-select" aria-label="Default select example" value={option}
                        onChange={handleChangeSelect}>
                    <option value={''} disabled>Танлаш</option>
                    <option value="income">Кирим</option>
                    <option value="outcome">Чиким</option>
                </select>
            </div>
            {
                option === 'income' && <div className="col-md-12">
                    <label htmlFor="kirim" className="form-label text-success">Кирим</label>
                    <input type="number" className="form-control" id="kirim" name={'income'} value={income}
                           onChange={handleChange}/>
                    {income > 0 &&
                        <span className={'text-muted ms-2 mt-2 d-block'}>{Number(income).toLocaleString('ru-RU')}</span>}
                </div>
            }
            {
                option === 'outcome' && <div className="col-md-12">
                    <label htmlFor="chiqim" className="form-label text-danger">Чиким</label>
                    <input type="number" className="form-control" id="chiqim" name={'outcome'} value={outcome}
                           onChange={handleChange}
                    />
                    {outcome > 0 &&
                        <span className={'text-muted ms-2 mt-2 d-block'}>{Number(outcome).toLocaleString('ru-RU')}</span>}
                </div>
            }
            <div className="col-md-12">
                <div className="form-floating">
                    <textarea className="form-control" placeholder="Leave a comment here"
                              id="floatingTextarea" style={{height: 100}} defaultValue={comment}
                              name={'comment'}></textarea>
                    <label htmlFor="floatingTextarea">Изох</label>
                </div>
            </div>
        </div>
    )
}

export default TodoBody
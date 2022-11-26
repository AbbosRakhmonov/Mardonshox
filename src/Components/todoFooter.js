import React, {useEffect, useState} from 'react'

function TodoFooter({data}) {
    const [allIncome, setAllIncome] = useState(0)
    const [allOutcome, setAllOutcome] = useState(0)
    const [allBalance, setAllBalance] = useState(0)
    useEffect(() => {
        let income = 0
        let outcome = 0
        data.forEach(report => {
            income += report.income
            outcome += report.outcome
        })
        setAllIncome(income)
        setAllOutcome(outcome)
        setAllBalance(outcome - income)
    }, [data])
    return (
        <div
            className={'footer-bottom alert alert-secondary fixed-bottom m-0 my-alert d-flex gap-5 justify-content-center'}>
            <span
                className={'h5 footer-text text-success text-sm-center'}>Киримлар: &nbsp;{allIncome.toLocaleString('ru-RU')}</span>
            <span
                className={'h5 footer-text text-danger text-sm-center'}>Чикимлар: &nbsp;{allOutcome.toLocaleString('ru-RU')}</span>
            <span className={'h5 footer-text text-sm-center'}>Жами: &nbsp;{allBalance.toLocaleString('ru-RU')}</span>
        </div>
    )
}

export default TodoFooter
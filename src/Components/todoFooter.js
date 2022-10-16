import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'

function TodoFooter() {
    const [allIncome, setAllIncome] = useState(0)
    const [allOutcome, setAllOutcome] = useState(0)
    const [allBalance, setAllBalance] = useState(0)
    const {reports} = useSelector(state => state.report)
    useEffect(() => {
        let income = 0
        let outcome = 0
        reports.forEach(report => {
            income += report.income
            outcome += report.outcome
        })
        setAllIncome(income)
        setAllOutcome(outcome)
        setAllBalance(income - outcome)
    }, [reports])
    return (
        <div
            className={'alert alert-secondary fixed-bottom m-0 my-alert d-flex gap-5 justify-content-center'}>
            <span
                className={'h5 footer-text text-success text-sm-center'}>Киримлар: &nbsp;{allIncome.toLocaleString('ru-RU')}</span>
            <span
                className={'h5 footer-text text-danger text-sm-center'}>Чикимлар: &nbsp;{allOutcome.toLocaleString('ru-RU')}</span>
            <span className={'h5 footer-text text-sm-center'}>Жами: &nbsp;{allBalance.toLocaleString('ru-RU')}</span>
        </div>
    )
}

export default TodoFooter
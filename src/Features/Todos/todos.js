import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import ConstTable from '../../Components/constTable'
import PlusButton from '../../Components/plusButton'
import ConstModal from '../../Components/Modal/constModal'
import WarningModal from '../../Components/Modal/warningModal'
import {IoChevronBack} from 'react-icons/io5'
import {useDispatch, useSelector} from 'react-redux'
import {createReport, deleteReport, getReports, updateReport} from './todoSlice'
import TodoFooter from '../../Components/todoFooter'

function Todos() {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {reports, loading} = useSelector(state => state.report)
    const [tableData, setTableData] = useState(reports)
    const [currentTodo, setCurrentTodo] = useState(null)
    const [warningModal, setWarningModal] = useState(false)
    const [modal, setModal] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const toggleModal = () => {
        setModal(!modal)
        setCurrentTodo(null)
    }
    const toggleWarningModal = () => {
        setWarningModal(!warningModal)
        setCurrentTodo(null)
    }
    const addTodo = (e) => {
        e.preventDefault()
        const obj = {
            income: Number(e.target?.income?.value) || 0,
            outcome: Number(e.target?.outcome?.value) || 0,
            comment: e.target.comment.value,
            firm: id,
            createdAt: new Date(e.target.createdAt.value).toISOString()
        }
        dispatch(createReport(obj)).then(({error}) => {
            if (!error) toggleModal()
        })
    }
    const editTodo = (data) => {
        setModal(true)
        setCurrentTodo(data)
    }
    const deleteTodo = (data) => {
        setCurrentTodo(data)
        setWarningModal(true)
    }
    const saveEditedTodo = (e) => {
        e.preventDefault()
        const obj = {
            ...currentTodo,
            income: e.target?.income?.value || 0,
            outcome: e.target?.outcome?.value || 0,
            comment: e.target.comment.value,
            createdAt: new Date(e.target.createdAt.value).toISOString()
        }
        dispatch(updateReport(obj)).then(({error}) => {
            if (!error) toggleModal()
        })
    }
    const deleteCurrentTodo = (e) => {
        e.preventDefault()
        dispatch(deleteReport(currentTodo._id)).then(({error}) => {
            if (!error) toggleWarningModal()
        })
    }

    const filterDataByDate = (start, end) => {
        if (start && end) {
            const startD = new Date(start)
            const endD = new Date(end)
            const filteredData = reports.filter(item => {
                const date = new Date(item.createdAt)
                return date >= startD && date <= endD
            })

            setTableData(filteredData)
        } else {
            setTableData(reports)
        }
    }

    const onChangeStartDate = (e) => {
        const {value} = e.target
        setStartDate(value)
        filterDataByDate(value, endDate)
    }

    const onChangeEndDate = (e) => {
        const {value} = e.target
        setEndDate(value)
        filterDataByDate(startDate, value)
    }

    useEffect(() => {
        setTableData(reports)
    }, [reports])

    useEffect(() => {
        if (!isChecked) {
            setStartDate('')
            setEndDate('')
            setTableData(reports)
        }
    }, [isChecked, reports])

    useEffect(() => {
        dispatch(getReports(id))
    }, [dispatch, id])
    return (
        <div className={'container'}>
            <WarningModal isOpen={warningModal} toggle={toggleWarningModal} success={deleteCurrentTodo}/>
            <ConstModal
                isOpen={modal} body={'todo'}
                toggle={toggleModal}
                comment={currentTodo?.comment}
                out={currentTodo?.outcome}
                inc={currentTodo?.income}
                date={currentTodo?.createdAt}
                success={currentTodo ? saveEditedTodo : addTodo}/>
            <div className="row my-3">
                <div className="col-12">
                    <div className="d-flex">
                        <Link to={-1} className={'h5 d-flex align-items-center text-decoration-none'}><IoChevronBack/>
                            <span>Ортга қайтиш</span></Link>
                    </div>
                    <div className="row mt-4 my-2 px-2">
                        <div className="col-12">
                            <div className="d-flex flex-wrap gap-5">
                                <div className="d-flex gap-2 align-items-center">
                                    <input type="checkbox" className="form-check-input" style={{
                                        width: '1.5rem',
                                        height: '1.5rem'
                                    }} checked={isChecked}
                                           onChange={(e) => setIsChecked(e.target.checked)} id="exampleCheck1"/>
                                    <label className="form-check-label" style={{
                                        fontSize: '1rem'
                                    }} htmlFor="exampleCheck1">Филтрлаш</label>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <label className={`form-check-label ${!isChecked ? 'text-muted' : ''}`} style={{
                                        fontSize: '1rem'
                                    }} htmlFor="date1">Бошлангич сана :</label>
                                    <input
                                        type="date"
                                        className="form-control w-auto" id={'date1'} aria-label="Date"
                                        name={'startDate'}
                                        value={startDate}
                                        disabled={!isChecked}
                                        onChange={onChangeStartDate}
                                    />
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <label className={`form-check-label ${!isChecked ? 'text-muted' : ''}`} style={{
                                        fontSize: '1rem'
                                    }} htmlFor="date2">Тугаш сана :
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control w-auto" id={'date2'} aria-label="Date"
                                        name={'endDate'}
                                        value={endDate}
                                        disabled={!isChecked}
                                        onChange={onChangeEndDate}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TodoFooter data={tableData}/>
            <div className="row">
                <div className="col-md-12">
                    <ConstTable data={tableData} edit={editTodo} del={deleteTodo} loading={loading}/>
                </div>
            </div>
            <PlusButton onClick={() => setModal(true)}/>
        </div>
    )
}

export default Todos
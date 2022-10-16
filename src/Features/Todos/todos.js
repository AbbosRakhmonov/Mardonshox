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
    const [currentTodo, setCurrentTodo] = useState(null)
    const [warningModal, setWarningModal] = useState(false)
    const [modal, setModal] = useState(false)
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
            firm: id
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
            comment: e.target.comment.value
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
                success={currentTodo ? saveEditedTodo : addTodo}/>
            <div className="row my-3">
                <div className="d-flex">
                    <Link to={-1} className={'h5 d-flex align-items-center text-decoration-none'}><IoChevronBack/>
                        <span>Ортга қайтиш</span></Link>
                </div>
            </div>
            <TodoFooter/>
            <div className="row">
                <div className="col-md-12">
                    <ConstTable data={reports} edit={editTodo} del={deleteTodo} loading={loading}/>
                </div>
            </div>
            <PlusButton onClick={() => setModal(true)}/>
        </div>
    )
}

export default Todos
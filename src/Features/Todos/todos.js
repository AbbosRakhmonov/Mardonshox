import React, {useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import ConstTable from '../../Components/constTable'
import PlusButton from '../../Components/plusButton'
import ConstModal from '../../Components/Modal/constModal'
import WarningModal from '../../Components/Modal/warningModal'
import {IoChevronBack} from 'react-icons/io5'

function Todos() {
    const dataList = [
        {
            id: 1,
            name: 'Firma 1',
            income: 100000,
            outcome: 50000,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quae.'
        },
        {
            id: 2,
            name: 'Firma 2',
            income: 100000,
            outcome: 50000,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quae.'
        },
        {
            id: 3,
            name: 'Firma 3',
            income: 100000,
            outcome: 50000,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quae.'
        },
        {
            id: 4,
            name: 'Firma 3',
            income: 100000,
            outcome: 50000,
            comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, quae.'
        }
    ]
    const [currentTodo, setCurrentTodo] = useState(null)
    const [warningModal, setWarningModal] = useState(false)
    const {name} = useParams()
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
            income: e.target.income.value || 0,
            outcome: e.target.outcome.value || 0,
            comment: e.target.comment.value
        }
        console.log(obj)
    }
    const editTodo = (data) => {
        setModal(true)
        setCurrentTodo(data)
    }
    const deleteTodo = (e) => {
        setWarningModal(true)
    }
    const saveEditedTodo = (e) => {
        e.preventDefault()
        const obj = {
            id: currentTodo.id,
            income: e.target.income.value || 0,
            outcome: e.target.outcome.value || 0,
            comment: e.target.comment.value
        }
        console.log(obj)
    }
    const deleteCurrentTodo = (e) => {
        e.preventDefault()
    }
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
            <div className="row">
                <div className="col-md-12">
                    <ConstTable data={dataList} edit={editTodo} del={deleteTodo}/>
                </div>
            </div>
            <PlusButton onClick={() => setModal(true)}/>
        </div>
    )
}

export default Todos
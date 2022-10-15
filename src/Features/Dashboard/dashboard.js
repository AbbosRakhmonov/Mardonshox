import React, {useEffect, useState} from 'react'
import Card from '../../Components/card'
import PlusButton from '../../Components/plusButton'
import Spinner from '../../Components/spinner'
import ConstModal from '../../Components/Modal/constModal'
import {map, uniqueId} from 'lodash'
import WarningModal from '../../Components/Modal/warningModal'
import {useDispatch, useSelector} from 'react-redux'
import {createFirm, deleteSingleFirm, editFirm, getAllFirms} from './dashboardSlice'
import NotFound from '../../Components/notFound'

function Dashboard() {
    const dispatch = useDispatch()
    const {firms, loading} = useSelector(state => state.firm)
    const {user} = useSelector(state => state.auth)
    const [modal, setModal] = useState(false)
    const [warning, setWarning] = useState(false)
    const [currentFirm, setCurrentFirm] = useState(null)
    const toggleModal = () => {
        setModal(!modal)
        setCurrentFirm(null)
    }
    const toggleWarningModal = () => {
        setWarning(!warning)
        setCurrentFirm(null)
    }
    const editFirmName = (data) => {
        setCurrentFirm(data)
        setModal(true)
    }
    const deleteFirmModal = (data) => {
        setCurrentFirm(data)
        setWarning(true)
    }
    const addNewFirm = (e) => {
        setModal(true)
    }

    const saveEditedFirm = (e) => {
        e.preventDefault()
        const obj = {
            ...currentFirm,
            name: e.target.firm.value
        }
        dispatch(editFirm(obj)).then(({error}) => {
            if (!error) {
                toggleModal()
            }
        })
    }
    const submitFirm = (e) => {
        e.preventDefault()
        const name = e.target.firm.value.trim()
        const obj = {
            name,
            user: user.id
        }
        dispatch(createFirm(obj)).then(({error}) => {
            if (!error) {
                toggleModal()
            }
        })
    }
    const deleteFirm = (e) => {
        e.preventDefault()
        dispatch(deleteSingleFirm(currentFirm._id)).then(({error}) => {
            if (!error) {
                toggleWarningModal()
            }
        })
    }
    useEffect(() => {
        dispatch(getAllFirms())
    }, [dispatch])
    return (
        <div className="container-fluid">
            <WarningModal isOpen={warning} toggle={toggleWarningModal} success={deleteFirm}/>
            <ConstModal toggle={toggleModal} isOpen={modal} firm={currentFirm?.name}
                        success={currentFirm ? saveEditedFirm : submitFirm}/>
            {loading ? <div className="row mb-4">
                <Spinner/>
            </div> : firms.length ? <div className={'row g-4'}>
                {
                    map(firms, (data) => (
                        <Card key={uniqueId('card')} data={data} del={deleteFirmModal} edit={editFirmName}/>))
                }

            </div> : <NotFound/>}
            <PlusButton onClick={addNewFirm}/>
        </div>
    )
}

export default Dashboard
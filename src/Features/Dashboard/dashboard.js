import React, {useState} from 'react'
import Card from '../../Components/card'
import PlusButton from '../../Components/plusButton'
import Spinner from '../../Components/spinner'
import ConstModal from '../../Components/Modal/constModal'
import {map, uniqueId} from 'lodash'
import WarningModal from '../../Components/Modal/warningModal'

function Dashboard() {
    const [modal, setModal] = useState(false)
    const [warning, setWarning] = useState(false)
    const [currentFirm, setCurrentFirm] = useState(null)
    const testData = [
        {
            id: 1,
            name: 'Firma 1'
        },
        {
            id: 2,
            name: 'Firma 2'
        },
        {
            id: 3,
            name: 'Firma 3'
        }
    ]
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
        setWarning(true)
    }
    const addNewFirm = (e) => {
        setModal(true)
    }
    const saveEditedFirm = (e) => {
        e.preventDefault()
        const name = e.target.firm.value.replace(/\s/g, '')
        const obj = {
            id: currentFirm.id,
            name
        }
        toggleModal()
    }
    const submitFirm = (e) => {
        e.preventDefault()
        const name = e.target.firm.value.replace(/\s/g, '')
        const obj = {
            name
        }
        toggleModal()
    }
    const deleteFirm = (e) => {
        e.preventDefault()
    }
    return (
        <div className="container-fluid">
            <WarningModal isOpen={warning} toggle={toggleWarningModal} success={deleteFirm}/>
            <ConstModal toggle={toggleModal} isOpen={modal} firm={currentFirm?.name}
                        success={currentFirm ? saveEditedFirm : submitFirm}/>
            <div className="row mb-4">
                <Spinner/>
            </div>
            <div className={'row g-4'}>
                {
                    map(testData, (data) => (
                        <Card key={uniqueId('card')} data={data} del={deleteFirmModal} edit={editFirmName}/>))
                }

            </div>
            <PlusButton onClick={addNewFirm}/>
        </div>
    )
}

export default Dashboard
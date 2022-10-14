import React from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {IoWarning} from 'react-icons/io5'

function WarningModal({isOpen, toggle, success}) {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>
                Огоҳлантириш
            </ModalHeader>
            <ModalBody>
                <form id={'warning-form'} onSubmit={success}>
                    <div className={'text-center'}>
                        <IoWarning size={'5rem'} className={'text-warning'}/>
                    </div>
                    <h5 className={'h5 text-muted text-center mt-3'}>
                        Сиз бу маълумотни ўчирмоқчимисиз?
                    </h5>
                </form>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                        onClick={toggle}>Ёпиш
                </button>
                <button type="submit" className="btn btn-danger" form={'warning-form'}>Ўчириш
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default WarningModal
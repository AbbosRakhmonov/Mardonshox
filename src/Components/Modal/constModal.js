import React from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import FirmBody from './ModalBody/firmBody'
import TodoBody from './ModalBody/todoBody'

function ConstModal({isOpen, toggle, body, success, comment, inc, out, firm}) {
    const checkBody = (body) => {
        switch (body) {
            case 'todo':
                return <TodoBody comment={comment} inc={inc} out={out}/>
            default:
                return <FirmBody name={firm} />
        }
    }
    return (
        <Modal isOpen={isOpen} toggle={toggle} modalTransition={{
            timeout: 50
        }}>
            <ModalHeader>Маьлумотни киритиш</ModalHeader>
            <ModalBody>
                <form id={'my-form'} onSubmit={success}>
                    {checkBody(body)}
                </form>
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                        onClick={toggle}>Ёпиш
                </button>
                <button type="submit" className="btn btn-success" form={'my-form'}>Сақлаш
                </button>
            </ModalFooter>
        </Modal>
    )
}

export default ConstModal
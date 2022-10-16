import React from 'react'
import {Modal, ModalBody, ModalFooter} from 'reactstrap'

function SecondModal({isOpen, toggle, success}) {
    return (
        <Modal toggle={toggle} isOpen={isOpen} centered={true}>
            <ModalBody className={'p-5'}>
                <h4 className={'h4 text-danger text-center'}>Аниқ розимисиз ?</h4>
            </ModalBody>
            <ModalFooter className={'justify-content-center gap-2'}>
                <button className={'btn btn-secondary px-4'} onClick={toggle}>Йўқ</button>
                <button className={'btn btn-success px-4'} onClick={success}>Ҳа</button>
            </ModalFooter>
        </Modal>
    )
}

export default SecondModal
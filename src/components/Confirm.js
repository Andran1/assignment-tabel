import React from 'react'
import {Modal,Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

function Confirm(props){
    return(
        <Modal
        {...props}
        show={true}
        onHide={props.onClose}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                Are you sure to remove {props.count} task{props.count>1?"s":''}
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
            <Button
                onClick={props.onConfirm}
                variant='danger'
                >Delete
                </Button>
                <Button
                onClick={props.onClose}
                >Close
                </Button>
            </Modal.Footer>
     
        </Modal>
    )
}

  Confirm.propTypes={
    count:PropTypes.number.isRequired,
    onClose:PropTypes.func.isRequired,
    onConfirm:PropTypes.func.isRequired
  }

export default Confirm
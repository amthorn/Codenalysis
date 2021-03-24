import React from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from 'prop-types';

export default class FormModal extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        openModalButtonProps: PropTypes.object,
        openModalButtonText: PropTypes.element.isRequired,
        closeButtonText: PropTypes.string,
        submitButtonText: PropTypes.string,
    };

    constructor(props){
        super(props)
        this.state = {show: false}
    }

    handleClose() {
        this.setState({show: false})
    }

    handleShow() {
        this.setState({show: true})
    }

    renderHeader() {
        return (
            <Modal.Title>{ this.title }</Modal.Title>
        )
    }

    renderBody() {
        return this.props.children
    }

    renderFooter() {
        // <Modal.Footer> Footer </Modal.Footer>
        return null;
    }

    render() {
        // Issue with console warnings; Should be fixed in 1.5.3
        // https://github.com/react-bootstrap/react-bootstrap/issues/5075
        return (
            <React.Fragment>
                <Button { ...this.props.openModalButtonProps } onClick={() => this.handleShow()}>
                    { this.props.openModalButtonText }
                </Button>

                <Modal show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                        { this.renderHeader() }
                    </Modal.Header>
                    <Modal.Body>
                        { this.renderBody() }
                    </Modal.Body>
                    { this.renderFooter() }
                </Modal>
            </React.Fragment>
        );
    }
}
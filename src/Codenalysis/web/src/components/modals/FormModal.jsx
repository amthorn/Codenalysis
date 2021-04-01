import { Button } from "components/base/Button";
import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";

export default class FormModal extends React.Component {
    static propTypes = {
    	title: PropTypes.string,
    	help: PropTypes.string.isRequired,
    	openModalButtonProps: PropTypes.object,
    	openModalButtonText: PropTypes.element.isRequired,
    	closeButtonText: PropTypes.string,
    	submitButtonText: PropTypes.string,
    };

    constructor(properties){
    	super(properties);

    	;
    }

    state = {show: false}

    handleClose() {
    	this.setState({show: false});
    }

    handleShow() {
    	this.setState({show: true});
    }

    renderHeader() {
    	return (
	<Modal.Title>{ this.title }</Modal.Title>
    	);
    }

    renderBody() {
    	return this.props.children;
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
	<Button { ...this.props.openModalButtonProps } help={ this.help } onClick={ () => this.handleShow() }>
	{ this.props.openModalButtonText }
    			</Button>

	<Modal show={ this.state.show } onHide={ () => this.handleClose() }>
	<Modal.Header closeButton={ true }>
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
import React from "react";
import { Form } from "react-bootstrap";

export const FormSelect = ({ options, label, subtext, controlId, selectedValue, onChange, ...props }) => (
    <Form.Group controlId={ controlId }>
        <Form.Label>
        	<h5 className="mb-2">{ label }</h5>
        	<span className="text-info">{ subtext }</span>
        </Form.Label>
        <Form.Control as="select" className="fs-4" onChange={ onChange } value={ selectedValue } { ...props }>
            {
            	options.map(i => (
            		<option value={ i.value }>{ i.name }</option>
            	)) 
            }
        </Form.Control>
    </Form.Group>
)
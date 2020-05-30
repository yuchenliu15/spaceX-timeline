import React from 'react';
import './index.css';
import { Dropdown, Form, Row } from 'react-bootstrap';

const Menu = () => {
    return (
        <div className="menu">
            <Dropdown>
                <Dropdown.Toggle className="dropdown-button" size="lg" variant="none" id="dropdown-basic">
                    Sort by:
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Form.Group>
                <Row>
                    <Form.Control className="search w-50" size="lg" type="text" />
                    <Form.Control className="submit" size="lg" type="submit" value="Search" />
                </Row>
            </Form.Group>
        </div>
    )
}

export {
    Menu
}
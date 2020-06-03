import React from 'react';
import './index.css';
import { Dropdown, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Menu = ({ sortString, onSortChange, onSearchChange, onSearchSubmit, onBackButtonClick, isAboutActive }) => {
    return (
        <div>
            {
                isAboutActive
                    ? <div className="menu">
                        <button className="btn btn-light back-button" size="lg" onClick={onBackButtonClick} ><FontAwesomeIcon icon={faArrowLeft} /></button>
                    </div>
                    : <div className="menu">
                        <Dropdown>
                            <Dropdown.Toggle className="dropdown-button" size="lg" variant="none" id="dropdown-basic">
                                Sort by: {sortString}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1" value="latest" onClick={onSortChange}>latest</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" value="oldest" onClick={onSortChange}>oldest</Dropdown.Item>
                                <Dropdown.Item href="#/action-3" value="name" onClick={onSortChange}>name</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Form.Group className="search-div" >
                            <Row>
                                <Form.Control className="search" size="lg" type="text" placeholder="flight number...default to upcoming" onChange={onSearchChange} />
                                <Form.Control className="submit" size="lg" type="submit" value="Search" onClick={onSearchSubmit} />
                            </Row>
                        </Form.Group>
                    </div>
            }

        </div>
    )
}

export {
    Menu
}
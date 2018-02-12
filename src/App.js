import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className='App'>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>One fine body...</Modal.Body>

          <Modal.Footer>
            <Button>Close</Button>
            <Button bsStyle="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>

        <h2>App's up and running!</h2>
      </div>
    )
  }
}

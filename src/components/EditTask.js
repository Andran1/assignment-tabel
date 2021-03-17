import React, { Component } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../helpers/utils";
import {editTask} from '../store/action'
import { connect } from "react-redux";

class EditTaskModal extends Component {
  constructor(props) {
    super(props);
    const {date}=props.data
    this.state = {
      ...props.data,
      date:date?new Date(date):new Date()
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }); 
  };

  handleSubmit = () => {
    const title = this.state.title.trim();
    const description = this.state.description.trim();
    if (!title) {
      return;
    }
    const editedTask = {
      _id: this.state._id,
      title: title,
      description: description,
      date:formatDate(this.state.date.toISOString())
    };
    this.props.editTask(editedTask,this.props.from); 
  };

  handleChangeDate = (value) => {
    this.setState({
      date: value||new Date(),
    });
  };
  render() {
    const { onClose } = this.props;
    const { title, description } = this.state;

    return (
      <Modal
        show={true}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.handleChange}
            className="mb-2" 
          />
          <FormControl
            placeholder="Description"
            as="textarea"
            rows={5}
            name="description"
            value={description}
            onChange={this.handleChange}
          />

          <DatePicker
            minDate={new Date()}
            selected={this.state.date}
            onChange={this.handleChangeDate}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.handleSubmit} variant="success">
            Save
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
editTask
};

export default connect(null, mapDispatchToProps)(EditTaskModal);


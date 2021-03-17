import React, { Component } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../helpers/utils";
import { connect } from "react-redux";
import {addTask} from '../../store/action'

class NewTask extends Component {
  state = {
    title: "",
    description: "",
    date: new Date(),
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      return this.handleSubmit();
    }
  };
  handleSubmit = () => {
    const title = this.state.title.trim();
    const description = this.state.description.trim();
    if (!title) {
      return;
    }
    const { date } = this.state;

    const newTask = {
      title: title,
      description: description,
      date: formatDate( date.toISOString()),
    };
    this.props.addTask(newTask);
  };

  handleChangeDate = (value) => {
    this.setState({
      date: value||new Date(),
    });
  };
  render() {
    const { onClose } = this.props;

    return (
      <Modal
        show={true}
        onHide={onClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            placeholder="Title"
            name="title"
            // onChange={(event)=>this.handleChange(event.target.value,"title")}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyDown}
            className="mb-2"
          />
          <FormControl
            placeholder="Description"
            as="textarea"
            rows={5}
            name="description"
            //  onChange={(event)=>this.handleChange(event.target.value,"description")}
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
            Add
          </Button>
          <Button onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  
  addTask
};

export default connect(null, mapDispatchToProps)(NewTask);



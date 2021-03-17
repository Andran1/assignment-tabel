import React, { PureComponent } from "react";
import styles from "./taskStyle.module.css";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit,faCheck,faRedo} from "@fortawesome/free-solid-svg-icons";
import { formatDate, textTruncate } from "../../helpers/utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteTask,editTask } from "../../store/action";


class Task extends PureComponent {
  handleChange = () => {
    const { onToggle, data } = this.props;
    onToggle(data._id);
  };
  render() {
    const task = this.props.data;
    const { disabled, selected, onEdit,editTask } = this.props;

    return (
      <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
        <Card.Body>
          <input
            type="checkbox"
            onChange={this.handleChange}
            checked={selected}
          />
          <Link to={`/task/${task._id}`}>
            <Card.Title>{task.title}</Card.Title>
          </Link>

          <Card.Text>Description: {textTruncate(task.description)}</Card.Text>
          <Card.Text>Date: {formatDate(task.date)}</Card.Text>
          <Card.Text>Status: {task.status}</Card.Text>
          <div className={styles.btn_block}>
            {task.status === "active" ? (
              <Button
                variant="success"
                disabled={disabled}
                onClick={() => editTask({status:"done",_id:task._id})}
              >
                <FontAwesomeIcon icon={faCheck} />
              </Button>
            ) : (
              <Button
                variant="secondary"
                disabled={disabled}
                onClick={() =>  editTask({status:"active",_id:task._id})}
              >
                <FontAwesomeIcon icon={faRedo} />
              </Button>
            )}
            <Button
              variant="warning"
              disabled={disabled}
              onClick={() => onEdit(task)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>

            <Button
              variant="danger"
              disabled={disabled}
              onClick={() => this.props.deleteTask(task._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
Task.propTypes = {
  data: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
  deleteTask: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};
const mapDispatchToProps = {
  deleteTask,
  editTask
};

export default connect(null, mapDispatchToProps)(Task);

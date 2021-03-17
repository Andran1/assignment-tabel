import { Component } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit,faCheck ,faRedo} from "@fortawesome/free-solid-svg-icons";
import { formatDate } from "../../../helpers/utils";
import EditTaskModal from "../../EditTask";
import { connect } from "react-redux";
import { getTask, deleteTask ,editTask} from "../../../store/action";

class SingleTask extends Component {
  state = {
    openEditModal: false,
  };
  componentDidMount() {
    const taskId = this.props.match.params.taskId;
    this.props.getTask(taskId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.editTaskSucces && this.props.editTaskSucces) {
      this.setState({
        openEditModal: false,
      });
      return;
    }
  }

  deleteTask = () => {
    const taskId = this.props.task._id;
    this.props.deleteTask(taskId, "single");
  };

  toggleEditModal = () => {
    this.setState({
      openEditModal: !this.state.openEditModal,
    });
  };

  render() {
    const { openEditModal } = this.state;
    const { task,editTask } = this.props;
    return (
      <div className="mt-5">
        <Container className="text-center">
          <Row>
            <Col>
              {task ? (
                <Card>
                  <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Text>Description: {task.description}</Card.Text>
                    <Card.Text>Date: {formatDate(task.date)}</Card.Text>
                    <Card.Text>Status: {task.status}</Card.Text>
                    <div>
                      {task.status === "active" ? (
                        <Button
                          variant="success"
                          onClick={() =>
                            editTask({ status: "done", _id: task._id },"single")
                          }
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={() =>
                            editTask({ status: "active", _id: task._id },"single")
                          }
                        >
                          <FontAwesomeIcon icon={faRedo} />
                        </Button>
                      )}
                      <Button variant="warning" onClick={this.toggleEditModal}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>

                      <Button
                        style={{ marginLeft: "5px" }}
                        variant="danger"
                        onClick={this.deleteTask}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <p>Loading....</p>
              )}
            </Col>
          </Row>
        </Container>
        {openEditModal && (
          <EditTaskModal
            data={task}
            onClose={this.toggleEditModal}
            from="single"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.task,
    editTaskSucces: state.editTaskSucces,
  };
};

const mapDispatchToProps = {
  getTask,
  deleteTask,
  editTask
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);

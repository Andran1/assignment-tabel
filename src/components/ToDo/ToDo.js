import React, { Component } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import Task from "./../Tasks/Task";
import NewTask from "../NewTask/NewTask";
import Confirm from "../Confirm";
import EditTask from "../EditTask";
import Search from "../Search/Search";
import { connect } from "react-redux";
import { getTasks, deleteTasks } from "../../store/action";

class ToDo extends Component {
  state = {
    selectedTask: new Set(),
    showConfirm: false,
    openNewTaskModal: false,
    editTask: null,
  };
  componentDidMount() {
    this.props.getTasks();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.addTaskSucces && this.props.addTaskSucces) {
      this.setState({
        openNewTaskModal: false,
      });
      return;
    }

    if (!prevProps.deletTasksSucces && this.props.deletTasksSucces) {
      this.setState({
        selectedTask: new Set(),
        showConfirm: false,
      });
      return;
    }
    if (!prevProps.editTasksSucces && this.props.editTasksSucces) {
      this.setState({
        editTask: null,
      });
      return;
    }
  }

  toggleTask = (taskId) => {
    const selectedTask = new Set(this.state.selectedTask);

    if (selectedTask.has(taskId)) {
      selectedTask.delete(taskId);
    } else {
      selectedTask.add(taskId);
    }
    this.setState({
      selectedTask,
    });
  };

  removeSelected = () => {
    const { selectedTask } = this.state;

    this.props.deleteTasks(selectedTask);
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  selectAll = () => {
    const taskIds = this.props.tasks.map((task) => task._id);
    this.setState({
      selectedTask: new Set(taskIds),
    });
  };
  deSelectAll = () => {
    this.setState({
      selectedTask: new Set(),
    });
  };
  toggleNewTaskModal = () => {
    this.setState({
      openNewTaskModal: !this.state.openNewTaskModal,
    });
  };
  hendleEdit = (editTask) => {
    this.setState({
      editTask,
    });
  };

  render() {
    const {
      selectedTask,
      showConfirm,
      openNewTaskModal,
      editTask,
    } = this.state;

    const { tasks } = this.props;

    return (
      <div>
        <Container>
          <h2>ToDo List</h2>
          <Row>
            <Col>
              <Search />
            </Col>
          </Row>

          <Row>
            <Col>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button variant="primary" onClick={this.toggleNewTaskModal}>
                  Add new Task
                </Button>
                <Button variant="warning" onClick={this.selectAll}>
                  Select All
                </Button>
                <Button variant="warning" onClick={this.deSelectAll}>
                  Deselect All
                </Button>
                <Button
                  variant="danger"
                  onClick={this.toggleConfirm}
                  disabled={!selectedTask.size}
                >
                  Delete selected
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            {tasks.map((task) => {
              return (
                <Col key={task._id} xl={2} lg={3} md={4} sm={6} xs={12}>
                  <Task
                    data={task}
                    onToggle={this.toggleTask}
                    onEdit={this.hendleEdit}
                    disabled={!!selectedTask.size}
                    selected={selectedTask.has(task._id)}
                  />
                </Col>
              );
            })}
          </Row>

          {showConfirm && (
            <Confirm
              onClose={this.toggleConfirm}
              onConfirm={this.removeSelected}
              count={selectedTask.size}
            />
          )}

          {openNewTaskModal && <NewTask onClose={this.toggleNewTaskModal} />}
          {editTask && (
            <EditTask data={editTask} onClose={() => this.hendleEdit(null)} />
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    addTaskSucces: state.addTaskSucces,
    deletTasksSucces: state.deletTasksSucces,
    editTasksSucces: state.editTasksSucces,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getTasks: () => {
//       request("http://localhost:3001/task").then((tasks) => {
//         dispatch({ type: "GET_TASKS", tasks: tasks });
//       });
//     },
//   };
// };

const mapDispatchToProps = {
  getTasks,
  deleteTasks,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);

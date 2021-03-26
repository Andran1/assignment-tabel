import React, { useEffect } from "react";
import ToDo from "./components/ToDo/ToDo";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import About from "./components/pages/About/About";
import Contact from "./components/pages/Contact/Contact";
import NotFound from "./components/pages/NotFound/NotFound";
import NavMenu from "./components/NavMenu/NavMenu";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import Spinner from "./components/Spinner/Spinner";
import Login from './components/pages/Login/Login'
import Register from './components/pages/Register/Register'
import Nav from './components/nav/nav'
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {history} from './helpers/history'
// import First from './helpers/test'

const toastProps={
  position: "bottom-left",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

function App({ loading, successMessage, errorMessage }) {
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage,toastProps );
    }
    if (errorMessage) {
      toast.error(errorMessage,toastProps);
    }
  }, [successMessage, errorMessage]);  


  return (
    <div style={{backgroundColor:'silver',height:"300vh"}}>
      <Router history={history} >
        <NavMenu />
        <Nav/>
        <Switch>
          <Route path="/" exact component={ToDo} />
          <Route path="/home" exact component={ToDo} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/task/:taskId" exact component={SingleTask} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/not-found" />
        </Switch>
      </Router>
      {loading && <Spinner />}
      <ToastContainer />

      {/* <First/> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    successMessage: state.successMessage,
    errorMessage: state.errorMessage,
  };
};
export default connect(mapStateToProps)(App);

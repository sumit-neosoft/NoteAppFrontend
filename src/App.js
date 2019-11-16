import React from "react";
import { connect } from 'react-redux';
import HeaderArea from "./components/common/HeaderArea";
import ContainerArea from "./components/common/ContainerArea";
import SidebarArea from "./components/common/SidebarArea";
import ContentArea from "./components/common/ContentArea";
import LoginPage from "./components/pages/LoginPage";
import axios from 'axios';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // console.log(config)
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log(response)
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

class App extends React.Component {
  render() {
    if (!Object.keys(this.props.currentUser).length) {
      return (
        <div className="container-fluid">
          <LoginPage />
        </div>)
    }
    return (
      <div className="container-fluid">
        <HeaderArea />
        <ContainerArea>
          <SidebarArea />
          <ContentArea />
        </ContainerArea>
      </div>
    );
  }
}


const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
})

export default connect(mapStateToProps)(App);

import React, { Component } from "react";
import { connect } from "react-redux";
import { unSelectNote, fetchNotes } from "../../../store/actions/notes";
import { fetchUsersList, selectedUser, logoutUser } from "../../../store/actions/user";
import NotePadImage from "../../../assets/images/notepad1.png";

class HeaderArea extends Component {

  async componentDidMount() {
    await this.props.fetchUsersList();
  }


  handleCreateNote = () => {
    this.props.unSelectNote();
  };

  handleChangeUser = async (e) => {
    const newUser = this.props.usersList.find(user => user.id === e.target.value);
    this.props.selectedUser(newUser)
    // console.log(newUser.id)
    await this.props.fetchNotes(newUser.id)
  }

  handleLogout = () => {
    this.props.logoutUser()
  }

  render() {
    return (
      <nav className="navbar">
        <div className="navbar-header">
          <img
            src={NotePadImage}
            className="img-fluid"
            alt="Responsive image"
            style={{ height: "30px", width: "30px" }}
          />

          <h3 className="navbar-brand">Notes</h3>
        </div>

        <ul className="nav navbar-nav navbar-righ">
          <div className="row">
            <select
              style={{ marginRight: "10px" }}
              onChange={this.handleChangeUser}
            // value={this.props.currentUser.id}
            >
              {
                this.props.usersList.map(user => (
                  <option
                    // selected={user.id === this.props.currentUser.id ? true : false}
                    key={user.id}
                    value={user.id}>{user.firstName}</option>
                ))
              }
            </select>
            <button
              onClick={this.handleCreateNote}
              type="button"
              className="btn btn-outline-primary"
            >
              <i style={{ paddingRight: 5 }} className="fas fa-plus icon"></i>
              Create
            </button>

            <button
              style={{ marginLeft: "10px" }}
              className="btn btn-outline-danger"
              onClick={this.handleLogout}>
              logout
            </button>
          </div>
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  usersList: user.usersList,
  currentUser: user.currentUser
})

const mapDispatchToProps = dispatch => ({
  fetchUsersList: () => dispatch(fetchUsersList()),
  unSelectNote: () => dispatch(unSelectNote()),
  selectedUser: (data) => dispatch(selectedUser(data)),
  fetchNotes: (id) => dispatch(fetchNotes(id)),
  logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderArea);

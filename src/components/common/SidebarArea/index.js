import React, { Component } from "react";
import { connect } from "react-redux";
import { selectedNote, fetchNotes } from "../../../store/actions/notes";

class SidebarArea extends Component {
  constructor() {
    super();
    this.state = {
      selectedUser: {
        id: 1
      }
    }
  }
  async componentDidMount() {
    await this.props.fetchNotes()
    this.setState({ selectedUser: this.props.selectedUser })
  }

  // static async getDerivedStateFromProps(props, state) {
  //   // console.log(props.selectedUser, state.selectedUser)
  //   if (state.selectedUser.id !== props.selectedUser.id) {
  //     await props.fetchNotes()
  //     return {
  //       seletedUser: props.selectedUser,
  //     }
  //   }
  //   return null;
  // }

  // async componenDidUpdate() {
  //   console.log("didupdate")
  //   await this.props.fetchNotes();
  // }

  changeSelectedNote = data => {
    this.props.selectedNote(data);
  };

  renderNotes() {
    return this.props.notes.map(note => (
      <div className="sideBarItem" key={note.id}>
        <h3 className="name" onClick={() => this.changeSelectedNote(note)}>{note.title}</h3>
        <i className="fas fa-chevron-circle-right icon"></i>
      </div>
    ));
  }

  render() {
    return (
      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 padding_hor_0">
        <div className="sideBar">
          {this.renderNotes()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ notes, user }) => ({
  notes: notes.data,
  selectedUser: user.selectedUser
});

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchNotes()),
  selectedNote: data => dispatch(selectedNote(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarArea);

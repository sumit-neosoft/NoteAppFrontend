import React, { Fragment } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import StyleButton from "./StyleButton";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { stateFromHTML } from "draft-js-import-html";
import { createNote, editNote } from "../../../store/actions/notes";
import FloatingButton from "../other/FloatingButton";


class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSaveButton: true,
      selectedNote: {},
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState, disableSaveButton: false });

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    // this.updateState = this.updateState.bind(this)
  }

  handleCreateNote = () => {
    // const data = this.state.editorState
    //   .getCurrentContent()
    //   .getPlainText("\u0001");
    const description = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    // console.log(typeof description)

    // const { selectedNote } = this.state;
    // const newNote = { ...selectedNote, title: newtitle, body: "data" };
    const { createNote, editNote, selectedUser } = this.props;
    const { selectedNote } = this.state;
    // console.log(selectedNote);
    selectedNote.description = description;
    selectedNote.title = selectedNote.title || "Untitled";
    if (selectedNote.id) {
      editNote(selectedNote, selectedUser.id);
      toast.success("Note updated successfully", {});
    } else {
      createNote(selectedNote, selectedUser.id);
      toast.info("Note created successfully", {});
    }
    // console.log(this.state.selectedNote);
  };

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  handleChangeTitle = e => {
    const selectedNote = { ...this.state.selectedNote };
    selectedNote.title = e.target.value;
    this.setState({ selectedNote, disableSaveButton: false });
  };

  static getDerivedStateFromProps(props, state) {
    // updateState()
    if (props.selectedNote.id !== state.selectedNote.id) {
      const data = stateFromHTML(`<h1>${props.selectedNote.description || ""}</h1>`);
      return {
        selectedNote: props.selectedNote,
        editorState: EditorState.createWithContent(data)
      };
    } else return null;
  }

  render() {
    const { editorState, selectedNote, disableSaveButton } = this.state;
    // console.log(editorState.getCurrentContent().getPlainText())

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== "unstyled"
      ) {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <Fragment>
        <div className="RichEditor-root">
          <input
            className="titleTextBox"
            type="text"
            placeholder="enter title"
            value={selectedNote.title || ""}
            onChange={this.handleChangeTitle}
          />
          <hr />
          <ToastContainer />
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              onTab={this.onTab}
              placeholder="enter note"
              ref="editor"
              spellCheck={true}
            />
          </div>
        </div>
        <FloatingButton
          isActive={disableSaveButton}
          onClick={this.handleCreateNote}
        />
      </Fragment>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ notes, user }) => ({
  selectedNote: notes.selectedNote || {},
  selectedUser: user.selectedUser || {}
});

const mapDispatchToProps = dispatch => ({
  createNote: (data, id) => dispatch(createNote(data, id)),
  editNote: (data, id) => dispatch(editNote(data, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(RichEditorExample);

// import React, { Component } from 'react';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// // import draftToHtml from 'draftjs-to-html';

// class EditorPad extends Component {
//     state = {
//         editorState: EditorState.createEmpty(),
//     }

//     onEditorStateChange = (editorState) => {
//         this.setState({
//             editorState,
//         });
//     };

//     render() {
//         const { editorState } = this.state;
//         return (
//             <div>
//                 <Editor
//                     editorState={editorState}
//                     wrapperClassName="demo-wrapper"
//                     editorClassName="demo-editor"
//                     onEditorStateChange={this.onEditorStateChange}
//                     toolbar={{
//                         blockType: { inDropdown: false },
//                         list: { inDropdown: true },
//                         textAlign: { inDropdown: true },
//                         link: { inDropdown: false },
//                         history: { inDropdown: true },
//                     }}
//                 />
//                 {/* <textarea
//                     disabled
//                     value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
//                 /> */}
//             </div>
//         );
//     }
// }
// export default EditorPad;
import React from "react";
import ImageUploading from "react-images-upload";
import "../css/upload.css";

function Upload() {
  return (
    <div className="upload">
      <div className="file-upload">
        <div className="image-upload-wrap">
          <input className="file-upload-input" type="file" accept="image/*" />
          <div className="drag-text">
            <h3>Drag and drop a file or select add Image</h3>
          </div>
        </div>
        {/* <div className="file-upload-content">
          <img className="file-upload-image" src="#" alt="your image" />
          <div className="image-title-wrap">
            <button type="button" onclick={() => removeUpload} className="remove-image">
              Remove <span className="image-title">Uploaded Image</span>
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default Upload;

// function Upload(){
//    const onDrop = (picture) => {
//         this.setState({
//             pictures: this.state.pictures.concat(picture),
//         });
//     }
//     return(
//         <div>
//         <ImageUploader
//                 withIcon={true}
//                 buttonText='Choose images'
//                 onChange={onDrop}
//                 imgExtension={['.jpg', '.gif', '.png', '.gif']}
//                 maxFileSize={5242880}
//          />
//         </div>
//     );
// }
// export default Upload;

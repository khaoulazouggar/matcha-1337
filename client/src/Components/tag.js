import React from "react";
import CreatableSelect from 'react-select/creatable';

function Tag(){
return(
    <div className= "tags"> <p>Add your Tags ...</p>
       <CreatableSelect isMulti/>
    </div>
);
}
export default Tag;


// function Tag() {
//   const [tag, setTag] = useState("");
//   const [tags, setTags] = useState("");
//   return (
//     <div>
//       <input
//         type="text"
//         onChange={(e) => {
//           setTag(e.target.value);
//         }}
       
//         onKeyUp={(e) => {
//           if (e.keyCode === 13) {
//             setTags(tag);
//             e.target.value = "";
//           }
//         }}
//       />
//       <span>{tags}</span>
//     </div>
//   );
// }
// export default Tag;

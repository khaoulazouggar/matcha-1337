import React from "react";
import CreatableSelect from 'react-select/creatable';

function Tag(props){
   const handleChange = (newValue) => {
    props.data.setTags([newValue, props.data.Tags]);
        console.log(newValue);
      };
    
return(
    <div className= "tags"> <p>Add your Tags ...</p>
       <CreatableSelect isClearable isMulti  defaultValue={[ {label:"props.data.Tags", value:"props.data.Tags"} ]} onChange={handleChange}/>
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

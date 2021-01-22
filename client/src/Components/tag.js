import React from "react";
import CreatableSelect from "react-select/creatable";

function Tag(props) {
  const handleChange = (newValue) => {
    if(newValue)
      props.data.setTags([...newValue]);
    // console.log(newValue);
   
  };

  return (
    <div className="tags">
      {console.log(props.data.tags)}
      <p>Add Your Tags ...</p>
      <CreatableSelect isClearable isMulti defaultValue={props.data.tags} onChange={handleChange} />
    </div>
  );
}
export default Tag;
import React from "react";

const CheckBox = setCheck =>{

    return <>
        <div className="checkbox_container">
            <input type="checkbox" name="full_time" id="checkbox" className="checkbox" onChange={e => setCheck(e.target.checked)}/>
            <label htmlFor="checkbox">Full Time Only</label>
        </div>
    </>

}

export default CheckBox;
import React from "react";

function AddPersonForm({ personInForm, onAddClick, onTextChange, editing, onCancelClick, onUpdateClick }) {
    const { firstName, lastName, age } = personInForm;

    function setButtons() {
        if (editing){
            return <div className="col-md-3">
                <button className="btn btn-warning btn-block" onClick={onUpdateClick}>Update</button>
                <button className="btn btn-info btn-block" onClick={onCancelClick}>Cancel</button>
            </div>
        }
        else{
            return <div className="col-md-3">
                <button className="btn btn-primary btn-block" onClick={onAddClick}>Add</button>
            </div>
        }
    }

    return <div className="row">
        <div className="col-md-3">
            <input className="form-control" placeholder="First Name" name="firstName" onChange={onTextChange} value={firstName} />
        </div>
        <div className="col-md-3">
            <input className="form-control" placeholder="Last Name" name="lastName" onChange={onTextChange} value={lastName} />
        </div>
        <div className="col-md-3">
            <input className="form-control" placeholder="Age" name="age" onChange={onTextChange} value={age} />
        </div>
        {setButtons()}
    </div>
}

export default AddPersonForm;
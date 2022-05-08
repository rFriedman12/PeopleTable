import React from 'react';

function PersonRow({ firstName, lastName, age, onDeleteClick, onEditClick, onCheckboxChange, isChecked }) {
    return <tr>
        <td>
            <input type='checkbox' checked={isChecked} onChange={onCheckboxChange} />
        </td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{age}</td>
        <td>
            <button className='btn btn-warning' onClick={onEditClick}>Edit</button>
            <button className='btn btn-danger ml-2' onClick={onDeleteClick}>Delete</button>
        </td>
    </tr>
}

export default PersonRow;
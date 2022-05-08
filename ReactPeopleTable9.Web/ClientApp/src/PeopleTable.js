import React from 'react';
import axios from 'axios';
import AddPersonForm from './AddPersonForm';
import PersonRow from './PersonRow';

class PeopleTable extends React.Component {
    state = {
        personInForm: {
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        checkedPeople: [],
        editing: false
    }

    componentDidMount() {
        this.LoadTable();
    }

    onAddClick = () => {
        axios.post('/api/people/add', this.state.personInForm).then(() => {
            axios.get('api/people/get').then(resp => {
                const emptyPerson = this.getEmptyPerson();
                this.setState({ people: resp.data, personInForm: emptyPerson });
            });
        });
    }

    onTextChange = e => {
        const personCopy = { ...this.state.personInForm };
        personCopy[e.target.name] = e.target.value;
        this.setState({ personInForm: personCopy });
    }

    onDeleteClick = id => {
        axios.post('/api/people/delete', { id }).then(() => {
            this.LoadTable();
        })
    }

    onEditClick = p => {
        this.setState({ editing: true, personInForm: p });
    }

    onCancelClick = () => {
        const emptyPerson = this.getEmptyPerson();
        this.setState({ editing: false, personInForm: emptyPerson })
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', this.state.personInForm).then(() => {
            axios.get('api/people/get').then(resp => {
                const emptyPerson = this.getEmptyPerson();
                this.setState({ people: resp.data, personInForm: emptyPerson, editing: false });
            });
        })
    }

    onCheckboxChange = id => {
        const { checkedPeople } = this.state;
        if (checkedPeople.includes(id)) {
            this.setState({ checkedPeople: checkedPeople.filter(p => p !== id) })
        }
        else {
            const checkedPeopleCopy = [...checkedPeople];
            checkedPeopleCopy.push(id);
            this.setState({ checkedPeople: checkedPeopleCopy });
        }
    }

    onCheckAllClick = () => {
        const peopleIds = this.state.people.map(p => p.id);
        this.setState({ checkedPeople: peopleIds });
        console.log(this.state.checkedPeople);
    }

    onUncheckAllClick = () => {
        this.setState({ checkedPeople: [] })
    }

    onDeleteAllClick = () => {
        const {checkedPeople} = this.state;
        axios.post('/api/people/deleteall', { ids: checkedPeople }).then(() => {
            this.LoadTable();
        })
    }

    LoadTable() {
        axios.get('api/people/get').then(resp => {
            this.setState({ people: resp.data });
        });
    }

    getEmptyPerson() {
        return {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    render() {
        const { personInForm, people, editing, checkedPeople } = this.state;

        return (
            <div className='container mt-3'>
                <AddPersonForm
                    personInForm={personInForm}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    editing={editing}
                    onCancelClick={this.onCancelClick}
                    onUpdateClick={this.onUpdateClick}>
                </AddPersonForm>
                <table className='mt-5 table table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>
                                <button className='btn btn-danger btn-block' onClick={this.onDeleteAllClick}>Delete All</button>
                                <button className='btn btn-info btn-block' onClick={this.onCheckAllClick}>Check All</button>
                                <button className='btn btn-info btn-block' onClick={this.onUncheckAllClick}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.map(p => {
                            return <PersonRow
                                key={p.id}
                                firstName={p.firstName}
                                lastName={p.lastName}
                                age={p.age}
                                isChecked={checkedPeople.includes(p.id)}
                                onDeleteClick={() => this.onDeleteClick(p.id)}
                                onEditClick={() => this.onEditClick(p)}
                                onCheckboxChange={() => this.onCheckboxChange(p.id)}>
                            </PersonRow>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default PeopleTable;
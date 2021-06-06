// useful reference: https://reactjs.org/docs/faq-ajax.html
import React from 'react';

class DoctorList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    
        this.handleSelection = this.handleSelection.bind(this);
    }
  
    handleSelection(ev) {
        const docID = ev.target.dataset.key;
        const doctor = this.state.doctors.filter(doc => doc._id === docID)[0];
        console.log(doctor);

        // notify the rest of the app that the doctor changed
        this.props.onDoctorSelection(doctor);
    }
  
    componentDidMount() {
        // todo: move to app so that the reset button will work!
        fetch('/doctors')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    doctors: data
                })
            })
    }

    render () {
        if (!this.state.doctors) {
            return (
                <aside className="aside">
                    {/* List of doctors goes here */}
                </aside>
            );
        }

        return (
            <aside className="aside">
                <ul>
                {
                    this.state.doctors.map(item => (
                        <li key={item._id} >
                            <a href="#" data-key={item._id} onClick={this.handleSelection}>{item.name}</a>
                        </li>
                    ))
                }
                </ul>
            </aside>
        );
    }
}

export default DoctorList;
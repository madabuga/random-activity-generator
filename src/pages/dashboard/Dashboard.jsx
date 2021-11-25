import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./Dashboard.css";
import { ACTIVITY_TYPE } from '../../constants/activity-info';


class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            type: ACTIVITY_TYPE[0],
            participantsNumber: null,
            maxPrice: null,
            result: null
        }
    }

    onChangeType = (e) => { this.setState({ type: e.target.value }) }
    onChangeParticipantsNo = (e) => { this.setState({ participantsNumber: e.target.value }) }
    onChangeMaxPrice = (e) => { this.setState({ maxPrice: e.target.value }) }

    handleSubmit = async (e) => {
        e.preventDefault();

        await axios.get('http://www.boredapi.com/api/activity?type=' + this.state.type + '&participants=' + this.state.participantsNumber + '&maxprice=' + this.state.maxPrice)
            .then(res => { this.setState({ result: [res.data] }) })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className='dashboard-page'>
                <div className='result-container'>
                    {
                        this.state.result ?
                            <div className='result-content'>{this.state.result.map((res, idx) => {
                                return (
                                    <div key={idx}>
                                        <p className='result-title'>Activity</p>
                                        {
                                            res.activity ?
                                                <div className='result-activity-idea'>{res.activity}</div> :
                                                <div className='result-activity-error'>{this.state.result[0].error}</div>
                                        }
                                    </div>
                                )
                            })}
                            </div> :
                            <div className='result-content'>
                                <div className='welcome-title'>
                                    <p>Welcome to the</p>
                                    <p>Random Activity Generator</p>
                                </div>
                                <div>
                                    <p>
                                        If you have too much time on your hands, but you have no idea what to do with it,
                                        you can use the random activity generator app to help you find an activity tailored for your needs.
                                    </p>
                                </div>
                            </div>
                    }
                    <Link to='/history' className="link-to-history-page">GO TO HISTORY</Link>
                </div>
                <div className='form-container'>
                    <form onSubmit={this.handleSubmit} className='generate-activity-form'>
                        <h1 className='form-title'>Generate Activity</h1>
                        <select required onChange={this.onChangeType}>
                            {
                                ACTIVITY_TYPE.map(type => {
                                    return <option key={type}>{type}</option>
                                })
                            }
                        </select>
                        <input type="text" required onChange={this.onChangeParticipantsNo} placeholder="Number of participants" />
                        <input required onChange={this.onChangeMaxPrice} pattern="^\d*(\.\d{0,2})?$" placeholder="Maximum price" />

                        <button type='submit' className='generate-btn'>generate</button>
                    </form>
                </div>
            </div>
        )
    }
}

export { Dashboard }
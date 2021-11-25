import React from 'react';

import "./History.css";


function History() {

    let historyActivityData = []
    for (let i = 1; i <= localStorage.length; i++) {
        if (String(localStorage.key(i)).substring(0, 9) === 'activity:') {
            historyActivityData.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }

    return (
        <div className='history-page'>
            <p className='history-title'>History of activities found</p>
            <div>
                <div className='table-row-header'>
                    <div className='activity-title'>Activity</div>
                    <div className='type-title'>Type</div>
                    <div className='participants-title'>Participants</div>
                    <div className='price-title'>Price</div>
                </div>
                {
                    historyActivityData.map((data, idx) => {
                        return (
                            <div className='table-row' key={idx}>
                                <div className='activity-item'>{data[0].activity}</div>
                                <div className='type-item'>{data[0].type}</div>
                                <div className='participants-item'>{data[0].participants}</div>
                                <div className='price-item'>{data[0].price}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export { History }
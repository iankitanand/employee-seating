import React from 'react';
import Seat from './Seat';

const Table = (props)=>{

    const tableData = props.tableData;

    const getSeats = ()=> {
        let seats = tableData.seats.map((seat, idx) => {
            //console.log(seat.identifier);
            return <Seat seatData={seat} key={seat.identifier} searchRefreshed={props.searchRefreshed}/>
        });
        return seats;
    };
    return (
        <div className="col-md-5 col-sm-12 table">
            <span>{tableData.title}</span>
            <div className="row">
                {getSeats()}
            </div>
        </div>
    );
};

export default Table;
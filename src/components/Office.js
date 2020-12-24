import React from 'react';
import Table from './Table';
import TableJson from '../tables';
import EmployJson from '../employees';
import { useState, useEffect } from 'react';

const Office = (props)=>{

    const [tables, setTables] = useState();
    const [searchFormData, setSearchFormData] = useState({term:null});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [searchRefreshed, setSearchRefreshed] = useState(null);
    const [employeeSeatMap, setEmployeeSeatMap] = useState({}); // <employeeId, seat data
    
    useEffect(()=>{
        let seatEmployeeMap = {};
        let employeeSeatMap = {};
        EmployJson.map((empl, idx) => {
            seatEmployeeMap[empl.seatIdentifier] = empl;  
        });
        TableJson.map((tbl, idx) => {
            tbl.seats.map((seat)=>{
                let emplData = seatEmployeeMap[seat.identifier];
                seat.employeeData = emplData;
                if(emplData) {
                    employeeSeatMap[emplData.id] = seat;
                }                
            });
         });
        
        setTables(TableJson);
        setEmployeeSeatMap(employeeSeatMap);
        setDataLoaded(true);
    }, []);

    const getTables = ()=> {
        let tablesEls = tables.map((tbl, idx) => {
            return <Table tableData={tbl} searchRefreshed={searchRefreshed} key={tbl.id}/>
        });
        return (<>{tablesEls}</>);
    };

    const searchEmployee = (evt) =>{
        let sterm = evt.target.value;
        setSearchFormData({...searchFormData, term: sterm});
        let filteredList = [];
        if(sterm) {
            filteredList = EmployJson.filter((empl)=>{
                if(empl.name.toLowerCase().startsWith(sterm)) {
                   employeeSeatMap[empl.id]['selected'] = true;
                } else {employeeSeatMap[empl.id]['selected'] = false;}
                return employeeSeatMap[empl.id].selected;
            });
        } else {
            Object.entries(employeeSeatMap).map(([eid, seat])=>{
                seat.selected = false;
            });
        }
       // console.log('search results: ', filteredList);
        setSearchRefreshed(filteredList.length);
    };

    return (dataLoaded) &&  (
        <div className="container">
            <div className="search">
                <input type="text" className="form-control" onChange={(evt)=>searchEmployee(evt)}
                placeholder="Enter Employee name"/>
            </div>
            <div className="row office">
                {getTables()}
            </div>
            
            <h2>Office</h2>
        </div>
    );
};

export default Office;
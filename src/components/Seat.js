import React, {useState, useEffect} from 'react';

const Seat = (props)=>{
    const [seatData, setSeatData] = useState({...props.seatData, occupied: props.seatData.employeeData != null});
    const [isHovered,  setIsHovered] = useState(false);
    
    let setData = ()=>{
        //console.log(props.searchRefreshed);
        let empd = props.seatData.employeeData;
        setSeatData({...seatData, occupied: empd!=null, selected:props.seatData.selected});
        if(props.searchRefreshed <= 1) {
            setIsHovered(empd != null && props.seatData.selected);
        }else {
            setIsHovered(false);
        }  
    }
    useEffect(()=>{
        setData();
    },[]);

    useEffect(()=>{
        setData();
    },[props.searchRefreshed]);

    return (
        <div className="col-sm-5">
            <div className={seatData.occupied && seatData.selected? "seat selected": seatData.occupied? "seat active":"seat"} 
            onMouseEnter={()=>seatData.occupied && setIsHovered(true)} 
             onMouseLeave={()=>seatData.occupied && setIsHovered(false)}>
                <span>{seatData.identifier}</span>
                <div className={isHovered? "info active" : "info"}>
                    {seatData.employeeData !=null &&(<>
                        <p>EId: {seatData.employeeData.id}</p>
                        <p>Name: {seatData.employeeData.name}</p>
                        <p>Designation: {seatData.employeeData.designation}</p>
                        <p>Team: {seatData.employeeData.team}</p>
                        <p>Project: {seatData.employeeData.Current_project}</p></>)
                    }
                    <p>Seat: {seatData.title}</p>
                    <p>Seat No: {seatData.identifier}</p>
                </div>
            </div>
        </div>
    );

};

export default Seat;
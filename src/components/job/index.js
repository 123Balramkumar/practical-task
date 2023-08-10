import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./style.scss";
import { getAllJobs } from "../../ApiCalls";

export default function Job(props) {
  const [action, setAction] = React.useState("");
  const [data, setData]= useState([])

  const handleChange = (event) => {
    setAction(event.target.value);
  };

  const preload = () => {
   
    getAllJobs()
      .then((data) => {
      
        if (data.error) {
          console.log(data.error);
        } else {
          setData(data.data);
        }
        console.log(
          "---------------get All jobs ------------",
          data.data
        );
      })
      .catch((error) => {
       
        console.log("Error fetching data:", error);
      });
  };

  useEffect(()=>{
    preload()
  },[])

  return (
    <>

     {data?.map((item)=>(
      <> 
    <div className="job-tab">
      
         
       
      <div className="job-data">
      <p className="name">{item?.name}</p>
     
        <p>Location: {item?.location}</p>
        <div className="status">
          <p>Posted on: {item?.posted}</p>
          <p>Status: {item?.status}</p>
        </div>
      </div>
      <p className="applied">{item?.applied} Applied</p>
      <p className="applied">{item?.jobViews} Job Views</p>
      <div className="premium">
        <div
          className="days-left"
          style={{
            backgroundColor: item?.premium
              ? "rgba(235, 202, 36, 0.1)"
              : item?.daysLeft > 2
              ? "rgba(84, 189, 165, 0.18)"
              : "",
          }}
        >
          <p
            style={{
              color: item?.premium
                ? "#C4A923"
                : item?.daysLeft > 2
                ? "#458677"
                : "",
            }}
          >
            {item?.premium ? "Premium" : "Free"} • {item?.daysLeft}{" "}
            Days Left
          </p>
        </div>
        {item?.premium ? (
          <p>You are getting better visibility as this is a premium job post</p>
        ) : (
          <p>
            Get more application by extending this job post.{" "}
            <span className="prem">Go Premium</span>
          </p>
        )}
      </div>
      <div className="btn-tab">
        <Button variant="contained" onClick={() => alert("See Applications")}>
          See Applications
        </Button>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Actions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={action}
            label="Actions"
            onChange={handleChange}
          >
            <MenuItem value={10}>Reject</MenuItem>
            <MenuItem value={20}>Shortlist</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
    </>

 ))}
 </>
  );
}

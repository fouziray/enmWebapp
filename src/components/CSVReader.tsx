// components/CSVReader
"use client";

import React, { useState, useEffect } from "react";
import CSVSelector from "./CSVSelector";
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector  } from "react-redux";
import {ThunkDispatch} from "@reduxjs/toolkit";
import { sitesCreationTech, selectCreatedSite, selectCreatedSiteLoad } from '@/features/site/siteCreationSlice.js';

const CSVReader = () => {
  const dispatch=useDispatch<any>();
  const leee=(headers,rows)=>{
  return (<table>
    <thead>
      <tr>
        {headers?.map((header, i) =>  {
          return (
          <th key={i}>{header}</th>
        )})}
      </tr>
    </thead>
    <tbody>
      {rows?.map((rowData, i) => {
      var jsonData = {};
        {rowData?.map((data, i) => {
          jsonData[headers[i]]=data;
        })
        //ta.push(jsonData);
        
        }
        return (
          <tr key={i}>
            {rowData?.map((data, i) => {
              return <td key={i}>{data}</td>;
            })

            }
          </tr>
        );
      })
      
      }
    </tbody>
  </table>);
}

  const [data, setData] = useState<string[][]>([]);
  const [sitesBatch,setSitesBatch]=useState([])
  const headers = data[0];
  const rows = data.slice(1);
  let ta=[];
  var jsonData = {};

  var viewData = { 
    sites : [] 
};
var formatofimports=["site_id","wilaya","UOP","2G","3G","4G"];
const [popformatalert,setPopFormatAlert ]=useState(false)
useEffect(()=>{
  setPopFormatAlert(false); 

 rows?.map((rowData, i) => {
    var jsonData = {};
    var techlist=[];
    rowData?.map((data, i) => {
      
      if(i>2){
        

        if(data!= "" && data!= '\r'){
          if(data[data.length-1]=='\r'){
            const cipherChars=[...data];
            cipherChars[data.length-1]='';
            data=cipherChars.join('');
            headers[i]="4G";
          }
        techlist.push({"type":headers[i],"state": data})
        }
      }else{
        jsonData[headers[i]]=data;
      }
    })
    headers?.map((header, i) =>  {
      if(header!=formatofimports[i]){
        setPopFormatAlert(true); 
      }
    });
    jsonData['managedObject']=techlist;
    ta.push(jsonData);
    if(!popformatalert){

    dispatch(sitesCreationTech(ta))
          .unwrap()
          .then(() => {
            
            console.log("finally made it !"+selectCreatedSite)
        })
          .catch(() => {
            console.log("error !")
            //setLoading(false);
          });
        }
    console.log("maaa",ta);
  })
},[data]);
   
  return (
    <div>

      <CSVSelector onChange={(_data) => setData(_data)} />
      { popformatalert ? <Alert severity="error">Please Respect the following format : site_id, wilaya, UOP, 2G, 3G, 4G !</Alert> : null}
      
    </div>
  );
};

export default CSVReader;

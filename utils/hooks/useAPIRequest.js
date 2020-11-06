import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'
import request from 'utils/store/request';
import stringify from 'fast-json-stable-stringify';

export default function useAPIRequest (reqData, includeStatus, waitForAll) {
  // Convert to Array if not already
  const isArray = Array.isArray(reqData);
  if(!isArray) reqData = [reqData];

  // Stringify RequestData
  const stringifiedData = reqData.map(i=>i?stringify({...i,extraData:undefined}):i);

  // Add Requests
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      for(let req of reqData.filter(i=>i)) dispatch(request.add({...req,extraData:undefined}));
      return () => {
        for(let req of reqData.filter(i=>i)) dispatch(request.remove({...req,extraData:undefined}));
      };
    },[stringify(reqData)])
  )
  
  // Get Request Responses
  const raw_data = useSelector(i => stringifiedData.map(req=>req?i.request_data[req]:undefined));
  const [data,setData] = useState([]);

  useEffect(()=>{
    var d = [];
    var i = 0;
    for(let dat of raw_data) {
      if(waitForAll && raw_data.some(i=>!i)) {
        d.push(null);
      } else if(dat&&data[i]&&dat.id===data[i].id) {
        d.push(data[i]);
      } else if(dat&&dat.data&&reqData[i].function) {
        d.push({
          data: reqData[i].function(dat.data)
        })
      } else {
        d.push(dat);
      }
      i++;
    }
    setData(d);
  },[stringify([...raw_data.map(i=>i?.id),...reqData.map(i=>stringify(i?.extraData))])])

  if(includeStatus) {
    // If Input is not array, return first element of Array
    if(!isArray) return data[0] ? {
      data: data[0]?.data,
      status: data[0]?.status
    } : {
      data: undefined,
      status: "loading"
    };
  
    // Return Array
    return data.map(i=>i?({
      data: i?.data,
      status: i?.status
    }):({
      data: undefined,
      status: "loading"
    }));
  }

  // If Input is not array, return first element of Array
  if(!isArray) return data[0]?.data;

  // Return Array
  return data.map(i=>i?.data);
}

export function useAPIRequestWithoutNav (reqData, includeStatus) {
  // Convert to Array if not already
  const isArray = Array.isArray(reqData);
  if(!isArray) reqData = [reqData];

  // Stringify RequestData
  const stringifiedData = reqData.map(i=>i?stringify({...i,extraData:undefined}):i);

  // Add Requests
  const dispatch = useDispatch();
  useEffect(() => {
    for(let req of reqData.filter(i=>i)) dispatch(request.add({...req,extraData:undefined}));
    return () => {
      for(let req of reqData.filter(i=>i)) dispatch(request.remove({...req,extraData:undefined}));
    };
  },[stringify(reqData)])
  
  // Get Request Responses
  const raw_data = useSelector(i => stringifiedData.map(req=>req?i.request_data[req]:undefined));
  const [data,setData] = useState([]);

  useEffect(()=>{
    var d = [];
    var i = 0;
    for(let dat of raw_data) {
      if(dat&&data[i]&&dat.id===data[i].id) {
        d.push(data[i]);
      } else if(dat&&dat.data&&reqData[i].function) {
        d.push({
          data: reqData[i].function(dat.data)
        })
      } else {
        d.push(dat);
      }
      i++;
    }
    setData(d);
  },[...raw_data.map(i=>i?.id),...reqData.map(i=>stringify(i?.extraData))])

  if(includeStatus) {
    // If Input is not array, return first element of Array
    if(!isArray) return data[0] ? {
      data: data[0]?.data,
      status: data[0]?.status
    } : {
      data: undefined,
      status: "loading"
    };
  
    // Return Array
    return data.map(i=>i?({
      data: i?.data,
      status: i?.status
    }):({
      data: undefined,
      status: "loading"
    }));
  }

  // If Input is not array, return first element of Array
  if(!isArray) return data[0]?.data;

  // Return Array
  return data.map(i=>i?.data);
}


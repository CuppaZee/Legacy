import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'
import request from 'utils/store/request';
import stringify from 'fast-json-stable-stringify';

export default function useAPIRequest (reqData) {
  // Convert to Array if not already
  const isArray = Array.isArray(reqData);
  if(!isArray) reqData = [reqData];

  // Add Requests
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      for(let req of reqData.filter(i=>i)) dispatch(request.add(req));
      return () => {
        for(let req of reqData.filter(i=>i)) dispatch(request.remove(req));
      };
    },[stringify(reqData)])
  )
  
  // Get Request Responses
  const raw_data = useSelector(i => reqData.map(req=>req?i.request_data[stringify(req)]:undefined));
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
  },raw_data.map(i=>i?.id))

  // If Input is not array, return first element of Array
  if(!isArray) return data[0]?.data;

  // Return Array
  return data.map(i=>i?.data);
}


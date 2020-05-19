import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native'
import request from '~store/request';
import stringify from 'fast-json-stable-stringify';

export default function useAPIRequest (reqData) {
  // Convert to Array if not already
  const isArray = Array.isArray(reqData);
  if(!isArray) reqData = [reqData];

  // Add Requests
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      for(let req of reqData) dispatch(request.add(req));
      return () => {
        for(let req of reqData) dispatch(request.remove(req));
      };
    },[stringify(reqData)])
  )
  
  // Get Request Responses
  const data = useSelector(i => reqData.map(req=>(i.request_data[stringify(req)] ?? {}).data));

  // If Input is not array, return first element of Array
  if(!isArray) return data[0];

  // Return Array
  return data;
}


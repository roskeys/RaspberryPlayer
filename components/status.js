import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import {baseURL, textColor} from '../constants';

const Status = () => {
  const [time, setTime] = useState(Date.now());
  const [status, setStatus] = useState('Unknown');
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
      axios
        .get(baseURL + '/status')
        .then(res => {
          setStatus(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View>
      <Text style={textColor}>
        Status: {status} Time: {time}
      </Text>
    </View>
  );
};

export default Status;

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import axios from 'axios';
import {baseURL, textColor} from '../constants';
const VolumeSlider = () => {
  const [volume, setVolume] = useState(42);
  return (
    <View style={{marginLeft: 30, marginRight: 30}}>
      <Slider
        value={volume}
        onValueChange={value => setVolume(value)}
        maximumValue={100}
        minimumValue={0}
        step={1}
      />

      <Text style={textColor}>Current Volume: {volume}</Text>
      <View style={{flexDirection: 'row', backgroundColor: '#2A3439'}}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => {
            axios.get(baseURL + `/volume?v=${volume}`).catch(e => {
              console.log(e);
            });
          }}>
          <Text style={[{textAlign: 'center', fontSize: 32}, textColor]}>
            Save Volume
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VolumeSlider;

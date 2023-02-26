import React from 'react';
import {View} from 'react-native';
import {Flex, Spacer} from 'react-native-flex-layout';
import {Text} from '@react-native-material/core';
import Button from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {baseURL, textColor} from '../constants';
const MusicItem = ({name}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        borderColor: 'gray',
        paddingLeft: 50,
        paddingRight: 50,
      }}>
      <Flex direction="row" justify="end">
        <Text style={[{fontSize: 18}, textColor]}>{name}</Text>
        <Spacer />
        <Button
          name="play"
          size={30}
          style={textColor}
          onPress={() =>
            axios.get(baseURL + `/play?f=${name}`).catch(e => {
              console.log(e);
            })
          }
        />
      </Flex>
    </View>
  );
};

export default MusicItem;

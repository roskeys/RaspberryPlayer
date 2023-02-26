/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MusicItem from './components/musicItem';
import {IconComponentProvider} from '@react-native-material/core';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import Button from 'react-native-vector-icons/FontAwesome';
import {Flex, Spacer} from 'react-native-flex-layout';
import {baseURL, textColor} from './constants';
import Status from './components/status';
import VolumeSlider from './components/volumeSlider';
import text from '@react-native-material/core/src/Text';

const App: () => Node = () => {
  const [data, setData] = React.useState([]);
  const getListOfSounds = () => {
    axios
      .get(baseURL + '/list')
      .then(res => {
        setData(res.data.sounds);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    getListOfSounds();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 0.6}}>
        <ScrollView style={{marginTop: 30}}>
          {data.map(name => {
            return <MusicItem name={name} key={name} />;
          })}
        </ScrollView>
      </View>

      <View style={{flex: 0.15}}>
        <VolumeSlider />
      </View>

      <View
        style={{
          flex: 0.2,
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#2A3439',
            marginLeft: 30,
            marginRight: 30,
          }}>
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => getListOfSounds()}>
            <Text style={[{textAlign: 'center', fontSize: 32}, textColor]}>
              Refresh
            </Text>
          </TouchableOpacity>
        </View>

        <Flex direction="row" style={{margin: 10}}>
          <Spacer />
          <Button
            name="pause"
            size={64}
            style={{color: '#2A3439'}}
            onPress={() =>
              axios.get(baseURL + '/pause').catch(e => {
                console.log(e);
              })
            }
          />
          <Spacer />
          <Button
            name="play"
            size={64}
            style={{color: '#2A3439'}}
            onPress={() =>
              axios.get(baseURL + '/resume').catch(e => {
                console.log(e);
              })
            }
          />
          <Spacer />
          <Button
            name="stop"
            size={64}
            style={{color: '#2A3439'}}
            onPress={() =>
              axios.get(baseURL + '/exit').catch(e => {
                console.log(e);
              })
            }
          />
          <Spacer />
        </Flex>
      </View>
      <View
        style={{
          flex: 0.02,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}>
        <Status />
      </View>
    </SafeAreaView>
  );
};

export default () => (
  <IconComponentProvider IconComponent={MIcon}>
    <App />
  </IconComponentProvider>
);

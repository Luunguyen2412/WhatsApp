import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  ImageBackground,
  Text,
  Linking,
} from 'react-native';

class Preview extends Component {
  state = {};

  render() {
    return (
      <View style={{width: 120, margin: 10}}>
        <TouchableOpacity>
          <ImageBackground
            style={{
              width: 130,
              height: 90,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            source={
              (uri =
                'https://icdn.24h.com.vn/upload/1-2023/images/2023-02-10/cr71356-1675974134-285-width740height650.jpg')
            }
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default Preview;

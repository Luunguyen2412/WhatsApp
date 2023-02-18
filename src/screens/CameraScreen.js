import {View, Text, Button} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';

const CameraScreen = () => {
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>CameraScreen</Text>
      <Button
        // onPress={() => {
        //   openCamera();
        // }}
        onPress={openCamera}
        title="Camera"
      />
    </View>
  );
};

export default CameraScreen;

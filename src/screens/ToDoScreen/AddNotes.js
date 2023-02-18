import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNote} from './reducer';
import DateTimePicker from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import ImagePicker from 'react-native-image-crop-picker';

const options = {
  multiple: true,
  useFrontCamera: true,
  mediaType: 'photo',
  forceJpg: true,
  compressImageQuality: 0.5,
};

const AddNotes = ({navigation}) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState('');
  const [selectImage, setSelectImage] = useState('');

  const pathImage = selectImage.path;

  const text = date ? dayjs(date).format('DD/MM/YYYY') : 'XX/YY/ZZZZ';

  const dispatch = useDispatch();

  const onSaveNote = () => {
    dispatch(addNote({noteTitle, noteDescription, date, pathImage}));
    navigation.goBack();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    setDate(date);
    hideDatePicker();
  };

  const openCamera = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setSelectImage(image);
    });
  };

  const selectGallery = () => {
    ImagePicker.openPicker({options}).then(image => {
      console.log(image);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'column',
      }}>
      <Text style={{color: 'black', fontWeight: '500'}}>
        Add Note Title here
      </Text>

      <TextInput
        value={noteTitle}
        mode="outlined"
        onChangeText={setNoteTitle}
        style={styles.title}
        borderColor="gray"
        placeholder="Add Note Title here"
        placeholderTextColor="gray"
      />

      <Text style={{color: 'black', fontWeight: '500'}}>
        Add Note Description
      </Text>

      <TextInput
        value={noteDescription}
        onChangeText={setNoteDescription}
        mode="outlined"
        style={styles.text}
        borderColor="gray"
        placeholder="Add Note Description"
        placeholderTextColor="gray"
      />

      <View style={{paddingVertical: 20}}>
        <Text style={{color: 'black', fontWeight: '500'}}>Add Time</Text>
        <Text style={{color: 'black', fontWeight: '500', fontSize: 18}}>
          {text}
        </Text>
        <Button title="Show Date" onPress={showDatePicker} />
        <DateTimePicker
          value={date}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <View style={{paddingVertical: 20}}>
        <Text style={{color: 'black', fontWeight: '500'}}>Add Image</Text>
        {/* {selectImage && (
          <Image
            source={{uri: selectImage.path}}
            style={{height: 100, width: 100, marginVertical: 10}}
            resizeMode="cover"
          />
        )} */}

        <Image
          source={{uri: selectImage.path}}
          style={{height: 100, width: 100, marginVertical: 10}}
          resizeMode="cover"
        />

        <Button title="Show Image" onPress={selectGallery} />
      </View>

      <TouchableOpacity
        disabled={noteTitle == '' ? true : false}
        onPress={() => onSaveNote()}
        style={[
          styles.buttonAdd,
          {backgroundColor: noteTitle == '' ? 'gray' : '#219653'},
        ]}>
        <Text
          style={{
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonAdd: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 650,
    right: 20,
    height: 60,
    borderRadius: 100,
  },
  iconButton: {
    backgroundColor: '#219653',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
    color: 'black',
    borderColor: 'black',
  },
  text: {
    paddingBottom: 150,
    fontSize: 16,
    color: 'black',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#219653',
  },
});
export default AddNotes;

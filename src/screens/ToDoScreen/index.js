import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addNote} from './reducer';
import dayjs from 'dayjs';

const ToDoView = ({navigation}) => {
  const notes = useSelector(state => state);
  // console.log(notes);

  const dispatch = useDispatch();

  const addHandle = note => {
    dispatch(addNote(note));
  };

  const Item = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Edit Note', {
            noteTitle: item.note.noteTitle,
            noteDescription: item.note.noteDescription,
            date: item.note.date,
          });
        }}
        style={{flexDirection: 'column', marginVertical: 10}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: '500'}}>
          {item.note.noteTitle}
        </Text>
        <Text style={{color: 'black'}}>
          {dayjs(item.note.date).format('DD/MM/YYYY')}
        </Text>
        <Text style={{color: 'black'}}>{item.note.noteDescription}</Text>
        <Image
          source={{uri: item.note.pathImage}}
          style={{height: 100, width: 100, marginVertical: 10}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
      }}>
      <FlatList
        data={notes}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Add Note', {addHandle});
        }}
        style={{
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 15,
          position: 'absolute',
          top: 600,
          right: 20,
          height: 60,
          backgroundColor: '#219653',
          borderRadius: 100,
        }}>
        <Text
          style={{
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Add a new note
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToDoView;

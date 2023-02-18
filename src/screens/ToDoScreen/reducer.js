export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

let noteID = 0;

console.log('noteID', noteID);

// ACTION
export function addNote(note) {
  return {type: ADD_NOTE, id: noteID++, note};
}

export function editNote(note) {
  return {type: EDIT_NOTE, id: noteID, note};
}

// REDUCER
const initialState = [];

function notesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note,
        },
      ];
    case EDIT_NOTE:
      return [
        ...state,
        {
          id: action.id,
          note: action.note,
        },
      ];
    default:
      return state;
  }
}

export default notesReducer;

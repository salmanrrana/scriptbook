
import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((
  state: CellsState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      // deletes it from the "data" object
      delete state.data[action.payload];
      //deletes it from the "order" array by the "id" using filter
      state.order = state.order.filter(id => id !== action.payload);
      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;

      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      return state;
    case ActionType.INSERT_CELL_AFTER:
      // creating a cell to add into our state
      const cell: Cell = {
        id: randomId(),
        type: action.payload.type,
        content: ''
      };

      state.data[cell.id] = cell;

      // now taking id of the cell and inserting into the "order" array
      const foundIndex = state.order.findIndex(id => id === action.payload.id);
      //if null, add to the beginning of the order
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        // if value, then insert it at spot
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      return state;
    default:
      return state;
  }
});

const randomId = () => {
  // using the "36" allows to use both numbers and letters
  // substring(2,5) will bring back a portion of the string we created
  return Math.random().toString(36).substring(2, 6);
};

export default reducer;

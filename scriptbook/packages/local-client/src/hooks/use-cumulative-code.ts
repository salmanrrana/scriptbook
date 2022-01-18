import { useTypedSelector } from './use-typed-selector';

// selector for the code sharing between cells
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);
    const showFunc = `
      import _React from 'react';
      import _ReactDOM from 'react-dom';

      var show = (value) => {
        const root = document.querySelector('#root');

        if (typeof value === 'object') {
          if (value.$$typeof && value.props) {
            _ReactDOM.render(value, root)
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value
        }
      }
      `;
    const showFuncNoop = `var show = () => {}`;
    let cumulativeCode = [];

    for (let cellContent of orderedCells) {
      if (cellContent.type === 'code') {
        if (cellContent.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(cellContent.content);
      }
      // if iterating on the current id of the cell
      // break out of the loop
      if (cellContent.id === cellId) {
        break;
      }
    }

    return cumulativeCode;
  }).join('\n');
};

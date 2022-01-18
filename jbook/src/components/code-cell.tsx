import './code-cell.css';
import { useEffect } from 'react';

import CodeEditor from './code-editor';
import Resizable from './resizable';
import Preview from './preview';

import { Cell } from '../state';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/use-typed-selector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  // selector for the code sharing between cells
  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map(id => data[id]);
    const cumulativeCode = [];

    for (let cellContent of orderedCells) {
      if (cellContent.type === 'code') {
        cumulativeCode.push(cellContent.content);
      }
      // if iterating on the current id of the cell
      // break out of the loop
      if (cellContent.id === cell.id) {
        break;
      }
    }

    return cumulativeCode;
  });

  console.log({ cumulativeCode });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cell.content, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingErrorStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

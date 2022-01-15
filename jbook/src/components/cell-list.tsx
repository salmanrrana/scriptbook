import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from './cell-list-item';


const CellList: React.FC = () => {
  // version with return statements
  // useTypedSelector(({ cells: { order, data } }) => {
  //   return order.map(id => {
  //     return data[id];
  //   })
  // });

  // cleaned up version without return statements
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  );

  const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} />);


  return <div>{renderedCells}</div>;
};

export default CellList;

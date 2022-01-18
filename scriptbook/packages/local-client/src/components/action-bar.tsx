import './action-bar.css';
import { useActions } from '../hooks/useActions';

interface ActionBarProps {
  id: string;
}

interface ActionButtonProps {
  iconName: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ iconName, onClick }) => {
  return (
    <button className="button is-primary is-small" onClick={onClick}>
      <span className="icon">
        <i className={`fas ${iconName}`} />
      </span>
    </button>
  );
};

const Actionbar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionButton iconName="fa-arrow-up" onClick={() => moveCell(id, 'up')} />
      <ActionButton iconName="fa-arrow-down" onClick={() => moveCell(id, 'down')} />
      <ActionButton iconName="fa-times" onClick={() => deleteCell(id)} />
    </div>
  );
};

export default Actionbar;

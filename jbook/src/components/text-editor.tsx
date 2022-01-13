import './text-editor.css';
import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

const TextEditor: React.FC<any> = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // make sure to prevent toggling when clicking in the edit mode
      // "event.target as Node" is placed in order to prevent a typescript error
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }

      setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor />
      </div>
    );
  }
  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'### Header'} />
    </div>
  );
};

export default TextEditor;
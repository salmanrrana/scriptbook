import './preview.css';
import { useEffect, useRef } from 'react';

interface PreviewProps {
  code: string;
  bundlingErrorStatus: string;
}

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script>
    const handleError = (err) => {
      const root = document.querySelector('#root');
      root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
      console.error(err);
    }

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error)
      })

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false)
    </script>
  </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingErrorStatus }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    // resetting the contents of the iframe
    iframe.current.srcdoc = html;
    // posting a message to the iframe
    // will delay to make sure that the message comes through correctly
    // gives the browser sometime to update the source dox
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {bundlingErrorStatus && (
        <div className="preview-error">
          <div style={{ color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
            Runtime Error
          </div>
          <div>
            {bundlingErrorStatus}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;

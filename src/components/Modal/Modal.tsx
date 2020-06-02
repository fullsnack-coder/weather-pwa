import React from 'react';
import ReactDOM from 'react-dom';

const Modal: React.FC = () => (
  <div className="Modal">
    <h2>Soy el modal</h2>
  </div>
);

export default ReactDOM.createPortal(
  <Modal />,
  document.querySelector('#modal-root') as Element,
);

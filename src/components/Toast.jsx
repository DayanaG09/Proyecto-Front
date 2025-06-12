import React, { useEffect } from "react";
import "../styles/toast.css";

function Toast({ mensaje , onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);
        return () => clearTimeout(timer);
    },[onClose]);

  return (
    <div className="toast-mensaje">
      {mensaje}
    </div>
  );
}

export default Toast;


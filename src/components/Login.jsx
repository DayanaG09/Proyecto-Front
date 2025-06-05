import React, { useState } from "react";
import "../styles/login.css";
import logo from "../assets/logo.png";
import RegisterUser from "../components/RegisterUser";
import ForgotPassword from "./ForgotPasswords";


function Login() {
  const [showRegister, setShowRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>
          SISTEMA DE INVENTARIO
          <br />
          HAYBET SALUD
        </h2>
        <img src={logo} alt="Haybet Salud" className="logo-img" />
      </div>

      <div className="login-right">
        <div className="emoji">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 22v-1c0-1.87 0-2.804.402-3.5A3 3 0 0 1 5.5 16.402C6.196 16 7.13 16 9 16l3 4l3-4c1.87 0 2.804 0 3.5.402a3 3 0 0 1 1.098 1.098C20 18.196 20 19.13 20 21v1M15.937 8l1.018-4.136C17.188 2.917 16.483 2 15.523 2H8.477c-.96 0-1.665.917-1.432 1.864L8.063 8m7.874 0v2c0 2.209-1.762 4-3.937 4s-3.937-1.791-3.937-4V8m7.874 0H8.063M12 4v2m1-1h-2"
              color="#fff"
            />
          </svg>
        </div>
        <form className="login-form">
          <input type="text" placeholder="USERNAME" />
          <input type="password" placeholder="PASSWORD" />
          <button type="submit" className="login-btn">
            LOGIN
          </button>
          <div className="links">
            <button type="button" onClick={() => setShowRegister(true)}>
              Registrate
            </button>
            <button type="button" onClick={() => setShowForgot(true)}>
              olvidé mi contraseña
            </button>
          </div>
        </form>
      </div>

      <RegisterUser
        show={showRegister}
        handleClose={() => setShowRegister(false)}
      />
      <ForgotPassword
        show={showForgot}
        handleClose={() => setShowForgot(false)}
      />
    </div>
  );
}

export default Login;

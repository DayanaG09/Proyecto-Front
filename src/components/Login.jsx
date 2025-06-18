import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../styles/login.css";
import logo from "../assets/logo.png";
import ForgotPassword from "./ForgotPasswords";
import ResetPassword from "./ResetPassword";
import Toast from "./Toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetToken, setResetToken] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [mensajeToast, setMensajeToast] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const mostrarToast = (mensaje) => {
    setMensajeToast(mensaje);
    setMostrarMensaje(true);
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setResetToken(token);
      setShowResetModal(true);
    }
  }, [searchParams]);
  
  const goTo = (ruta) => {
    navigate(ruta);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log("Usuario autenticado:", response.data);
      // Guarda al usuario en localStorage si deseas mantener sesión
      localStorage.setItem("user", JSON.stringify(response.data));
      goTo("/home")
    } catch (error) {
      console.error("Login fallido:", error);
       mostrarToast("Correo o contraseña incorrectos");

    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="texto-difuminado">
        <  h2>
          SISTEMA DE INVENTARIO
          <br />
          HAYBET SALUD
        </h2>
        </div>
        <img src={logo} alt="Haybet Salud" className="logo-img" />
      </div>

      <div className="login-right">
       <div className="login-form-icon">
  {/* Ícono SVG */}
  <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24">
    <path fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M4 22v-1c0-1.87 0-2.804.402-3.5A3 3 0 0 1 5.5 16.402C6.196 16 7.13 16 9 16l3 4l3-4c1.87 0 2.804 0 3.5.402a3 3 0 0 1 1.098 1.098C20 18.196 20 19.13 20 21v1M15.937 8l1.018-4.136C17.188 2.917 16.483 2 15.523 2H8.477c-.96 0-1.665.917-1.432 1.864L8.063 8m7.874 0v2c0 2.209-1.762 4-3.937 4s-3.937-1.791-3.937-4V8m7.874 0H8.063M12 4v2m1-1h-2"
      color="#fff"
    />
  </svg>
</div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <span className="input-icon"></span>
          <input
            type="text"
            placeholder="dayaya0998@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div className="input-group">
            <span className="input-icon"></span>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          

          
          </div>
          
          <button type="submit" className="login-btn">
            LOGIN
          </button>
          <div className="links">
            <button type="button" onClick={() => setShowForgotModal(true)}>
              Olvidé mi contraseña

            </button>
          </div>
        </form>
      </div>

      <ForgotPassword
        show={showForgotModal}
        handleClose={() => setShowForgotModal(false)}
      />

      <ResetPassword
        show={showResetModal}
        token={resetToken}
        handleClose={() => {
          setShowResetModal(false);
          setResetToken(null);
        }}
      />
      {mostrarMensaje && (
          <Toast
            mensaje={mensajeToast}
            onClose={() => setMostrarMensaje(false)}
          />
        )}
    </div>
  );
}

export default Login;
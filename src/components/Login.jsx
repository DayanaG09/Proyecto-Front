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
        <h2>
          SISTEMA DE INVENTARIO
          <br />
          HAYBET SALUD
        </h2>
        <img src={logo} alt="Haybet Salud" className="logo-img" />
      </div>

      <div className="login-right">
        <div className="emoji">{/* Icono omitido por brevedad */}</div>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
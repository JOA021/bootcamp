"use client"
import React, { useState, useEffect } from 'react';


import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from "./page.module.css";

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(true); // Estado para alternar formularios
  const [registro, setRegistro] = useState({
    nombre: '',
    celular: '',
    email: '',
    password: ''
  });
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const [mensajeBienvenida, setMensajeBienvenida] = useState('');

  const toggleForm = () => {
    setShowSignUp(prevState => !prevState);
  }

  const handleChangeRegistro = (e) => {
    const { name, value } = e.target;
    setRegistro(prevRegistro => ({
      ...prevRegistro,
      [name]: value
    }));
  }

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setLogin(prevLogin => ({
      ...prevLogin,
      [name]: value
    }));
  }

  const handleSubmitRegistro = (e) => {
    e.preventDefault();
    // Guardar en localStorage
    localStorage.setItem('usuario', JSON.stringify(registro));
    alert('Registro exitoso!');
    // Limpiar formulario
    setRegistro({
      nombre: '',
      celular: '',
      email: '',
      password: ''
    });
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    // Obtener datos de localStorage
    const usuarioRegistrado = JSON.parse(localStorage.getItem('usuario'));
    // Verificar credenciales
    if (usuarioRegistrado && usuarioRegistrado.email === login.email && usuarioRegistrado.password === login.password) {
      setMensajeBienvenida(`Bienvenido ${usuarioRegistrado.nombre}`);
    } else {
      alert('Correo o contraseña incorrectos.');
    }
    // Limpiar formulario
    setLogin({
      email: '',
      password: ''
    });
  }
  return (
    <main className={styles.main}>
      <article className={styles.sign} style={{ display: showSignUp ? 'block' : 'none' }}>
        <h2 className="mb-5">Registrarse</h2>

        <form onSubmit={handleSubmitRegistro}>
          <FloatingLabel
            controlId="floatingInput"
            label="Nombre"
            className="mb-3 prueba"
          >
            <Form.Control
              type="text"
              name="nombre"
              value={registro.nombre}
              onChange={handleChangeRegistro}
              placeholder="Nombre Apellido"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="celular"
            label="Número Celular"
            className="mb-3"
          >
            <Form.Control
              type="tel"
              name="celular"
              value={registro.celular}
              onChange={handleChangeRegistro}
              placeholder="Celular"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="emailRegistro"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              value={registro.email}
              onChange={handleChangeRegistro}
              placeholder="name@example.com"
            />
          </FloatingLabel>

        
          <FloatingLabel
            controlId="passwordRegistro"
            label="Contraseña"
          >
            <Form.Control
              type="password"
              name="password"
              value={registro.password}
              onChange={handleChangeRegistro}
              placeholder="Password"
            />
          </FloatingLabel>

          <p className="mt-3">¿Ya tienes cuenta? <Button variant="outline-light" type="button" onClick={toggleForm}>Iniciar sesión</Button>{' '}</p>

          <Button variant="outline-light" type="submit" className="mt-3">Registrarse</Button>
        </form>
      </article>

      <article className={styles.login} style={{ display: showSignUp ? 'none' : 'block' }}>
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleSubmitLogin}>
        <FloatingLabel
            controlId="emailLogin"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              name="email"
              value={login.email}
              onChange={handleChangeLogin}
              placeholder="name@example.com"
            />
          </FloatingLabel>

          
          <FloatingLabel
            controlId="passwordLogin"
            label="Contraseña"
          >
            <Form.Control
              type="password"
              name="password"
              value={login.password}
              onChange={handleChangeLogin}
              placeholder="Password"
            />
          </FloatingLabel>

          <p className="mt-3">¿No tienes cuenta? <Button variant="outline-light" type="button" onClick={toggleForm}>Registrarse</Button>{' '}</p>
          <Button variant="outline-light" type="submit" className="mt-3">Iniciar sesión</Button>
        </form>
      </article>
      {mensajeBienvenida && <h1>{mensajeBienvenida}</h1>}
    </main>
  );
}


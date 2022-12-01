import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import "./Login.css";
//import { authenticate } from "../features/auth/authSlice";
//import { store } from "../app/store";
import { useLocation, useNavigate } from "react-router-dom";

interface LocationState {
  target_url: string | null;
}

const LoginFc: React.FC = (props) => {
  const [email, setEmail] = useState("swpulitzer@gmail.com");
  const [password, setPassword] = useState("password");
  const location = useLocation();
  const navigate = useNavigate();

  const { target_url } = (location.state as LocationState) || {
    target_url: null,
  };

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    console.log(email, password);
    handleClick();
    /*store.dispatch(
      authenticate({
        email: email,
        password: password,
        navigate: navigate,
        target_url: target_url,
      })
    );*/
  }

  const handleClick = () => {
    console.log("handleClick");
    navigate("/app");
  };

  return (
    <div className="Login">
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Form.Group>
        <Button
          size="lg"
          type="submit"
          disabled={!validateForm()}
          onClick={handleSubmit}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginFc;

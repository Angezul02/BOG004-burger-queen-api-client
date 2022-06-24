import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByText,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "./Login";
import { createMemoryHistory } from "history";
import { Router, Routes, Route } from "react-router-dom";
import AdminColaborator from "../Admin/AdminColaborator";
import userEvent from '@testing-library/user-event';

test("Login component, debe retornar usuario no encontrado", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );
  const emaiInput = screen.getByTestId("login-email-input");
  const passwordInput = screen.getByTestId("login-password-input");
  fireEvent.change(emaiInput, { target: { value: "francyPrueba@gmail.com" } });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  const btnLogin = screen.getByText("Login");
  fireEvent.click(btnLogin);
  await waitFor(async () => {
    const errMnsj = await screen.getByText("Cannot find user");
    expect(errMnsj.textContent).toBe("Cannot find user");
  });
});



test("Login component, debe retornar contraseña", async () => {
  const history = createMemoryHistory();
  render(
    <Router location={history.location} navigator={history}>
      <Login />
    </Router>
  );
  const emaiInput = screen.getByTestId("login-email-input");
  const passwordInput = screen.getByTestId("login-password-input");
  fireEvent.change(emaiInput, { target: { value: "grace.hopper@systers.xyz" } });
  fireEvent.change(passwordInput, { target: { value: "12345" } });
  const btnLogin = screen.getByText("Login");
  fireEvent.click(btnLogin);
  await waitFor(async () => {
    const errMnsj = await screen.getByText("Incorrect password");
    expect(errMnsj.textContent).toBe("Incorrect password");
  });
});

test.only("Login component success", async () => {
  const history = createMemoryHistory();
  const { debug } = render(
    <Router location={history.location} navigator={history}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/AdminColaborator" element={<AdminColaborator />} />
      </Routes>
    </Router>
  );
  const user = userEvent.setup()
  const emaiInput = screen.getByTestId("login-email-input");
  const passwordInput = screen.getByTestId("login-password-input");
  fireEvent.change(emaiInput, {
    target: { value: "grace.hopper@systers.xyz" },
  });
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  const btnLogin = screen.getByTestId("login-btn");
  await user.click(btnLogin);

  await waitFor(() => {
    const admin = screen.getByText("Burger Queen");
    expect(admin).toBeTruthy()
  });
});

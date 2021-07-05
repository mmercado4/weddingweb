import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Login from "../components/Admin/Login";

test("form responds to log in", async () => {
  render(<Login />);

  //Check if all fields are empty
  const userField = screen.getByPlaceholderText("Usuario");
  const passwordField = screen.getByPlaceholderText("Contraseña");
  expect(userField).toHaveValue("");
  expect(passwordField).toHaveValue("");

  //Type user and password
  userEvent.type(userField, "admin");
  expect(userField).toHaveValue("admin");
  userEvent.type(passwordField, "1234");
  expect(passwordField).toHaveValue("1234");

  //Click login button
  const loginButton = screen.getByRole("button", { name: "Acceder" });
  userEvent.click(loginButton);

  //Wait for the server answer
  const successMessage = await screen.findByRole("p", {
    name: /usuario logueado correctamente/i,
  });
  expect(successMessage).toBeInTheDocument();
});

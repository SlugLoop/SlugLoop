import React, { useState, useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contact from "../Components/Contact";
import AppContext from "../appContext";

/*
Test to see is the Contact Us Page is rendered Correctly
*/

test("Contact Us Form", () => {
  //const darkMode = true;
  render(
    <AppContext.Provider value={{ darkMode: true }}>
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    </AppContext.Provider>
  );

  // Fill in the form fields
  const nameInput = screen.getByLabelText("Name");
  const temp = screen.get;
  fireEvent.change(nameInput, { target: { value: "John Doe" } });

  const emailInput = screen.getByLabelText("Email");
  fireEvent.change(emailInput, { target: { value: "john@example.com" } });

  const messageInput = screen.getByLabelText("Message");
  fireEvent.change(messageInput, { target: { value: "Test message" } });

  // Submit the form
  const submitButton = screen.getByText("SUBMIT");
  fireEvent.click(submitButton);

  // Assert that the success message is displayed
  const successMessage = screen.getByText("Message sent successfully");
  expect(successMessage).toBeInTheDocument();
});

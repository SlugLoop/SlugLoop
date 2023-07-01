import React, { useState, useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Contact from "../Components/Contact";
import AppContext from "../appContext";

/*
Test to see is the Contact Us Page is rendered Correctly
*/

test("renders contact page", () => {
  const darkMode = true;
  render(
    <AppContext.Provider value={{ darkMode }}>
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    </AppContext.Provider>
  );

  // Check if "Contact Us" heading is rendered
  const contactHeading = screen.getByText("Contact Us");
  expect(contactHeading).toBeInTheDocument();

  // Check if "Contact Us Message" is rendered
  const contactMessage = screen.getByText(
    "Slug Loop is helping students get to where they need to go. If you have any questions or concerns, please contact us."
  );
  expect(contactMessage).toBeInTheDocument();

  // Check if "Name" is rendered
  const nameItem = screen.getByText("Name");
  expect(nameItem).toBeInTheDocument();

  // Check if "Email" is rendered
  const emailItem = screen.getByText("Email");
  expect(emailItem).toBeInTheDocument();

  // Check if "Message" is rendered
  const messageItem = screen.getByText("Message");
  expect(messageItem).toBeInTheDocument();

  // Check if "SUBMIT" button is rendered
  const submitButton = screen.getByText("SUBMIT");
  expect(submitButton).toBeInTheDocument();

  // Check if "BACK" button is rendered
  const backButton = screen.getByText("BACK");
  expect(backButton).toBeInTheDocument();

  //   // Check form Inputs
  //   const nameInput = screen.getByText("Name");
  //   fireEvent.change(nameInput, { target: { value: "Name Eman" } });
  //   expect(nameInput.value).toBe("Name Eman");

  //   const emailInput = screen.getByLabelText("Email");
  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   expect(emailInput.value).toBe("test@example.com");

  //   const messageInput = screen.getByLabelText("Message");
  //   fireEvent.change(messageInput, {
  //     target: { value: "This is a test message" },
  //   });
  //   expect(messageInput.value).toBe("This is a test message");

  //   fireEvent.click(submitButton);
});

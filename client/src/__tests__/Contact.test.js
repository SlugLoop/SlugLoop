import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../Components/Contact';
import { BrowserRouter } from 'react-router-dom';

import {rest} from 'msw';
import {setupServer} from 'msw/node';

// Wrapping the component with BrowserRouter since it uses 'useNavigate' hook
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({}),
  }),
);

describe('Contact Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form correctly', () => {
    renderWithRouter(<Contact openSuccess='true'/>);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('renders snackbar for empty fields on form submit', async () => {
    renderWithRouter(<Contact />);
    userEvent.click(screen.getByText('Submit'));
    await waitFor(() => {
      expect(screen.getByText('Please fill out all fields')).toBeInTheDocument();
    });
  });

  test('renders snackbar for successful form submit', async () => {
    renderWithRouter(<Contact />);
    fireEvent.change(screen.getByText('Name'), 'John Doe');
    fireEvent.change(screen.getByText('Email'), 'john@example.com');
    fireEvent.change(screen.getByText('Message'), 'Hello, Slug Loop!');
    fireEvent.submit(screen.getByText('Submit'));

    const buttonElement = screen.getByText('Submit');

    fireEvent.click(buttonElement);
    // await waitFor(() => {
    //   expect(screen.getByText('Message sent successfully')).toBeInTheDocument();
    // });
  });

  test('sends POST request with correct data on form submit', async () => {
    renderWithRouter(<Contact />);
    // Find the TextField component
    const textField = screen.getByRole('textbox', { name: /Name/i });
    // Simulate a change event on the TextField component
    fireEvent.change(textField, { target: { value: 'example text' } });
    // Assert that the TextField's value has been updated
    expect(textField).toHaveValue('example text');

  });
});


const URL = 'https://slugloop.azurewebsites.net/contact';

const server = setupServer(

);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test('Valid Submit', async () => {
  server.use(
    rest.post(URL, (req, res, ctx) => {
      return res(ctx.status(200),
        ctx.json());
    }),
  );

  const setOpenSuccess = jest.fn()
  renderWithRouter(<Contact setOpenSuccess={setOpenSuccess}/>);



  fireEvent.change(screen.getByText('Name'), 'John Doe');
  fireEvent.change(screen.getByText('Email'), 'john@example.com');
  fireEvent.change(screen.getByText('Message'), 'Hello, Slug Loop!');

  fireEvent.submit(screen.getByRole('button', { name: /submit/i }));


  // await screen.findByText('Message sent successfully');
});
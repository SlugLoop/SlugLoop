import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SettingsButton from '../Components/SettingsButton';
import { BrowserRouter } from 'react-router-dom';

import {rest} from 'msw';
import {setupServer} from 'msw/node';





const server = setupServer(
    // rest.get(URL, (req, res, ctx) => {
    //   return res(ctx.status(200).json(user));
    // }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const URL = 'http://localhost:3010/login';


// describe('SettingsButton', () => {
//     test('renders the settings button', () => {
//         render(
//             <BrowserRouter>
//                 <SettingsButton />
//             </BrowserRouter>,
//             )
//         // userEvent.click(screen.getByTestId('settings-button'));
//         expect(screen.getByText('Settings')).toBeInTheDocument();
//         expect(screen.getByText('Show Time')).toBeInTheDocument();
//         expect(screen.getByText('Dark Mode')).toBeInTheDocument();
//         expect(screen.getByText('Show Only Recent Buses')).toBeInTheDocument();
//     });
  
   
//   });


// Describe the component being tested
describe('SettingsButton', () => {
    // Define the test case
    it('should render the SettingsButton component', () => {
      // Render the component
      render(
        <BrowserRouter>
          <SettingsButton />
        </BrowserRouter>
      );
  
      // Find the SettingsButton component by its icon
      const settingsButton = screen.getByTestId('settings-button');
  
      // Assert that the component is rendered
      expect(settingsButton).toBeInTheDocument();
    });
  });
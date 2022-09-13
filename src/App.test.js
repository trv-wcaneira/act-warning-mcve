import { render, screen } from '@testing-library/react';
import App from './App';

global.fetch = () => Promise.resolve({ status: 200, json: () => Promise.resolve({ title: 'testing123' })})

test('renders loading indicator and then the fetched content, withOUT "act" warnings', async () => {
  render(<App />);

  //this version generates no "act" warning, neither does screen.queryByText
  expect(screen.getByText('Loading...')).toBeInTheDocument()
  
  const text = await screen.findByText('testing123');
  expect(text).toBeInTheDocument();
});

test('renders loading indicator and then the fetched content, WITH "act" warnings', async () => {
  render(<App />);
  
  //...but this one SHOULD generate the warning, as soon as we wait; waitFor will cause the warning too
  await screen.findByText('Loading...')

  const text = await screen.findByText('testing123');
  expect(text).toBeInTheDocument();
});

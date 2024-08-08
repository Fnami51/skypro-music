import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/login/page';
import { Provider } from 'react-redux';
import { store } from '@/store/store'; 

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Компонент Home', () => {
  test('должен отображать элементы формы', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Почта');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Пароль');
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByText('Войти');
    expect(loginButton).toBeInTheDocument();

    const registerLink = screen.getByText('Зарегистрироваться');
    expect(registerLink).toBeInTheDocument();
  });

  test('должен показывать сообщения об ошибках при пустых полях', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const loginButton = screen.getByText('Войти');
    fireEvent.click(loginButton);

    expect(screen.getByText('Почта обязательна')).toBeInTheDocument();
    expect(screen.getByText('Пароль обязателен')).toBeInTheDocument();
  });

  test('должен проверять правильность формата почты', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('Почта');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const loginButton = screen.getByText('Войти');
    fireEvent.click(loginButton);

    expect(screen.getByText('Неверный формат почты')).toBeInTheDocument();
  });

  test('должен проверять длину пароля', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const passwordInput = screen.getByPlaceholderText('Пароль');
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    const loginButton = screen.getByText('Войти');
    fireEvent.click(loginButton);

    expect(screen.getByText('Пароль должен содержать минимум 8 символов')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/signup/page';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { toSignUp } from '../../api/authApi';
import { getToken } from '../../api/token';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock('../../api/authApi', () => ({
  toSignUp: jest.fn(),
}));

jest.mock('../../api/token', () => ({
  getToken: jest.fn(),
}));

describe('Компонент Home (Регистрация)', () => {
  test('должен отображать элементы формы', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Почта')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Повторите пароль')).toBeInTheDocument();

    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
  });

  test('должен показывать сообщения об ошибках при пустых полях', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Почта обязательна')).toBeInTheDocument();
    expect(screen.getByText('Пароль обязателен')).toBeInTheDocument();
  });

  test('должен показывать сообщение об ошибке при неверном формате почты', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Почта'), { target: { value: 'invalid-email' } });
    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Неверный формат почты')).toBeInTheDocument();
  });

  test('должен показывать сообщение об ошибке при коротком пароле', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Почта'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText('Повторите пароль'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Пароль должен содержать минимум 6 символов')).toBeInTheDocument();
  });

  test('должен показывать сообщение об ошибке при несовпадающих паролях', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Почта'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Повторите пароль'), { target: { value: 'password124' } });
    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Пароли не совпадают')).toBeInTheDocument();
  });

  test('должен успешно регистрировать пользователя при правильных данных', async () => {

    (toSignUp as jest.Mock).mockResolvedValue({
      message: 'Success',
      result: { email: 'test@example.com', username: 'testuser', _id: 1 },
      success: true,
    });

    (getToken as jest.Mock).mockResolvedValue({
      access: 'mockAccessToken',
      refresh: 'mockRefreshToken',
    });

    const { push } = require('next/navigation').useRouter();

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Почта'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Повторите пароль'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Зарегистрироваться'));

    expect(await screen.findByText('Зарегистрироваться')).toBeInTheDocument(); 
    expect(toSignUp).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(getToken).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(push).toHaveBeenCalledWith('/');
  });
});

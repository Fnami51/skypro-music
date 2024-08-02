/*
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../app/login/page";
import ReduxProvider from "../store/ReduxProvider";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';

test('должен отображать ошибку при пустых полях и успешно входить при правильных данных', async () => {
  render(
    <ReduxProvider>
        <Home />
    </ReduxProvider>
  );

  // Проверяем отображение ошибок при пустых полях
  fireEvent.click(screen.getByText('Войти'));
  expect(await screen.findByText('Пожалуйста, заполните все поля.')).toBeInTheDocument();

  // Заполняем поля и проверяем успешный вход
  fireEvent.change(screen.getByPlaceholderText('Почта'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Пароль'), { target: { value: 'password' } });
  
  fireEvent.click(screen.getByText('Войти'));

  // Здесь вы можете использовать Mock функции и API для проверки успешного входа
});
*/
// validation.test.ts
import { validate } from '../app/login/page';

describe('Функция валидации', () => {
  test('Отсутствие почты', () => {
    const result = validate('', 'password123');
    expect(result.email).toBe('Почта обязательна');
  });

  test('Некоректная почта', () => {
    const result = validate('invalid-email', 'password123');
    expect(result.email).toBe('Неверный формат почты');
  });

  test('Отсутствие пароля', () => {
    const result = validate('test@example.com', '');
    expect(result.password).toBe('Пароль обязателен');
  });

  test('Длина пароля', () => {
    const result = validate('test@example.com', '12345');
    expect(result.password).toBe('Пароль должен содержать минимум 8 символов');
  });

  test('Отсутствие ошибок', () => {
    const result = validate('test@example.com', 'password123');
    expect(result).toEqual({});
  });
});

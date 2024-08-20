import { formatDuration } from "../../components/track";

describe("Функция форматирования", () => {
  it("Форматирует 6 секунд", () => {
    const result = formatDuration(6);
    expect(result).toBe("0:06");
  });
  it("Форматирует 205 секунд", () => {
    const result = formatDuration(205);
    expect(result).toBe("3:25");
  });
  it("Форматирует 0 секунд", () => {
    const result = formatDuration(0);
    expect(result).toBe("0:00");
  });
});
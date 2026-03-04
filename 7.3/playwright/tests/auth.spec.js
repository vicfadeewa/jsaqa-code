import { test, expect } from '@playwright/test';
import { email, password } from '../user.js';

test('1. Успешная авторизация', async ({ page }) => {
  await page.goto('https://netology.ru/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000
  });

  const loginButton = page.locator('a[href*="modal=sign_in"]');
  await expect(loginButton).toBeVisible({ timeout: 10000 });
  await loginButton.click();

  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in', {
    timeout: 15000
  });

  const emailLoginButton = page.locator('.styles_button__MYGdj');
  await expect(emailLoginButton).toBeVisible({ timeout: 10000 });
  await emailLoginButton.click();

  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');
  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await expect(passwordInput).toBeVisible({ timeout: 10000 });

  await emailInput.fill(email);
  await passwordInput.fill(password);

  const submitButton = page.locator('[data-testid="login-submit-btn"]');
  await expect(submitButton).toBeVisible({ timeout: 5000 });
  await expect(submitButton).toBeEnabled({ timeout: 5000 });
  await submitButton.click();

  await expect(page).toHaveURL(/profile/, { timeout: 30000 });

  const greetingElement = page.locator('div.typography-bold.b1ru04lg.btmer43.h1qgxfog');
  await expect(greetingElement).toBeVisible({ timeout: 5000 });
  await expect(greetingElement).toContainText('Здравствуйте, Виктория', { timeout: 5000 });

  const calendarButton = page.getByTestId('programs-commonCalendar-btn');
  await expect(calendarButton).toContainText('Расписание занятий', { timeout: 5000 });

  await page.screenshot({
    path: 'screenshots/successful-auth.png',
    fullPage: true
  });

  console.log('Тест успешной авторизации пройден успешно!');
  });

test('2. Неуспешная авторизация: неверный email и пустое поле пароля', async ({ page }) => {
  await page.goto('https://netology.ru/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000
  });

  const loginButton = page.locator('a[href*="modal=sign_in"]');
  await expect(loginButton).toBeVisible({ timeout: 10000 });
  await loginButton.click();

  await expect(page).toHaveURL('https://netology.ru/?modal=sign_in', {
    timeout: 15000
  });

  const emailLoginButton = page.locator('.styles_button__MYGdj');
  await expect(emailLoginButton).toBeVisible({ timeout: 10000 });
  await emailLoginButton.click();

  const emailInput = page.locator('input[type="email"]');
  const passwordInput = page.locator('input[type="password"]');

  await expect(emailInput).toBeVisible({ timeout: 10000 });
  await expect(passwordInput).toBeVisible({ timeout: 10000 });

  await emailInput.fill('vasyamail.ru');

  const submitButton = page.locator('[data-testid="login-submit-btn"]');
  await expect(submitButton).toBeVisible({ timeout: 5000 });
  await submitButton.click();

  const emailError = page.locator('span:has-text("Неверный email")');
  await expect(emailError).toBeVisible({ timeout: 5000 });

  const passwordError = page.locator('span:has-text("Обязательное поле")');
  await expect(passwordError).toBeVisible({ timeout: 5000 });

  await expect(page).not.toHaveURL(/profile/, { timeout: 5000 });

  await page.screenshot({
    path: 'screenshots/failed-auth-validation-errors.png',
    fullPage: true
  });

  console.log('Тест неуспешной авторизации пройден успешно, ошибки валидации отображены');
});


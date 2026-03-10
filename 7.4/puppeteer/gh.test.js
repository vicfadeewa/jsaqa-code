const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
});

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterAll(async () => {
  await browser.close();
});

describe("Github page tests", () => {
  test("The h1 header content", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', { timeout: 10000 });
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 15000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 5000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
      timeout: 8000
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free");
  }, 12000);
});

describe("Other Github pages headers tests", () => {
  test("Homepage header contains 'The future of building happens together'", async () => {
    await page.goto("https://github.com");
    await page.waitForSelector("#hero-section-brand-heading", { timeout: 10000 });
    const headerText = await page.$eval("#hero-section-brand-heading", el => el.textContent.trim());
    expect(headerText).toEqual("The future of building happens together");
  }, 15000);

  test("Pricing page header contains 'Try the Copilot-powered platform'", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1.h2-mktg", { timeout: 8000 });
    const headerText = await page.$eval("h1.h2-mktg", el => el.textContent.trim());
    expect(headerText).toEqual("Try the Copilot-powered platform");
  }, 10000);

  test("Copilot Features page header contains 'Command your craft'", async () => {
    await page.goto("https://github.com/features/copilot");
    await page.waitForSelector("#hero-section-brand-heading", { timeout: 8000 });
    const headerText = await page.$eval("#hero-section-brand-heading", el => el.textContent.trim());
    expect(headerText).toEqual("Command your craft");
  }, 10000);
});

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
  }, 5000);

afterEach(() => {
  page.close();
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

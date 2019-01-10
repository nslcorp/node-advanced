const puppeteer = require('puppeteer')

let browser;
let page;

beforeAll(async () => {

})

beforeEach(async () => {
  browser = await puppeteer.launch({headless: false})
  page = await browser.newPage();
  await page.goto('localhost:3000')
})

afterEach(async () => {
  await browser.close()
})

test('the header has correct text', async () => {
  const textLogo = await page.$eval('a.brand-logo', el => el.innerHTML)
  expect(textLogo).toEqual('Blogster')
})

test('start oAuth flow', async () => {
  await page.click('.right a')
})
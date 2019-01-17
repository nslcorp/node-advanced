const puppeteer = require('puppeteer')
const sessionFactory = require('./factories/sessionFactory')

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
  //await browser.close()
})

test('the header has correct text', async () => {
  const textLogo = await page.$eval('a.brand-logo', el => el.innerHTML)
  expect(textLogo).toEqual('Blogster')
})

test('click login button to start oAuth flow', async () => {
  await page.click('.right a')

  const url = page.url()
  expect(url).toMatch(/accounts\.google\.com/)
})

test('When sign in - shows logout button', async (req, res, next) => {
  const id = '5c349a3ea58e7028c3763649'


  const {session, sig} = sessionFactory()

  await page.setCookie({name: 'session', value: session})
  await page.setCookie({name: 'session.sig', value: sig})
  // await page.goto('localhost:3000')
  // await page.waitFor(3000)
  //
  // const text = await page.$eval('.logout', el => el.innerHTML)
  // expect(text).toEqual('Logout')
})

//370Rvq_1sYp-C991zDQkEiXd0wU
//eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWMzNDlhM2VhNThlNzAyOGMzNzYzNjQ5In19
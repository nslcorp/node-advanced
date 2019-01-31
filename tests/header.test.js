const Page = require('./helpers/Page')

let page;

beforeAll(async () => {
  page = await Page.build()
})

beforeEach(async () => {
  await page.goto('http://localhost:3000')
})

afterAll(async () => {
  await page.close()
})

test('the header has correct text', async () => {
  const textLogo = await page.getContent('a.brand-logo')
  expect(textLogo).toEqual('Blogster')
})

test('click login button to start oAuth flow', async () => {
  await page.click('.right a')

  const url = page.url()
  expect(url).toMatch(/accounts\.google\.com/)
})

test('When sign in - shows logout button', async () => {

  await page.login()
  await page.waitFor('.logout')
  const text = await page.getContent('.logout')
  expect(text).toEqual('Logout')
})

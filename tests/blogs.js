const Page = require('./helpers/Page')

let page;

beforeAll(async () => {
  page = await Page.build()
})

beforeEach(async () => {
  await page.goto('localhost:3000')
})

afterAll(async () => {
  await page.close()
})

test('the header has correct text', async () => {
  const textLogo = await page.getContent('a.brand-logo')
  expect(textLogo).toEqual('Blogster')
})
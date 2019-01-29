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

test('When loged in, can see blog creation form', async () => {
  await page.login()
  await page.goto('localhost:3000/blogs')
})
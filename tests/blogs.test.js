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



describe('When logged in', function () {
  beforeEach(async () => {
    await page.login()
    await page.click('a.btn-floating')
  })

  test('I can see blog creating form', async () => {
    const label = await page.getContent('form label')
    expect(label).toEqual('Blog Title')
  })

  describe('and using invalid inputs', async function () {
    beforeEach( )
    test('form shows an error message', () => {

    })
  });
  
});
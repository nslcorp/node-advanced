const Page = require('./helpers/Page');

let page;

beforeAll(async () => {
  page = await Page.build();
});

beforeEach(async () => {
  await page.goto('localhost:3000');
});

afterAll(async () => {
  await page.close();
});


describe('When logged in', function () {
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });

  test('I can see blog creating form', async () => {
    const label = await page.getContent('form label');
    expect(label).toEqual('Blog Title');
  });

  describe('and using invalid inputs', async function () {
    beforeEach(async () => {
      await page.click('form button[type=submit]');
    });
    test('form shows an error message', async () => {
      const tittle = await page.getContent('.title .red-text');
      const content = await page.getContent('.content .red-text');

      expect(tittle).toEqual('You must provide a value');
      expect(content).toEqual('You must provide a value');
    });
  });

  describe('using valid inputs', function () {
    const TEXT_TITLE = 'my tittle';
    const TEXT_CONTENT = 'my content';
    beforeEach(async () => {
      await page.type('.title input', TEXT_TITLE);
      await page.type('.content input', TEXT_CONTENT);
      await page.click('form button[type=submit]');
    });
    it('Submitting takes user to review screen', async () => {
      const text = await page.getContent('h5');
      expect(text).toEqual('Please confirm your entries');
    });

    it('Submittin, than adds blog to home page', async () => {
      await page.click('button.green');
      await page.waitFor('.card');

      const title = await page.getContent('.card-title');
      const content = await page.getContent('p');

      expect(title).toEqual(TEXT_TITLE);
      expect(content).toEqual(TEXT_CONTENT);


    });
  });

});
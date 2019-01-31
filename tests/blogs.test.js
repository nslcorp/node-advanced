const Page = require('./helpers/Page');

let page;

beforeAll(async () => {
  page = await Page.build();
});

beforeEach(async () => {
  await page.goto('http://localhost:3000');
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

const createBlogPost = () => fetch('/api/blogs', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({title: 'My Title1', content: 'My Content'})
}).then(res => res.json())

const getBlogPosts = () => fetch('/api/blogs', {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

describe('User is NOT login', function () {
  it('User can NOT create blog post', async () => {
    const result  = await page.evaluate(createBlogPost)
    expect(result).toEqual({error: 'You must log in!'})
  });

  it('User can NOT get list of blog posts', async () => {
    const result  = await page.evaluate(getBlogPosts)
    expect(result).toEqual({error: 'You must log in!'})
  });
});

const puppeteer = require('puppeteer')

const sessionFactory = require('../factories/sessionFactory')
const userFactory = require('../factories/userFactory')

class Page {
  static async build() {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage();

    const customPage = new Page(page)

    return new Proxy(customPage, {
      get: (target, prop) => {
        //use this methods || methods of page || methods of browser
        return customPage[prop] || browser[prop] ||  page[prop]
      }
    })

  }

  constructor(page) {
    this.page = page

  }

  async login(){
    const user = await userFactory()
    const {session, sig} = sessionFactory(user)

    await this.page.setCookie({name: 'session', value: session})
    await this.page.setCookie({name: 'session.sig', value: sig})
    await this.page.goto('localhost:3000/blogs')
  }

  async getContent(selector){
    return await this.page.$eval(selector, el => el.innerHTML)
  }




}

module.exports = Page
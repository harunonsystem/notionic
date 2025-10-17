import { describe, expect, it } from 'vitest'
import { lang } from './lang'

describe('lang configuration', () => {
  it('should have English language configured', () => {
    expect(lang.en).toBeDefined()
    expect(lang.en.NAV).toBeDefined()
    expect(lang.en.PAGINATION).toBeDefined()
    expect(lang.en.LAYOUT).toBeDefined()
    expect(lang.en.SEARCH).toBeDefined()
    expect(lang.en.HERO).toBeDefined()
    expect(lang.en.AVATAR).toBeDefined()
    expect(lang.en.CONTACT).toBeDefined()
    expect(lang.en.FOOTER).toBeDefined()
    expect(lang.en.ERROR).toBeDefined()
  })

  it('should have Japanese language configured', () => {
    expect(lang.ja).toBeDefined()
    expect(lang.ja.NAV).toBeDefined()
    expect(lang.ja.PAGINATION).toBeDefined()
    expect(lang.ja.LAYOUT).toBeDefined()
    expect(lang.ja.SEARCH).toBeDefined()
    expect(lang.ja.HERO).toBeDefined()
    expect(lang.ja.AVATAR).toBeDefined()
    expect(lang.ja.CONTACT).toBeDefined()
    expect(lang.ja.FOOTER).toBeDefined()
    expect(lang.ja.ERROR).toBeDefined()
  })

  it('should handle accessing undefined languages gracefully', () => {
    expect(lang.es).toBeUndefined()
  })

  it('should have English navigation items', () => {
    const { NAV } = lang.en
    expect(NAV.INDEX).toBe('Home')
    expect(NAV.SEARCH).toBe('Search')
    expect(NAV.ABOUT).toBe('About')
    expect(NAV.NOTES).toBe('Notes')
    expect(NAV.NEWSLETTER).toBe('News')
    expect(NAV.CONTACT).toBe('Contact')
  })

  it('should have Japanese navigation items', () => {
    const { NAV } = lang.ja
    expect(NAV.INDEX).toBe('家')
    expect(NAV.SEARCH).toBe('Search')
    expect(NAV.NOTES).toBe('Notes')
    expect(NAV.CONTACT).toBe('Contact')
  })

  it('should have English pagination items', () => {
    const { PAGINATION } = lang.en
    expect(PAGINATION.PREV).toBe('Prev')
    expect(PAGINATION.NEXT).toBe('Next')
  })

  it('should have English search items', () => {
    const { SEARCH } = lang.en
    expect(SEARCH.PLACEHOLDER).toBe('Search Posts')
    expect(SEARCH.NOT_FOUND).toBe('No Posts Found')
    expect(SEARCH.ONLY_SEARCH).toBe('Only search tags')
  })

  it('should have English contact configuration', () => {
    const { CONTACT } = lang.en
    expect(CONTACT.TITLE).toBe('Contact')
    expect(CONTACT.SEND_BUTTON).toBe('Send')
    expect(CONTACT.SUCCESS_MESSAGE).toContain('Message sent')
    expect(CONTACT.FAILED_MESSAGE).toContain('sending failed')
    expect(CONTACT.TWITTER_USERNAME).toBe('harunonsystem')
  })

  it('should have Japanese contact configuration', () => {
    const { CONTACT } = lang.ja
    expect(CONTACT.TITLE).toBe('Contact')
    expect(CONTACT.SEND_BUTTON).toBe('Send')
    expect(CONTACT.TWITTER_USERNAME).toBe('harunonsystem')
    expect(CONTACT.FORM_EMAIL).toBe('contact@harunonsystem.com')
  })

  it('should have English error messages', () => {
    const { ERROR } = lang.en
    expect(ERROR.TITLE).toBe('Page Not Found')
    expect(ERROR.LOADING).toBe('Loading....')
    expect(ERROR.BACK_TO_HOME).toBe('Back to Home')
  })

  it('should have hero home configuration in English', () => {
    const { HERO } = lang.en
    expect(HERO.HOME.CONTACT_BUTTON).toBe('Contact')
    expect(HERO.HOME.RSS_BUTTON).toBe('Subscribe')
    expect(HERO.NEWSLETTER.RSS_BUTTON).toBe('Subscribe')
  })

  it('should have hero notes configuration with different text for Japanese', () => {
    const enText = lang.en.HERO.NOTES.TEXT_FOOTER
    const jaText = lang.ja.HERO.NOTES.TEXT_FOOTER

    expect(enText).toBe('I would like to summarize something here...')
    expect(jaText).toBe('何かここにまとめておきたいと思ってます…')
    expect(enText).not.toBe(jaText)
  })

  it('should have consistent structure between languages', () => {
    const enSections = Object.keys(lang.en)
    const jaSections = Object.keys(lang.ja)

    // Japanese should have same structure as English
    expect(jaSections.sort()).toEqual(enSections.sort())
  })

  it('should have layout items in both languages', () => {
    const enLayout = lang.en.LAYOUT
    const jaLayout = lang.ja.LAYOUT

    expect(enLayout).toBeDefined()
    expect(jaLayout).toBeDefined()
    expect(enLayout.COPY_TITLE_AND_URL_BUTTON_TEXT).toBeDefined()
    expect(jaLayout.COPY_TITLE_AND_URL_BUTTON_TEXT).toBeDefined()
  })
})

interface LangType {
  [key: string]: {
    NAV: {
      INDEX: string
      SEARCH: string
      ABOUT: string
      FRIENDS: string
      PROJECTS: string
      NOTES: string
      NEWSLETTER: string
      BOOKS: string
      CONTACT: string
    }
    PAGINATION: {
      PREV: string
      NEXT: string
    }
    LAYOUT: {
      NOTICE_TEXT: string
      COPY_TITLE_AND_URL_BUTTON_TEXT: string
      COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED: string
      COPY_MARKDOWN_BUTTON_TEXT: string
      COPY_MARKDOWN_BUTTON_TEXT_COPIED: string
      SHARE_TWITTER_BUTTON_TEXT: string
      PAY_BUTTON: string
      NOTICE_BUTTON: string
      COMMENT_TITLE: string
      PAST_ONE_YEAR_COMMENT: string
    }
    SEARCH: {
      ONLY_SEARCH: string
      PLACEHOLDER: string
      NOT_FOUND: string
    }
    HERO: {
      HOME: {
        CONTACT_BUTTON: string
        CONTACT_BUTTON_DES: string
        RSS_BUTTON: string
      }
      NEWSLETTER: {
        SUBSCRIPTION_HEAD: string
        // TG_CHANNEL: string
        RSS_BUTTON: string
      }
      NOTES: {
        TEXT_FOOTER: string
      }
      RSS_BUTTON_DES: string
      RSS_BUTTON_COPIED: string
      RSS_BUTTON_DES_COPIED: string
    }
    AVATAR: {
      ICON_DESIGNED_DES: string
      ICON_DESIGNED_LINK: string
      ICON_DESIGNED_NAME: string
    }
    CONTACT: {
      TITLE: string
      DESCRIPTION: string
      TWITTER_DM_DESCRIPTION: string
      TWITTER_DM_LINK: string
      TWITTER_DM_USERID: string
      TWITTER_USERNAME: string
      SUCCESS_MESSAGE: string
      FORM_USERNAME: string
      FORM_EMAIL: string
      FORM_CONTENT: string
      SEND_BUTTON: string
      FORM_EMAIL_REQUIRED: string
      FAILED_MESSAGE: string
    }
    FOOTER: {
      COPYRIGHT_START: string
      COPYRIGHT_NAME: string
      COPYRIGHT_LINK: string
      COPYRIGHT_END: string
      ORIGIN_REPOSITORY_DESCRIPTION: string
      ORIGIN_REPOSITORY_LINK: string
    }
    ERROR: {
      MESSAGE: string
      TITLE: string
      HELP_TEXT: string
      BACK_TO_HOME: string
      CRAFTDOCS_ERROR: string
      LOADING: string
      TIMEOUT_TEXT: string
    }
  }
}

export const lang: LangType = {
  en: {
    NAV: {
      INDEX: 'Home',
      SEARCH: 'Search',
      ABOUT: 'About',
      FRIENDS: 'Friends',
      PROJECTS: 'Projects',
      NOTES: 'Notes',
      NEWSLETTER: 'News',
      BOOKS: 'Books',
      CONTACT: 'Contact'
    },
    PAGINATION: {
      PREV: 'Prev',
      NEXT: 'Next'
    },
    LAYOUT: {
      NOTICE_TEXT: 'If you have any questions, please contact me.',
      COPY_TITLE_AND_URL_BUTTON_TEXT: 'Copy Title and URL',
      COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED: 'Copied!',
      COPY_MARKDOWN_BUTTON_TEXT: 'Copy Content',
      COPY_MARKDOWN_BUTTON_TEXT_COPIED: 'Copied!',
      SHARE_TWITTER_BUTTON_TEXT: 'Share!',
      PAY_BUTTON: 'Sponsor',
      NOTICE_BUTTON: 'Contact',
      COMMENT_TITLE: 'Comments',
      PAST_ONE_YEAR_COMMENT:
        'This article was last updated over a year ago. The content may be outdated.'
    },
    SEARCH: {
      ONLY_SEARCH: 'Only search tags',
      PLACEHOLDER: 'Search Posts',
      NOT_FOUND: 'No Posts Found'
    },
    HERO: {
      HOME: {
        CONTACT_BUTTON: 'Contact',
        CONTACT_BUTTON_DES: 'One Click',
        RSS_BUTTON: 'Subscribe'
      },
      NEWSLETTER: {
        SUBSCRIPTION_HEAD: 'Subscription Channels',
        // TG_CHANNEL: 'Telegram Channel',
        RSS_BUTTON: 'Subscribe'
      },
      NOTES: {
        TEXT_FOOTER: 'I would like to summarize something here...'
      },
      RSS_BUTTON_DES: 'RSS Reader',
      RSS_BUTTON_COPIED: 'Copied',
      RSS_BUTTON_DES_COPIED: 'Copied RSS URL'
    },
    AVATAR: {
      ICON_DESIGNED_DES: 'Designed by',
      ICON_DESIGNED_LINK: 'https://misskey.io/@refinyaa',
      ICON_DESIGNED_NAME: '@refinyaa'
    },
    CONTACT: {
      TITLE: 'Contact',
      DESCRIPTION:
        'If you have any questions or suggestions, please contact me.',
      TWITTER_DM_DESCRIPTION: 'Or you can contact me via X(Twitter) DM: ',
      TWITTER_DM_LINK: 'https://x.com/messages/compose?recipient_id=',
      TWITTER_DM_USERID: '795973980721004546',
      TWITTER_USERNAME: 'harunonsystem',
      SUCCESS_MESSAGE: 'Message sent, I will reply to you as soon as possible.',
      FORM_USERNAME: 'Your Name',
      FORM_EMAIL: 'Your Email*',
      FORM_CONTENT: 'Message',
      SEND_BUTTON: 'Send',
      FORM_EMAIL_REQUIRED: '*You can fill in other valid contact methods',
      FAILED_MESSAGE:
        'Sorry, sending failed, please contact me directly on X(Twitter).'
    },
    FOOTER: {
      COPYRIGHT_START: 'This site is licensed under the ',
      COPYRIGHT_NAME: 'CC BY-SA 4.0',
      COPYRIGHT_LINK: 'https://creativecommons.org/licenses/by-sa/4.0/',
      COPYRIGHT_END: '.',
      ORIGIN_REPOSITORY_DESCRIPTION: 'This site is built with ',
      ORIGIN_REPOSITORY_LINK: 'https://github.com/izuolan/notionic'
    },
    ERROR: {
      MESSAGE: 'Some errors have occurred',
      TITLE: 'Page Not Found',
      HELP_TEXT:
        'Please try to refresh the page, or return to the home page and search, if you have any questions, contact me.',
      BACK_TO_HOME: 'Back to Home',
      CRAFTDOCS_ERROR:
        'If you see this line, it means your Craft.do configuration page format is wrong.',
      LOADING: 'Loading....',
      TIMEOUT_TEXT: 'Waiting too long? Click to visit the Notion page directly.'
    }
  },
  ja: {
    NAV: {
      INDEX: '家',
      SEARCH: 'Search',
      ABOUT: 'About',
      FRIENDS: 'Friends',
      PROJECTS: 'Projects',
      NOTES: 'Notes',
      NEWSLETTER: 'News',
      BOOKS: 'Books',
      CONTACT: 'Contact'
    },
    PAGINATION: {
      PREV: 'Prev',
      NEXT: 'Next'
    },
    LAYOUT: {
      NOTICE_TEXT: 'If you have any questions, please contact me.',
      COPY_TITLE_AND_URL_BUTTON_TEXT: 'タイトルと本文をコピー',
      COPY_TITLE_AND_URL_BUTTON_TEXT_COPIED: 'コピったかも!',
      COPY_MARKDOWN_BUTTON_TEXT: '本文をコピー',
      COPY_MARKDOWN_BUTTON_TEXT_COPIED: 'コピーしました!',
      SHARE_TWITTER_BUTTON_TEXT: 'share!',
      PAY_BUTTON: 'Coffee',
      NOTICE_BUTTON: 'Contact',
      COMMENT_TITLE: 'Comments',
      PAST_ONE_YEAR_COMMENT:
        'この記事は最終更新から1年以上経過しています。内容が古くなっている可能性があります。'
    },
    SEARCH: {
      ONLY_SEARCH: 'Only search tags',
      PLACEHOLDER: 'Search Posts',
      NOT_FOUND: 'No Posts Found'
    },
    HERO: {
      HOME: {
        CONTACT_BUTTON: 'Contact',
        CONTACT_BUTTON_DES: 'One Click',
        RSS_BUTTON: 'Subscribe'
      },
      NEWSLETTER: {
        SUBSCRIPTION_HEAD: 'Subscription Channels',
        // TG_CHANNEL: 'Telegram Channel',
        RSS_BUTTON: 'Subscribe'
      },
      NOTES: {
        TEXT_FOOTER: '何かここにまとめておきたいと思ってます…'
      },
      RSS_BUTTON_DES: 'RSS Reader',
      RSS_BUTTON_COPIED: 'Copied',
      RSS_BUTTON_DES_COPIED: 'Copied RSS URL'
    },
    AVATAR: {
      ICON_DESIGNED_DES: 'Designed by',
      ICON_DESIGNED_LINK: 'https://misskey.io/@refinyaa',
      ICON_DESIGNED_NAME: '@refinyaa'
    },
    CONTACT: {
      TITLE: 'Contact',
      DESCRIPTION:
        'If you have any questions or suggestions, please contact me.',
      TWITTER_DM_DESCRIPTION: 'Or you can contact me via X(Twitter) DM: ',
      TWITTER_DM_LINK: 'https://x.com/messages/compose?recipient_id=',
      TWITTER_DM_USERID: '795973980721004546',
      TWITTER_USERNAME: 'harunonsystem',
      SUCCESS_MESSAGE: 'Message sent, I will reply to you as soon as possible.',
      FORM_USERNAME: 'Your Name',
      FORM_EMAIL: 'contact@harunonsystem.com',
      FORM_CONTENT: 'Message',
      SEND_BUTTON: 'Send',
      FORM_EMAIL_REQUIRED: '*You can fill in other valid contact methods',
      FAILED_MESSAGE:
        'Sorry, sending failed, please contact me directly on X(Twitter).'
    },
    FOOTER: {
      COPYRIGHT_START: 'This site is licensed under the ',
      COPYRIGHT_NAME: 'CC BY-SA 4.0',
      COPYRIGHT_LINK: 'https://creativecommons.org/licenses/by-sa/4.0/',
      COPYRIGHT_END: '.',
      ORIGIN_REPOSITORY_DESCRIPTION: 'This site is built with ',
      ORIGIN_REPOSITORY_LINK: 'https://github.com/izuolan/notionic'
    },
    ERROR: {
      MESSAGE: 'Some errors have occurred',
      TITLE: 'Page Not Found',
      HELP_TEXT:
        'Please try to refresh the page, or return to the home page and search, if you have any questions, contact me.',
      BACK_TO_HOME: 'Back to Home',
      CRAFTDOCS_ERROR:
        'If you see this line, it means your Craft.do configuration page format is wrong.',
      LOADING: 'Loading....',
      TIMEOUT_TEXT: 'Waiting too long? Click to visit the Notion page directly.'
    }
  }
}

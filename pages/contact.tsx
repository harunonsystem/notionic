import { useRouter } from 'next/router'
import { BLOG } from '@/blog.config'
import ContactForm from '@/components/ContactForm'
import Container from '@/components/Container'
import { lang } from '@/lib/lang'

export const Contact = () => {
  const { locale } = useRouter()
  const t = lang[locale]
  return (
    <Container title={BLOG.title} description={BLOG.description}>
      <div className='mb-8 md:mb-16 text-gray-600 dark:text-gray-200'>
        <h2 className='text-xl lg:text-3xl font-light text-center mb-4'>
          {t.CONTACT.TITLE}
        </h2>
        <p className='max-w-screen-md font-light md:text-lg text-center mx-auto'>
          {t.CONTACT.DESCRIPTION}
        </p>
        <p className='max-w-screen-md font-light md:text-lg text-center mx-auto'>
          {t.CONTACT.TWITTER_DM_DESCRIPTION}
          <a
            href={`${t.CONTACT.TWITTER_DM_LINK}${t.CONTACT.TWITTER_DM_USERID}`}
            className='hover:text-indigo-500 active:text-indigo-600 underline transition duration-100'
          >
            @{t.CONTACT.TWITTER_USERNAME}
          </a>
        </p>
      </div>
      <ContactForm />
    </Container>
  )
}

export default Contact

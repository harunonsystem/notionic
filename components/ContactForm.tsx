import { Loader } from 'lucide-react'
import { useRouter } from 'next/router'
import { useId, useState } from 'react'
import { lang } from '@/lib/lang'

function Contact() {
  const nameId = useId()
  const emailId = useId()
  const messageId = useId()
  const [showResult, setShowResult] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { locale } = useRouter()
  const t = lang[locale]

  const sentMessage = async (event) => {
    event.preventDefault()
    setSubmitting(true)
    // setTimeout(() => {
    //   setSubmitting(false)
    //   setShowResult(true)
    // }, 3000)

    const tgUrl = '/api/sendtotg'
    const res = await fetch(tgUrl, {
      body: JSON.stringify({
        name: event.target.name.value,
        mail: event.target.mail.value,
        message: event.target.message.value
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    // await res.json()
    const result = await res.json()
    const status = result.status
    console.log('status:', status)
    if (status === 'Success') {
      setSubmitting(false)
      setShowResult(true)
    } else {
      alert(t.CONTACT.FAILED_MESSAGE)
    }
  }
  return (
    <>
      {showResult ? (
        <div>
          <p className='max-w-screen-md font-bold md:text-lg text-center mx-auto'>
            {t.CONTACT.SUCCESS_MESSAGE}
          </p>
        </div>
      ) : (
        <form
          className='max-w-screen-md grid sm:grid-cols-2 gap-4 mx-auto'
          onSubmit={sentMessage}
        >
          <div>
            <label htmlFor={nameId} className='sr-only'>
              {t.CONTACT.FORM_USERNAME}
            </label>
            <input
              name='name'
              id={nameId}
              type='text'
              required
              placeholder={t.CONTACT.FORM_USERNAME}
              className='block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600'
            />
          </div>
          <div>
            <label htmlFor={emailId} className='sr-only'>
              {t.CONTACT.FORM_EMAIL}
            </label>
            <input
              name='email'
              id={emailId}
              type='text'
              required
              placeholder={t.CONTACT.FORM_EMAIL}
              className='block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600'
            />
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor={messageId} className='sr-only'>
              {t.CONTACT.FORM_CONTENT}
            </label>
            <textarea
              name='message'
              id={messageId}
              required
              placeholder={t.CONTACT.FORM_CONTENT}
              className='h-64 block w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-600'
            ></textarea>
          </div>

          <div className='sm:col-span-2 flex justify-between items-center'>
            {submitting ? (
              <button
                type='button'
                disabled
                aria-label='Loading'
                className='cursor-not-allowed inline-block bg-gray-300 dark:bg-gray-600 text-center rounded-lg outline-none transition duration-100 px-8 py-3'
              >
                <Loader className='animate-spin h-5 w-5 text-gray-600 dark:text-day' />
              </button>
            ) : (
              <button
                type='submit'
                className='inline-block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-center rounded-lg outline-none transition duration-100 px-8 py-3'
              >
                <p className='text-gray-400 h-5'>{t.CONTACT.SEND_BUTTON}</p>
              </button>
            )}
            <p className='mb-2 text-gray-400 text-xs'>
              {t.CONTACT.FORM_EMAIL_REQUIRED}
            </p>
          </div>
        </form>
      )}
    </>
  )
}

export default Contact

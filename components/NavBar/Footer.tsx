import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BLOG } from '@/blog.config'
import { lang } from '@/lib/lang'
import Social from '../Common/Social'

interface FooterProps {
  fullWidth: boolean
}

const Footer = ({ fullWidth }: FooterProps) => {
  const router = useRouter()
  const { locale } = useRouter()
  const t = lang[locale || 'ja']

  let activeMenu = ''
  if (router.query.slug) {
    activeMenu = `/${router.query.slug}`
  } else {
    activeMenu = router.pathname
  }

  const d = new Date()
  const y = d.getFullYear()
  const from = +BLOG.since

  const links = [
    // {
    //   id: 0,
    //   name: t.NAV.ABOUT,
    //   to: BLOG.path || '/about',
    //   icon: <UserIcon className='inline-block mb-1 h-5 w-5' />,
    //   show: true
    // },
    // {
    //   id: 1,
    //   name: t.NAV.FRIENDS,
    //   to: '/friends',
    //   icon: <UsersIcon className='inline-block mb-1 h-5 w-5' />,
    //   show: BLOG.pagesShow.friends
    // },
    // {
    //   id: 2,
    //   name: t.NAV.BOOKS,
    //   to: '/books',
    //   icon: <BookOpenIcon className='inline-block mb-1 h-5 w-5' />,
    //   show: BLOG.pagesShow.books
    // },
    {
      id: 3,
      name: t.NAV.CONTACT,
      to: '/contact',
      icon: <Mail className='inline-block mb-1 h-5 w-5' />,
      show: BLOG.pagesShow.contact
    }
  ]

  // splice https://
  const repositoryName = t.FOOTER.ORIGIN_REPOSITORY_LINK.replace(
    /(^\w+:|^)\/\//,
    ''
  )

  return (
    <motion.div
      className={`mt-6 flex-shrink-0 m-auto w-full text-gray-600 dark:text-gray-300 transition-all ${
        !fullWidth ? 'max-w-3xl md:px-8' : 'px-4 md:px-24'
      }`}
    >
      <footer className='max-w-screen-2xl px-4 md:px-8 mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center border-b dark:border-gray-600 py-1'>
          <ul className='flex flex-wrap justify-center md:justify-start md:gap-1'>
            {links.map(
              (link) =>
                link.show && (
                  <Link passHref key={link.id} href={link.to} scroll={false}>
                    <li
                      key={link.id}
                      className={`${
                        activeMenu === link.to
                          ? 'bg-gray-200 dark:bg-gray-700'
                          : ''
                      } hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-lg block py-1 px-2 nav`}
                    >
                      <div className='font-light'>
                        {link.icon}
                        <span className='inline-block m-1'>{link.name}</span>
                      </div>
                    </li>
                  </Link>
                )
            )}
          </ul>
          <div className='hidden md:flex'>
            <Social />
          </div>
        </div>

        <div className='text-gray-400 text-xs font-light py-4'>
          © {from === y || !from ? y : `${from} - ${y}`} | {BLOG.author}
          <p className='md:float-right'>
            {t.FOOTER.COPYRIGHT_START}
            <a className='underline' href={`${t.FOOTER.COPYRIGHT_LINK}`}>
              {t.FOOTER.COPYRIGHT_NAME}
            </a>
            {t.FOOTER.COPYRIGHT_END}
          </p>
          <p className='md:flex block py-1'>
            {t.FOOTER.ORIGIN_REPOSITORY_DESCRIPTION}
            <a
              href={`${t.FOOTER.ORIGIN_REPOSITORY_LINK}`}
              className='underline pl-2'
            >
              {repositoryName}
            </a>
          </p>
        </div>
      </footer>
    </motion.div>
  )
}

export default Footer

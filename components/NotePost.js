import BLOG from '@/blog.config.js'
import Link from 'next/link'
import Image from "next/image";
import formatDate from "@/lib/formatDate";
import {motion} from "framer-motion";
import {useRouter} from "next/router";

const NotePost = ({ note }) => {
  const { locale } = useRouter()
  return (
      <motion.div>
        <Link passHref href={`${BLOG.path}/${note.slug}`} scroll={false}>
          <article
              key={note.id}
              className='group flex flex-col overflow-hidden relative mb-5 md:mb-8 cursor-pointer rounded-lg p-5'
          >
            <Image
                className='w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200'
                src={note?.page_cover}
                alt={`${note.title}`}
                layout='fill'
            />
            <div className='hidden md:block md-cover absolute inset-0'></div>
            <div className='md:hidden sm-cover absolute inset-0'></div>
            <div className='relative mt-auto'>
              <header className='flex flex-col justify-between md:flex-row md:items-baseline'>
                <h2 className='text-lg md:text-xl font-medium mb-2 text-black dark:text-gray-100 blog-post-link'>{note.title}</h2>
                <span className='text-color-fix font-light flex-shrink-0 text-gray-600 dark:text-gray-400'>
                {formatDate(note?.date?.start_date || note.createdTime, locale)}
              </span>
              </header>
              <p className='font-light hidden md:block leading-8 text-gray-700 dark:text-gray-300'>{note.summary}</p>
              {/* w-4/5  */}
            </div>
          </article>
        </Link>
      </motion.div>
  )
}

export default NotePost

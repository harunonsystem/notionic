import { useRouter } from 'next/router'
import type { ExtendedRecordMap } from 'notion-types'
import NotionRenderer from '@/components/Post/NotionRenderer'
import { lang } from '@/lib/lang'
import Social from '../Common/Social'
import Avatar from './Avatar'

interface NoteHeroProps {
  blockMap: ExtendedRecordMap | null
}

const NoteHero = ({ blockMap }: NoteHeroProps) => {
  const { locale } = useRouter()
  const t = lang[locale || 'ja']
  return (
    <div className='container mx-auto flex px-5 py-2 mb-10 md:flex-row flex-col items-center'>
      <div className='flex flex-col md:w-3/5 md:items-start mb-6 md:mb-0 text-left'>
        {blockMap && (
          <NotionRenderer
            className='md:ml-0'
            blockMap={blockMap}
            frontMatter={{}}
            subPageTitle={null}
          />
        )}
        <Social />
        <div className='text-gray-400 text-xs font-light py-4'>
          {t.HERO.NOTES.TEXT_FOOTER}
        </div>
      </div>
      <div className='w-2/5'>
        <Avatar className='text-gray-600 dark:text-gray-300' />
      </div>
    </div>
  )
}

export default NoteHero

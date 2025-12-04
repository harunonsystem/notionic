import Image from 'next/image'
import { useRouter } from 'next/router'
import { lang } from '@/lib/lang'
import ProfileFile from '@/public/harunon_refia_crop.png'

const Avatar = ({ className }: { className: string }) => {
  const { locale } = useRouter()
  const t = lang[locale || 'ja']
  return (
    <div className={className}>
      <Image
        src={ProfileFile}
        alt='Harunon Icon Designed By Refia'
        className='rounded-full'
      />
      <div className='flex flex-wrap justify-center mt-2'>
        <p className='text-sm text-gray-500'>{t.AVATAR.ICON_DESIGNED_DES}</p>
        <a href={t.AVATAR.ICON_DESIGNED_LINK} target='_blank' rel='noreferrer'>
          <p className='text-sm underline text-gray-500 pl-2'>
            {t.AVATAR.ICON_DESIGNED_NAME}
          </p>
        </a>
      </div>
    </div>
  )
}

export default Avatar

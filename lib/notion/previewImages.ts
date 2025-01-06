import { BLOG } from '@/blog.config'
import got from 'got'
import lqip from '../lqip'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import { defaultMapImageUrl, getPageImageUrls } from 'notion-utils'
import { ExtendedRecordMap, RecordMap } from 'notion-types'

// NOTE: this is just an example of how to pre-compute preview images.
// Depending on how many images you're working with, this can potentially be
// very expensive to recompute, so in production we recommend that you cache
// the preview image results in a key-value database of your choosing.
// If you're not sure where to start, check out https://github.com/jaredwray/keyv

export async function getPreviewImageMap(recordMap: RecordMap) {
  const urls = getPageImageUrls(<ExtendedRecordMap>recordMap, {
    mapImageUrl: defaultMapImageUrl
  }).filter(
    (url) =>
      url &&
      !url.includes('.svg') &&
      !url.includes(`${BLOG.ogImageGenerateHost}`)
  ) // not include svg

  return Object.fromEntries(
    await pMap(urls, async (url) => [url, await getPreviewImage(url)], {
      concurrency: 8
    })
  )
}

async function createPreviewImage(url) {
  try {
    const { body } = await got(url, { responseType: 'buffer' })
    const result = (await lqip(body)) as {
      metadata: {
        originalWidth: number
        originalHeight: number
        dataURIBase64: string
      }
    }
    // console.log('lqip', { originalUrl: url, ...result.metadata })

    return {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64
    }
  } catch (err) {
    if (err.message === 'Input buffer contains unsupported image format') {
      return null
    }

    console.warn('failed to create preview image', url, err.message)
    return null
  }
}

export const getPreviewImage = pMemoize(createPreviewImage)

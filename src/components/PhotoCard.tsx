import Image from 'next/image'
import type { Photo } from '@/lib/photo'

export default function PhotoCard({ photo }: { photo: Photo }) {
  return (
    <>
      <Image
        alt=''
        src={photo.imageSrc}
        height={600}
        width={600}
        className='col-span-1 aspect-square w-full object-cover'
      />

      <div className=' bg-white p-2 px-4'>
        <h3 className='font-serif text-xl font-medium'>{photo.name}</h3>
        <p className='text-sm text-gray-500'>Taken by {photo.username}</p>
      </div>
    </>
  )
}
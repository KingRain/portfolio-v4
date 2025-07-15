import Image from 'next/image'

const Avatar = () => {
  return (
    <a href='https://x.com/httperr0r_' target='_blank'>
      <Image
      src='/ProfilePicture.jpg'
      alt='Discord Avatar'
      width={100}
      height={100}
      className='rounded-full border-2 border-white'
      />
    </a>
  )
}

export default Avatar

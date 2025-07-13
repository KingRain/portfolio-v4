import Image from 'next/image'

const Avatar = () => {
  return (
    <a href='https://x.com/httperr0r_' target='_blank'>
      <Image
        src='/DiscordAvatar.png'
        alt='Discord Avatar'
        width={80}
        height={80}
        className='rounded-full'
      />
    </a>
  )
}

export default Avatar

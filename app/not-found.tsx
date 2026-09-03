import Image from 'next/image'
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className='h-screen w-screen absolute flex justify-center items-center'>
      <Image src={'/assets/images/not-found.png'} alt='Pagina no encontrada fondo' fill sizes='100vw' />
      <div className='flex flex-col justify-between items-center min-h-[70vh] mt-32'>
        <div className='flex flex-col gap-2 text-center'>
          <h1 className='text-3xl font-semibold'>Esta página no se encuentra disponible</h1>
          <p className='font-jakarta text-md text-center relative z-10'>Disculpá las molestias ocasionadas. </p>
        </div>
        <Link
          href={'/'}
          className='cursor-pointer uppercase group relative tracking-[2px] w-fit text-xs text-white bg-title-color font-light rounded-4xl overflow-hidden 
                py-2 px-6 before:w-full before:h-full hover:before:translate-y-0 before:duration-500 before:ease-out before:absolute before:bg-[#f5f5f53a] before:left-0 before:top-0 before:rounded-4xl before:translate-y-full'>

          <p className='relative z-10 '>volver al inicio</p>
        </Link>
      </div>
    </div>
  )
}

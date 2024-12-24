import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='h-screen w-screen bg-gray-900 flex justify-center items-center'>
            <SignUp forceRedirectUrl="/dashboard/create"/>
    </div>
  )
}
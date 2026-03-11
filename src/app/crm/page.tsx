import Image from 'next/image';
import Link from 'next/link';
import CrmHeader from '@/src/app/CrmHeader';


export default async function Crm() {
	return (
		<>
			<CrmHeader>
				<div className='w-full h-full max-w-[1600px] ml-10 mr-auto flex justify-between items-center'>
					<Link href='/' className='flex items-center gap-2'>
						<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
					</Link>
				</div>
			</CrmHeader>
			<div className='mt-30'>Home</div>
		</>
	)
}

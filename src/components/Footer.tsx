import Image from 'next/image';
import Link from 'next/link';
import { Gelasio } from 'next/font/google';
import { getTranslations } from 'next-intl/server';

const gelasio = Gelasio({
	weight: ['400', '500', '600', '700'],
});

export default async function Footer() {
	const t = await getTranslations("footer")
    return (
		<footer className='py-10 border-t border-zinc-300 dark:border-zinc-700 text-[16px] text-zinc-800 dark:text-zinc-300'>
			<div className='max-w-6xl w-full mx-auto px-5'>
				<div className='grid grid-cols-[28%_18%_18%_18%_18%] mb-10'>
					<div>
						<div className='flex items-center gap-2'>
							<Image src={'/images/bloom-icon.svg'} height={40} width={40} alt='bloom icon' />
							<div
								className={`${gelasio.className} text-[26px] text-4xl font-medium text-center text-black dark:text-white`}
							>
								Bloom CRM
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-2'>
						<Link href='/'>{t("Home")}</Link>
						<Link href='/'>{t("Crm")}</Link>
						<Link href='/'>{t("Registration")}</Link>
						<Link href='/'>{t("Companies")}</Link>
						<Link href='/'>{t("Solo")}</Link>
					</div>
					<div className='flex flex-col gap-2'>
						<Link href='/'>{t("Home")}</Link>
						<Link href='/'>{t("Crm")}</Link>
						<Link href='/'>{t("Registration")}</Link>
						<Link href='/'>{t("Companies")}</Link>
						<Link href='/'>{t("Solo")}</Link>
					</div>
					<div className='flex flex-col gap-2'>
						<Link href='/'>{t("Home")}</Link>
						<Link href='/'>{t("Crm")}</Link>
						<Link href='/'>{t("Registration")}</Link>
						<Link href='/'>{t("Companies")}</Link>
						<Link href='/'>{t("Solo")}</Link>
					</div>
					<div>
						<div>{t("Subscribe")}</div>
						<form action=''>
							<input className="border rounded" type='text' />
						</form>
					</div>
				</div>
				<div>©Bloom, Inc.</div>
			</div>
		</footer>
    )
}
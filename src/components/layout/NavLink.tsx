
'use client'
 
import Link from 'next/link';
import { usePathname } from 'next/navigation'

interface NavLinkProps{
    href:string;
    children: React.ReactNode;
    className?: string;
    onClick?:()=> void;

}

const NavLink =({href, children, className, onClick}:NavLinkProps)=>{

  const pathname = usePathname()

  const isActive = href == pathname;

  return(
    <Link href={href} className={`${isActive ? "text-[#4f46e5]":"text-white"} font-medium transition-colors cursor-pointer`} onClick={onClick}>{children}</Link>
  )
 

}
export default NavLink
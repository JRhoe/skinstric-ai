import Link from 'next/link';
import React from 'react';

const Nav = () => {
    return (
        <div className='h-[64px] flex items-center px-[32px]'>
            <Link href={"/"} className='font-roobertSemiBold text-[14px] uppercase text-main-black'>Skinstric</Link>
        </div>
    );
}

export default Nav;

import Link from 'next/link';
import React from 'react'

export default function Home() {


  return (
    <>
    <Link href="/introduction">Introduction</Link>
    <br/>
    <Link href="/analysis">Analysis</Link>
    </>
  );
}

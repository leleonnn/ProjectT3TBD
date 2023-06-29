"use client"
import Nav from '../app/components/navigation';
import Image from 'next/image';
import image from './grb.png';

const Home = () => {
  return (
  <div>
    <Nav/>
    <div className="flex flex-col justify-center items-center h-screen space-y-10">
        <Image src={image} alt="grb" className="h-1/3 w-auto" />
      <h1 className="text-6xl font-bold">GOOD READING BOOKSTORE</h1>
    </div>
  </div>
)};

export default Home;
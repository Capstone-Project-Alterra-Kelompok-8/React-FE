import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full h-20 bg-white flex justify-between items-center px-6 md:px-12">
      <div>
        <a href=""><img className="w-32 h-auto lg:w-64 lg:h-14" src={logo} alt="Logo" /></a>
      </div>
      <div className="hidden md:flex justify-center items-center gap-16">
        <a className="text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#home'>Home</a>
        <a className="text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#benefit'>Benefit</a>
        <a className="text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#features'>Features</a>
        <a className="text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#testimoni'>Testimoni</a>
      </div>
      <div className="hidden md:flex">
        <button className="p-2.5 bg-main-color rounded-full flex justify-center items-center">
          <div className="text-zinc-900 text-xl font-normal font-montserrat leading-tight">Get The Apps</div>
        </button>
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          {isOpen ? <FaTimes className="text-zinc-900 text-2xl" /> : <FaBars className="text-zinc-900 text-2xl" />}
        </button>
      </div>
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white flex flex-col items-center py-4 z-50">
          <a className="py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#'>Home</a>
          <a className="py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#benefit'>Benefit</a>
          <a className="py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#features'>Features</a>
          <a className="py-2 text-zinc-900 text-xl font-normal font-montserrat leading-tight hover:text-main-darker" href='#testimoni'>Testimoni</a>
          <button className="mt-4 p-2.5 bg-main-color rounded-full flex justify-center items-center">
            <div className="text-zinc-900 text-xl font-normal font-montserrat leading-tight">Get The Apps</div>
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar;

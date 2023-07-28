import React from 'react';
// import Logo from '../../public/images/logo2.png'
// import Image from 'next/image'

export default function Header() {
  return (
    <div className="body">
      <nav>
      <div className="logo">
        {/* <a href='/'><Image src={Logo} alt="Picture of the author"/></a> */}
        logo
        </div>
        <ul>
          <li><a href="/login">LOGIN</a></li>
          <li><a href="/register">SIGNUP</a></li>
          <li><a href="/about">ABOUT</a></li>
          <li><a href="/services">SERVICES</a></li>
          <li><a href="/contact">CONTACT</a></li>
          <li><a href="/feedback">FEEDBACK</a></li>
        </ul>
      </nav>
    </div>
  );
}
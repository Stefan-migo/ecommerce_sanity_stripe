import React from 'react';
import { AiFillInstagram, AiOutlineGithub, AiOutlineLinkedin} from 'react-icons/ai';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2022 E-commerce created by Stefan Miranda</p>
      <p className="icons">
        <Link href='https://www.instagram.com/leberland/' target="_blank">
          <a><AiFillInstagram /></a>
        </Link>
        <Link href='https://github.com/Stefan-migo' target="_blank">
          <a><AiOutlineGithub /></a>
        </Link>
        <Link href='https://www.linkedin.com/in/stefan-miranda-gonzalez-787387118/' target="_blank">
          <a><AiOutlineLinkedin /></a>
        </Link>
      </p>
    </div>
  )
}


export default Footer
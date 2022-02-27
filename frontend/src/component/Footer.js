import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './component_css/Footer.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

function Footer() {
  return (
    <footer className='site-footer bg-dark pt-5' style={{ marginTop: '20vh' }}>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6'>
            <h6>About</h6>
            <p className='text-justify'>
              My name is <span className='text-info'>Aswin K Ashok</span> and
              this is
              <span className='text-danger'> LapStore </span> an eccommece
              website I made to learn the fundamentals of MERN stack develpment.
              I made this site only for self learning and development porposes.
              It took 6 weeks for the development and hosting of this
              application . If you are reading this dont hesitate to contact me
              on linkedin, instagram , any other social platform .
            </p>
          </div>
          <div className='col-xs-6 col-md-3'>
            <h6>Technology used</h6>
            <ul className='footer-links'>
              <li>
                <a href='https://www.mongodb.com/'>mongo db</a>
              </li>
              <li>
                <a href='https://expressjs.com/'>express js</a>
              </li>
              <li>
                <a href='https://reactjs.org/'>react js</a>
              </li>
              <li>
                <a href='https://nodejs.org/en/about/'>node js</a>
              </li>
            </ul>
          </div>
          <div className='col-xs-6 col-md-3'>
            <h6>Quick Links</h6>
            <ul className='footer-links'>
              <li>
                <a href='http://aswinkashok.pythonanywhere.com/'>About Me</a>
              </li>
              <li>
                <a href='https://brototype.in/'>About Us</a>
              </li>
              {/* <li>
                <a href='http://scanfcode.com/contribute-at-scanfcode/'>
                  Contribute
                </a>
              </li>
              <li>
                <a href='http://scanfcode.com/privacy-policy/'>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href='http://scanfcode.com/sitemap/'>Sitemap</a>
              </li> */}
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 col-sm-6 col-xs-12'>
            <p className='copyright-text'>
              Copyright © Aswin K Ashok
              <a href='https://aswin-k-ashok.github.io/meTemplate/'>
                {' '}
                Web-site
              </a>
              .
            </p>
          </div>
          <div className='col-md-4 col-sm-6 col-xs-12'>
            <ul className='social-icons'>
              <li>
                <a
                  className='linkedin'
                  href='https://www.linkedin.com/in/aswin-k-ashok-99034b1b7/'
                >
                  <i className='bi bi-linkedin' />
                </a>
              </li>
              <li>
                <a
                  className='facebook'
                  href='https://www.facebook.com/aswinblock'
                >
                  <i className='bi bi-facebook'></i>{' '}
                </a>
              </li>
              <li>
                <a
                  className='instagram'
                  href='https://www.instagram.com/loner.____/'
                >
                  <i className='bi bi-instagram' />
                </a>
              </li>
              <li>
                <a className='gitHub' href='https://github.com/Aswin-k-ashok'>
                  <i className='bi bi-github' />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

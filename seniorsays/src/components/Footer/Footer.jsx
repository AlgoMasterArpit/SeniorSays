import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../index'
import Logo from '../Logo' 
function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-slate-900 border-t border-t-slate-800">
      <Container>
        <div className="flex flex-wrap align-center justify-between">
          
          {/* Column 1: Brand & Copyright */}
        
          <div className="w-full md:w-1/2 lg:w-5/12 p-6">
            <div className="flex flex-col justify-between h-full">
              <div className="mb-4 inline-flex items-center">
                
                {/* 2. REPLACED TEXT WITH LOGO COMPONENT HERE */}
                <Logo />
                
              </div>
              <div>
                <p className="text-sm text-white-400">
                  &copy; Copyright 2025. All Rights Reserved by SeniorSays.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Support Links */}
          <div className="w-full md:w-1/2 lg:w-2/12 p-6">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-white-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white-300 hover:text-teal-400"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white-300 hover:text-teal-400"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white-300 hover:text-teal-400"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Legal Links */}
          <div className="w-full md:w-1/2 lg:w-3/12 p-6">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-whitw-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white-300 hover:text-teal-400"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-white-300 hover:text-teal-400"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-white-300 hover:text-teal-400"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Footer
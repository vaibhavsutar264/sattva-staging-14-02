import Link from 'next/link'
import React from 'react'
export const HeaderNew = () => {
return (
<header className="home-header bgwhite">
   <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <div classNameName="">
            <div className="logo-image">
               <Link  href="/"> <a className="lg-w"><img src={'../images/logo-sattva-white.png'} alt='' /></a> </Link>
               <Link href="/"> <a className="lg-c" > <img src={'../images/logo-sattva-white.png'} alt='' /> </a></Link>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div className="navbar-nav">
                  <Link href="about.html">
                    <a className="nav-item nav-link active" >
                        About Us <span className="sr-only">(current)</span>
                    </a>
                  </Link> <Link  href="#"> <a className="nav-item nav-link"> Login </a></Link>
                  <Link  href="#"> <a className="nav-item nav-link tabs"> Free Trial </a></Link>
               </div>
            </div>
         </div>
      </nav>
   </div>
</header>
)
}

import React from 'react'
import '../App.css'

const Home = () => {
  return (
    <>
     <section className="section__height" id="home">
        <div className="bgbox">
          <div className="card__container">
            <div className="home_content">
              <h1 className="main_header"><span className="stroke">TASK</span>IFY</h1>
              <p>End-to-End Encrypted</p>
              <p className="small_header">An Encrypted Task App</p>
            </div>
          </div>
         
        </div>
      </section>

      <div className="marquee">
        <h3>
          <div className="marqueee-wrapper">
            <div className="marque-title">
              / We store your <span className="text-stroke-black">Task's</span>
              in *Encryption*
              <span className="text-stroke-black">!@#$-%^&*</span>
            </div>

            <div className="marque-title">
              / We store your <span className="text-stroke-black">Task's</span>
              in *Encryption*
              <span className="text-stroke-black">!@#$-%^&*</span>
            </div>
          </div>
        </h3>
      </div>
    </>
  )
}

export default Home
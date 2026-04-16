import React from 'react'

const Introduction = () => {
  return (
    <section className='intro-box'>
        <div className='main-intro-box'>
            <div className='intro-header'>
                <p className='intro-p'>
                    Compare & Choose 
                    <img src='/OBJECTS.svg' alt='logo' className='tag-logo' />
                </p>
                <h1>How It Works</h1>
                <p className='intro-sub-text'>We’ve made the process simple, fast, and fully transparent—from start to finish.</p>
            </div>

            <div className='proc-desc'>
                <div className='stage-desc'>
                    <div className='desc-logo'>
                        <div className='desc-logo-img1'>
                            <img src='/home-pin-1.png' alt='Enter Address' />
                         </div>
                        <div className='desc-logo-img2'>1</div>
                    </div>
                    <h4>Enter Your Address</h4>
                    <p>Instantly measure your roof using satellite tech—no site visit required.</p>
                </div>

                <div className='arrow-container'>
                    <img src='/right-arrow.svg' alt='next' className='flow-arrow' />
                </div>

                <div className='stage-desc'>
                    <div className='desc-logo'>
                        <div className='desc-logo-img1'>
                            <img src='/reports.png' alt='Get Quotes' />
                         </div>
                        <div className='desc-logo-img2'>2</div>
                    </div>
                    <h4>Get Competitive Quotes</h4>
                    <p>Receive clear, competitive quotes from licensed, trusted professionals.</p>
                </div>

                <div className='arrow-container'>
                    <img src='/right-arrow.svg' alt='next' className='flow-arrow' />
                </div>

                <div className='stage-desc'>
                    <div className='desc-logo'>
                        <div className='desc-logo-img1'>
                            <img src='/roofers.png' alt='Choose Roofer' />
                         </div>
                        <div className='desc-logo-img2'>3</div>
                    </div>
                    <h4>Choose Your Roofer</h4>
                    <p>Compare and pick your roofer—then schedule the project with confidence.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Introduction
import React from 'react'
import { createRoot } from 'react-dom/client'
import '../css/Destination.css'

function Destination() {
  return (
    <section>
        <div className="title">
            <h1 className='heading-5 title'>
                <span className='title-num'>01</span> Pick your destination
            </h1>
        </div>
    </section>
  )
}

const root = createRoot(
	document.getElementById("root"),
);

root.render(<Destination/>)

export default Destination

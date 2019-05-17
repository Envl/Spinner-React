import React from 'react'

import DropDown from './DropDown'
import Items from './Items'

const Sidebar = props => (
  <div className="sidebar">
    {[
      {title: 'timeline'},
      {title: 'items', children: ['bought', 'on-shelf', 'sold']},
      {title: 'profile'},
      {title: 'settings'}
    ].map(li => (
      <DropDown
        title={li.title}
        noPop={true}
        isOpen
        // onClick={evt => {
        //   switch (evt.target.innerHTML) {
        //     case 'bought':
        //       // show bought
        //       break
        //     case 'on-shelf':
        //       // on sale
        //       break
        //     case 'sold':
        //       // sold
        //       break
        //   }
        // }}
      >
        {li.children &&
          li.children.map(child => (
            <button
              onClick={() => {
                console.log('clicked', child)
              }}>
              {child}
            </button>
          ))}
      </DropDown>
    ))}
  </div>
)

const Homepage = props => {
  return (
    <div className="homepage-container">
      <Sidebar />
      <div className="content-panel">
        <Items />
      </div>
    </div>
  )
}

export default Homepage

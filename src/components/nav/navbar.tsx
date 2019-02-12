import React from 'react'

function Navbar (props: any) {

  function openSignInModal() {
    console.log('modal')
  }

  return (
    <div data-testid='navbar'>
      <ul>
        <li>Home</li>
        <li onClick={openSignInModal}>Login</li>
      </ul>
    </div>
  )
}

export default Navbar
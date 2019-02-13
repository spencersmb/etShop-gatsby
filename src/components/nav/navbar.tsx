import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {showModal} from '@redux/actions/modalActions'
import Login from '../modals/login'

function Navbar (props: any) {

  function openSignInModal (name: string) {
    return () => [
      props.showModal({
        modal: Login,
        options: {
          closeOutsideModal: true,
          content: 'my Content',
          hasBackground: true,
          name
        }
      })
    ]
  }

  return (
    <div data-testid='navbar'>
      <ul>
        <li>Home</li>
        <li onClick={openSignInModal('signin')}>Sign In</li>
        <li onClick={openSignInModal('signup')}>Sign Up</li>
      </ul>
    </div>
  )
}

// export default Navbar
export default connect(
  null,
  dispatch => bindActionCreators({showModal}, dispatch)
)(Navbar)
export {Navbar}
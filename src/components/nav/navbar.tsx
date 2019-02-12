import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {showModal} from '@redux/actions/modalActions'
import Login from '../modals/login'

function Navbar (props: any) {

  function openSignInModal() {
    props.showModal({
      // modal: LoginModal(name),
      modal: Login,
      options: {
        closeOutsideModal: true,
        content: 'my Content',
        hasBackground: true,
      }
    })
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

// export default Navbar
export default connect(
  null,
  dispatch => bindActionCreators({showModal}, dispatch)
)(Navbar)
export {Navbar}
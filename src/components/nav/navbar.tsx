import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { ILogoutAction, logout } from '@redux/actions/authActions'
import React from 'react'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import { bindActionCreators } from 'redux'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import Login from '../modals/login'

interface IProps {
  user: IUserState,
  showModal: IShowModalAction,
  logout: ILogoutAction
}
function Navbar (props: IProps) {
  const {user, logout} = props
  console.log('user', user)
  
  function openModal () {
    toastr.success(`Welcome `, 'you\'ve successfully logged');
  }

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
        {!user &&
          <>
          <li onClick={openSignInModal('signin')}>Sign In</li>
          <li onClick={openSignInModal('signup')}>Sign Up</li>
          </>
        }
        {user &&
          <li onClick={logout}>Sign Out</li>
        }
        <li onClick={openModal}>Toaster</li>
      </ul>
    </div>
  )
}

const mapStateToProps = (state: IState) => {
  return{
    user: state.user
  }
}

// export default Navbar
export default connect(
  mapStateToProps,
  dispatch => bindActionCreators({showModal, logout}, dispatch)
)(Navbar)
export {Navbar}
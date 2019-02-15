import PoseHoc from '@components/animations/poseHoc'
import { IPoseHoc } from '@components/animations/poseHoc'
import SignInForm from '@components/modals/login'
import React from 'react'
import { Link } from 'gatsby'
import posed from 'react-pose'
import WithDevTools from '../components/devToolExt'

import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'
import FieldLevelValidationForm from '../formTest'

const IndexPage = () => (
  <Layout>
    <SEO title='home' keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to='/page-2/'>Go to page 2</Link>
    <WithDevTools/>

  </Layout>
)

export default IndexPage
const SignInPose = posed(PoseHoc)({
  enter: {
    // delay: ((props: any) => props.firstRender ? 0 : 150),
    duration: ((props: any) => props.firstRender ? 0 : 50),
    opacity: 1,
    y: `0px`
  },
  exit: {
    opacity: 0,
    y: `-25px`
  }
})
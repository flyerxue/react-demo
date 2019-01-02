import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import SubBanner from './subpage/banner'
import List from './subpage/list'

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <HomeHeader cityName={this.props.userinfo.cityName}/>
        <Category/>
        <SubBanner/>
        <List cityName = {this.props.userinfo.cityName} />
      </div>
    )
  }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  console.log(state.userinfo);
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home))

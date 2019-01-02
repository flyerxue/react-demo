import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import Header from '../../components/Header'
import CurrentCity from '../../components/Header'
import { bindActionCreators } from "redux";
import * as userInfoActionsFromOtherFile from "../../actions/userinfo";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title='选择城市' />
                <CurrentCity cityName={this.props.userinfo.cityName} />
            </div>
        )
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(City))

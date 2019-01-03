import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Link } from 'react-router-dom'

import { customHistory } from '../../router/AppRouter'

import SearchInput from '../Searchinput/index'


import './style.less'

class SearchHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    console.log('------>',this.props.keyword);
    return (
      <div id="search-header" className="clear-fix">
        <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
            <i className="icon-chevron-left"/>
        </span>
        <div className="input-container">
          <i className="icon-search"/>
          <SearchInput value={this.props.keyword || ''} enterHandle={this.enterHandle.bind(this)}/>
        </div>
      </div>
    )
  }
  clickHandle() {
    window.history.back()
  }
  enterHandle(value) {
    customHistory.push('/search/all/' + encodeURIComponent(value))
  }
}

export default SearchHeader

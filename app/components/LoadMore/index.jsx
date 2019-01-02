import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class HomeHeader extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className='load-more' ref='wrapper'>
        {
          this.props.isLoadingMore
          ? <span>加载中...</span>
          : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
        }
      </div>
    )
  }

  loadMoreHandle() {
    this.props.loadMoreFn()
  }

  componentDidMount() {
    const loadMoreFn = this.props.loadMoreFn
    const wrapper = this.refs.wrapper
    let timeoutId
    function callback () {
      const top = wrapper.getBoundingClientRect().top
      const windowHeight = window.screen.height
      if(top && top < windowHeight) {
      //  当wrapper 已经被滚动到暴露在页面的可视范围之内的时候
        loadMoreFn()
      }
    }
    window.addEventListener('scroll', () => {
      if(this.props.isLoadingMore) {
        return
      }
      if(timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(callback, 50)
    }, false)
  }
}

export default HomeHeader

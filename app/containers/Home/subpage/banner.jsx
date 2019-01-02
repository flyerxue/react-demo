import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getBannerData } from '../../../fetch/home/home.js'
import HomeBanner from '../../../components/HomeBanner/index'

class SubBanner extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      isLoading: false,
      data: []
    }
  }

  render() {
    return (
      <div>
        {
          this.state.isLoading ? <HomeBanner data={this.state.data}></HomeBanner> : '正在加载中...'
        }
      </div>
    )
  }

  componentDidMount() {
    const result = getBannerData()
    result.then((res) => {
      return res.json()
    }).then((json) => {
      const data = json
      if(data.length) {
        this.setState({
          isLoading: true,
          data: data
        })

      }
    })
  }
}

export default SubBanner

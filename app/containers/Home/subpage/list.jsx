import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import { getListData } from '../../../fetch/home/home.js'
import ListComponent from '../../../components/List/index'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
      data: [],
      hasMore: false,
      isLoadingMore: false,
      page: 1
    }
  }
  render() {
    return (
      <div>
        <h2 className='home-list-title'>猜你喜欢</h2>

        <div>
          {
           this.state.data.length ? <ListComponent data={this.state.data} /> : <div>加载中...</div>
          }

          {
            this.state.hasMore
              ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
              : ''
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    //  获取首页数据
    this.loadFirstPageData()

  }
  // 获取首屏数据
  loadFirstPageData() {
    const cityName = this.props.cityName
    const result = getListData(cityName, 0)
    this.resultHandler(result)
  }

  //加载更多数据
  loadMoreData() {
    this.setState({
      isLoadingMore: true
    })
    const result = getListData(this.props.cityName, this.state.page)
    this.resultHandler(result)
    this.setState({
      page: this.state.page + 1,
      isLoadingMore: false
    })

  }

  // 数据处理
  resultHandler(result) {
    result.then((res) => {
      return res.json()
    }).then((json) => {
      console.log('json.hasMore',json.hasMore);
      const hasMore = json.hasMore
      const data = json.data
      this.setState({
        data: this.state.data.concat(data),
        hasMore: hasMore,

      })
    })
  }
}

export default List

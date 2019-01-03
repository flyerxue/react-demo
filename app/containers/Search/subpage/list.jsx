import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import { getSearchData } from '../../../fetch/search/search.js'
import ListComponent from '../../../components/List/index'
import LoadMore from '../../../components/LoadMore'

// 初始化一个组件的 state
const initialState = {
  data: [],
  hasMore: false,
  isLoadingMore: false,
  page: 0
}

class SearchList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = initialState
  }
  render() {
    return (
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
    )
  }

  componentDidMount() {
    // 获取首页数据
    this.loadFirstPageData()
  }
  // 获取首页数据
  loadFirstPageData() {
    const cityName = this.props.userinfo.cityName
    const keyword = this.props.keyword || ''
    const category = this.props.category
    const result = getSearchData(0, cityName, category, keyword)
    this.resultHandler(result)
  }

  //加载更多数据
  loadMoreData() {
    this.setState({
      isLoadingMore: true
    })
    const page = this.state.page
    const cityName = this.props.userinfo.cityName
    const category = this.props.category
    const keyword = this.props.keyword || ''
    const result = getSearchData(page, cityName, category, keyword)
    this.resultHandler(result)
    this.setState({
      isLoadingMore: false
    })

  }

  // 数据处理
  resultHandler(result) {
    // 增加 page 计数
    const page = this.state.page
    this.setState({
      page: page + 1
    })

    result.then(res => {
      return res.json()
    }).then(json => {
      const hasMore = json.hasMore
      const data = json.data

      this.setState({
        hasMore: hasMore,
        // 注意，这里讲最新获取的数据，拼接到原数据之后，使用 concat 函数
        data: this.state.data.concat(data)
      })
    }).catch(ex => {
      if (__DEV__) {
        console.error('搜索页获取数据报错, ', ex.message)
      }
    })
  }
  componentDidUpdate(prevProps, prevState) {
    const keyword = this.props.keyword
    const category = this.props.category

    //  搜索条件完全相等时,忽略  重要！！！
    if(keyword === prevProps.keyword && category === prevProps.category) {
      return
    }
    //  // 重置 state
    this.setState(initialState)
    // //  重新加载数据
    this.loadFirstPageData()
  }
}

// redux
function mapStateToProps(state) {
  return {
    userinfo: state.userinfo
  }
}
function mapDispatchToProps(dispatch) {
  return {}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchList)

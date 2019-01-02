import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'
import img from '../../static/img/2.png'

class HomeBanner extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div id='home-banner'>
        <h2>超值特惠</h2>
        <div className="banner-container clear-fix">
          {
            this.props.data.map((item, index) => {
                return (
                  <div key={index} className="banner-item float-left">
                    <a href={item.link} target="_blank">
                      <img src={img} alt={item.title}/>
                    </a>
                  </div>
                )
            })
          }
        </div>
      </div>
    )
  }

}

export default HomeBanner

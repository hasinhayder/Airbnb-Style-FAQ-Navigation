/**
 * @author: Hasin Hayder
 * @licence: MIT
 */

var GoBack = React.createClass({
  render: function () {
    var display = !this.props.dp ? 'dn' : '';
    return (
      <div className={'faq-back ' + display}>
        <a href="#" onClick={this.props.onClick}>&lt;&lt; All Articles</a>
      </div>
    );
  }
});

var FAQ = React.createClass({
  getInitialState: function () {
    return {
      item: this.props.item
    };
  },

  render: function () {
    var display = this.state.item.visible ? '' : 'dn';
    var detailDisplay = this.state.item.detail ? '' : 'dn';
    return (
      <div className={'faq-item ' + display }>
        <div className='faq-icon'>
          <img src='img/faq.png'></img>
        </div>
        <h2 className='faq-title' onClick={this.props.onClick}>{this.state.item.title}</h2>
        <div className={'faq-content ' + detailDisplay}>
          <p dangerouslySetInnerHTML={{__html:this.state.item.text}}></p>
        </div>
        <div className="clear"></div>
      </div>
    );
  }
});

var FAQs = React.createClass({
  getInitialState: function () {
    var faqs = this.props.faqs.map(function (faq, index) {
      faq.visible = 1;
      faq.detail = 0;
      faq.index = index;
      return faq;
    });

    return {
      faqs: faqs,
      showGoBack: 0
    };
  },

  goBack: function (e) {
    e.preventDefault();
    var items = this.state.faqs.map(function (item) {
      item.visible = 1;
      item.detail = 0;
      return item;
    });
    this.setState({faqs: items, showGoBack: 0});
  },

  faqClicked: function (faq) {
    var items = this.state.faqs.map(function (item) {
      item.visible = 0;
      item.detail = 0;
      return item;
    });
    items[faq.index].visible = 1;
    items[faq.index].detail = 1;
    this.setState({faqs: items, showGoBack: 1});
  },

  render: function () {
    var that = this;
    return (
      <div onMouseOver={this.toggleFAQ} onMouseOut={this.toggleFAQ}>
        <span className='faq-nav'> FAQ&nbsp; </span>
        <div ref='fc' className='faq-container dn'>
          <GoBack onClick={this.goBack} dp={this.state.showGoBack}/>
          <div className='faqs'>
            {
              this.state.faqs.map(function (item, index) {
                if ( item.visible ) {
                  var faqClicked = that.faqClicked.bind(null, item);
                  return <FAQ onClick={faqClicked} key={index} item={item}/>
                }
              })
            }
          </div>
        </div>
      </div>
    );
  },
  toggleFAQ: function () {
    React.findDOMNode(this.refs['fc']).classList.toggle('dn');;
  }

});
React.render(<FAQs faqs={faqs}/>, document.getElementById('react-faq'));

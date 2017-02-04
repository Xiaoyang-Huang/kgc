var React = require('react');
var ReactDOM = require('react-dom');

var classNames = require('classnames');

var TodoFooter = React.createClass({
	onFilter: function(showState){
    this.props.onFilter(showState);
  },
  render: function(){
    var clearButton = null;
    if (this.props.completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={this.props.onClear}>
          Clear completed
        </button>
      );
    }

    return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{this.props.count}</strong> {this.props.count > 1 ? "items" : "item"} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="javascript:void(0)"
            onClick={this.onFilter.bind(this, app.ALL_TODOS)}
            className={classNames({selected: this.props.nowShowing === app.ALL_TODOS})}>
              All
          </a>
        </li>
        {' '}
        <li>
          <a
            href="javascript:void(0)"
            onClick={this.onFilter.bind(this, app.ACTIVE_TODOS)}
            className={classNames({selected: this.props.nowShowing === app.ACTIVE_TODOS})}>
              Active
          </a>
        </li>
        {' '}
        <li>
          <a
            href="javascript:void(0)"
            onClick={this.onFilter.bind(this, app.COMPLETED_TODOS)}
            className={classNames({selected: this.props.nowShowing === app.COMPLETED_TODOS})}>
              Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
    )
  }
})

module.exports = TodoFooter
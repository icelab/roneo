'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = formalist;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _formalistStandardReact = require('formalist-standard-react');

var _formalistStandardReact2 = _interopRequireDefault(_formalistStandardReact);

var _formalistSerializeReact = require('formalist-serialize-react');

var _formalistSerializeReact2 = _interopRequireDefault(_formalistSerializeReact);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

require('ric');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Recurse to find the first FORM that is a parent of `el`
 * @param  {Node} el Child node to check parents of
 * @return {Mixed} The parent node or false
 */
function findParentForm(el) {
  var parentNode = el.parentNode;
  if (parentNode) {
    if (parentNode.nodeName === 'FORM') {
      return parentNode;
    } else {
      return findParentForm(parentNode);
    }
  }
  return false;
}

/**
 * Simple wrapper to create the form outer
 */

var FormWrapper = function (_Component) {
  _inherits(FormWrapper, _Component);

  function FormWrapper(props) {
    _classCallCheck(this, FormWrapper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FormWrapper).call(this, props));

    var form = _this.props.form;

    var formState = form.store.getState();
    var serialized = _this.serializeForm(formState);
    _this.state = {
      formState: formState,
      serialized: serialized
    };
    return _this;
  }

  _createClass(FormWrapper, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var form = this.props.form;

      form.store.subscribe(
      // Debounce the reducer
      (0, _lodash2.default)(function () {
        // Wait for an idle callback to trigger the serialized render
        // as it’s less important and more expensive
        window.requestUserIdle(function () {
          var formState = form.store.getState();
          var serialized = _this2.serializeForm(formState);
          _this2.setState({
            formState: formState,
            serialized: serialized
          });
        });
      }, 30));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var _props = this.props;
      var parentForm = _props.parentForm;
      var form = _props.form;

      if (parentForm) {
        // Ensure the serialize data get written before we submit
        parentForm.addEventListener('submit', function onParentSubmit(e) {
          e.preventDefault();
          var formState = form.store.getState();
          var serialized = self.serializeForm(formState);
          self.setState({
            formState: formState,
            serialized: serialized
          }, function () {
            // After state is set, remove our listener and submit the form again
            parentForm.removeEventListener('submit', onParentSubmit);
            parentForm.submit();
          });
        });
      }
    }
  }, {
    key: 'serializeForm',
    value: function serializeForm(formState) {
      var prefix = this.props.prefix;

      formState = formState || this.props.form.store.getState();
      return (0, _formalistSerializeReact2.default)(formState.toJS(), { prefix: prefix });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !_immutable2.default.is(this.state.formState, nextState.formState);
    }
  }, {
    key: 'render',
    value: function render() {
      var form = this.props.form;
      var serialized = this.state.serialized;

      return _react2.default.createElement(
        'div',
        null,
        form.render(),
        serialized
      );
    }
  }]);

  return FormWrapper;
}(_react.Component);

FormWrapper.propTypes = {
  form: _react.PropTypes.object.isRequired,
  parentForm: _react.PropTypes.object,
  prefix: _react.PropTypes.string
};

var defaultOptions = {
  serializeBeforeParentSubmit: true
};

/**
 * Viewloader compatible boot function
 * @param  {Element} el Element where the form will be mounted
 * @param  {AST} ast Formalist compatible abstract syntax tree
 */
function formalist(el, props) {
  var options = Object.assign({}, defaultOptions, props);
  var configuredTemplate = (0, _formalistStandardReact2.default)(null, options.config);
  var form = configuredTemplate(options.ast);
  var wrapperProps = {
    form: form,
    prefix: options.prefix
  };
  // Pass through the parent form if we want to bind the serialize
  if (options.serializeBeforeParentSubmit) {
    var parentForm = findParentForm(el);
    if (parentForm) {
      wrapperProps.parentForm = parentForm;
    }
  }
  _reactDom2.default.render(_react2.default.createElement(FormWrapper, wrapperProps), el);
}
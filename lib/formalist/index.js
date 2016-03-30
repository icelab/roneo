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

var _formalistCompose = require('formalist-compose');

var _formalistCompose2 = _interopRequireDefault(_formalistCompose);

var _formalistSerializeReact = require('formalist-serialize-react');

var _formalistSerializeReact2 = _interopRequireDefault(_formalistSerializeReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Simple wrapper to create the form outer
 */

var FormWrapper = function (_Component) {
  _inherits(FormWrapper, _Component);

  function FormWrapper(props) {
    _classCallCheck(this, FormWrapper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FormWrapper).call(this, props));

    var form = _this.props.form;
    _this.serializedFormTemplate = (0, _formalistCompose2.default)((0, _formalistSerializeReact2.default)({
      prefix: props.prefix
    }));
    _this.state = {
      formState: form.store.getState()
    };
    return _this;
  }

  _createClass(FormWrapper, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var form = this.props.form;
      form.store.subscribe(function () {
        _this2.setState({
          formState: form.store.getState()
        });
      });
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
      var formState = this.state.formState;

      var serializedForm = this.serializedFormTemplate(formState);
      return _react2.default.createElement(
        'div',
        null,
        form.render(),
        serializedForm.render()
      );
    }
  }]);

  return FormWrapper;
}(_react.Component);

FormWrapper.propTypes = {
  form: _react.PropTypes.object.isRequired,
  prefix: _react.PropTypes.string
};

/**
 * Viewloader compatible boot function
 * @param  {Element} el Element where the form will be mounted
 * @param  {AST} ast Formalist compatible abstract syntax tree
 */
function formalist(el, props) {
  var configuredTemplate = (0, _formalistStandardReact2.default)();
  var form = configuredTemplate(props.ast);
  _reactDom2.default.render(_react2.default.createElement(FormWrapper, { form: form, prefix: props.prefix }), el);
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.initializeFormalist = initializeFormalist;
exports.default = formalist;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formalistStandardReact = require('formalist-standard-react');

var _formalistStandardReact2 = _interopRequireDefault(_formalistStandardReact);

var _formalistSerializeReact = require('formalist-serialize-react');

var _formalistSerializeReact2 = _interopRequireDefault(_formalistSerializeReact);

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

    var _this = _possibleConstructorReturn(this, (FormWrapper.__proto__ || Object.getPrototypeOf(FormWrapper)).call(this, props));

    var form = _this.props.form;

    var formState = form.getState();
    _this.state = {
      formState: formState,
      serialized: null
    };
    return _this;
  }

  _createClass(FormWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var self = this;
      var formBusy = false;
      var _props = this.props,
          form = _props.form,
          parentForm = _props.parentForm;

      form.on('change', function (getState) {
        var formState = getState();
        _this2.setState({
          formState: formState
        });
      });
      if (parentForm) {
        // Ensure the serialize data get written before we submit
        parentForm.addEventListener('submit', function onParentSubmit(e) {
          e.preventDefault();
          if (formBusy) return;
          var serialized = self.serializeForm();
          self.setState({
            serialized: serialized
          }, function () {
            // Create and dispatch a custom event that is cancelable
            var postSerializationEvent = new window.CustomEvent('postserialization', {
              detail: {
                serialized: serialized,
                originalEvent: e
              },
              cancelable: true
            });
            var succeeded = parentForm.dispatchEvent(postSerializationEvent);
            if (succeeded) {
              parentForm.submit();
            }
          });
        });
        // Enable/disable the form
        form.on('busy', function () {
          formBusy = true;
          parentForm.classList.add('form--busy');
        });
        form.on('idle', function () {
          formBusy = false;
          parentForm.classList.remove('form--busy');
        });
      }
    }
  }, {
    key: 'serializeForm',
    value: function serializeForm() {
      var prefix = this.props.prefix;

      var formState = this.props.form.getState();
      return (0, _formalistSerializeReact2.default)(formState.toJS(), { prefix: prefix });
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
  form: _propTypes2.default.object.isRequired,
  parentForm: _propTypes2.default.object,
  prefix: _propTypes2.default.string
};

var defaultOptions = {
  serializeBeforeParentSubmit: true
  /**
   * Render formalist form
   * @param  {Element} el Element where the form will be mounted
   * @param  {AST} props.ast Formalist compatible abstract syntax tree
   * @param  {AST} props.prefix Formalist compatible abstract syntax tree
   */
};function initializeFormalist(el, props) {
  var options = Object.assign({}, defaultOptions, props);
  var configuredTemplate = (0, _formalistStandardReact2.default)(null, options.config);
  var form = configuredTemplate(options.ast);
  var wrapperProps = {
    form: form,
    prefix: options.prefix
    // Pass through the parent form if we want to bind the serialize
  };if (options.serializeBeforeParentSubmit) {
    var parentForm = findParentForm(el);
    if (parentForm) {
      wrapperProps.parentForm = parentForm;
    }
  }

  // Create a function to call the actual DOM render
  function render() {
    _reactDom2.default.render(_react2.default.createElement(FormWrapper, wrapperProps), el);
  }

  return {
    form: form,
    render: render
  };
}

/**
 * Viewloader compatible boot function
 */
function formalist(el, props) {
  var form = initializeFormalist(el, props);
  form.render();
}
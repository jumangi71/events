
class Ram {
  constructor(scope) {
    this.scope = scope;
  }

  dispatch(e, el) {
    let target = e.target;
    let element = ((typeof this.selector) != 'string') ? this.selector : this.s.querySelector(this.selector);

    if (this.selector) {
      while (target !== this.s) {
        if (target === element) {
          if (typeof this.callback === 'function') this.callback(e, this.selector);
          break;
        }
        target = target.parentNode;
      }
    } else {
      if (typeof this.callback === 'function') this.callback(e, el);
    }
  }

  removeEvent(scope) {
    this.s = scope;
    let _this = this;
    scope.removeEventListener(this.event, function(e) {
      _this.dispatch(e);
    }, false);
  }

  setEvent(scope) {
    // TODO: error handle. Add try catch
    this.s = scope;
    let _this = this;
    scope.addEventListener(this.event, function(e) {
      _this.dispatch(e, this);
    }, false);
  }

  prepare(type, event, callback, selector) {
    this.event = event;
    this.callback = callback;
    if (selector) this.selector = selector;
    // Set listeners on all child items. Ex. for ul li
    if (this.scope.length >= 1 && this.scope.tagName !== 'FORM') {
      for (let x = 0; x < this.scope.length; x++) {
        if (type === 'on') this.setEvent(this.scope[x]);
        if (type === 'off') this.removeEvent(this.scope[x]);
      }
    } else {
      if (type === 'on') this.setEvent(this.scope);
      if (type === 'off') this.removeEvent(this.scope);
    }
  }

  on(event, callback, selector) {
    this.prepare('on', event, callback, selector);
  }

  off(event, callback) {
    this.prepare('off', event, callback);
  }
}

let mod = (arg) => {
  return new Ram(arg);
};

module.exports = mod;

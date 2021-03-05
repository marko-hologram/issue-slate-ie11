// @ts-nocheck
if (typeof window !== 'undefined') {
  /*!
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#polyfill
   * Needed for IE11. Primarily for Slate editor.
   */
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      let el = this;

      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }

  /**
   * Adds Node.parentElement and Document.parentElement
   * Needed for IE11. Primarily for Slate editor.
   */
  if (
    !('parentElement' in window.Document.prototype) ||
    !('parentElement' in window.Text.prototype) ||
    !('parentElement' in window.Attr.prototype)
  ) {
    // Environment doesn't support 'parentElement' or only supports it on nodes that are Elements themselves.
    // To unify behavior between all browsers and to be spec-compliant, parentElement should be supported on any Node.

    const implementation = () => {
      return this.parentNode instanceof Element ? this.parentNode : null;
    };

    try {
      Object.defineProperty(Attr.prototype, 'parentElement', {
        configurable: false,
        enumerable: false,
        get: implementation,
      });
    } catch (e) {
      // IE8
      Attr.prototype.parentElement = implementation;
    }

    try {
      Object.defineProperty(Text.prototype, 'parentElement', {
        configurable: false,
        enumerable: false,
        get: implementation,
      });
    } catch (e) {
      // IE8
      Text.prototype.parentElement = implementation;
    }

    try {
      Object.defineProperty(Element.prototype, 'parentElement', {
        configurable: false,
        enumerable: false,
        get: implementation,
      });
    } catch (e) {
      // IE8
      Element.prototype.parentElement = implementation;
    }

    try {
      Object.defineProperty(Document.prototype, 'parentElement', {
        configurable: false,
        enumerable: false,
        get: implementation,
      });
    } catch (e) {
      // IE8
      Document.prototype.parentElement = implementation;
    }
  }

  /**
   * Adds Selection.setBaseAndExtent
   * Needed for IE11. Primarily for Slate editor.
   */
  if ('Selection' in window && !Selection.prototype.setBaseAndExtent) {
    Selection.prototype.setBaseAndExtent = function (anchorNode, anchorOffset, focusNode, focusOffset) {
      const range = document.createRange();
      range.setStart(anchorNode, anchorOffset);
      range.setEnd(focusNode, focusOffset);
      this.removeAllRanges();
      this.addRange(range);
    };
  }

  /**
   * Adds Node.prototype.contains
   * Needed for IE11. Primarily for Slate editor.
   */
  const contains = (node) => {
    if (!(0 in arguments)) {
      throw new TypeError('1 argument is required for .contains()');
    }

    do {
      if (this === node) {
        return true;
      }
      // eslint-disable-next-line no-cond-assign
    } while ((node = node && node.parentNode));

    return false;
  };

  if ('HTMLElement' in window && 'contains' in HTMLElement.prototype) {
    try {
      delete window.HTMLElement.prototype.contains;
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }

  if ('Node' in window) {
    Node.prototype.contains = contains;
  } else {
    document.contains = Element.prototype.contains = contains;
  }

  /*!
   * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#polyfill
   * Adds NodeList.forEach
   * Needed for IE11. Primarily for Slate editor.
   */
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
}

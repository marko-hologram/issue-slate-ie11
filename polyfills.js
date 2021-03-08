if (typeof window !== 'undefined') {
  /**
   * Adds Selection.setBaseAndExtent
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
}

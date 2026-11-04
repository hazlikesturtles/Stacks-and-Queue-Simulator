class Stack {
  constructor() { this.items = []; }
  push(value) { this.items.push(value); }
  pop() { return this.items.pop(); }          // removes the TOP (last added)
  peek() { return this.items[this.items.length - 1]; }
  clear() { this.items = []; }
  isEmpty() { return this.items.length === 0; }
}

$(function () {
  const stack = new Stack();
  const $input = $("#valueInput");
  const $stack = $("#stack");
  const $deleted = $("#deleted");
  const $msg = $("#message");

  function say(text) { $msg.text(text || ""); }

  function render(highlightTop) {
    $stack.empty();
    stack.items.forEach(function (value, i) {
      const $b = $("<div>").addClass("block").text(value);
      if (i === stack.items.length - 1) {
        $b.addClass("top");
        if (highlightTop) $b.addClass("highlight");
      }
      $stack.append($b);   // column-reverse puts the newest on top
    });
  }

  function push() {
    const value = $input.val().trim();
    if (value === "") { say("Enter a value before pushing."); return; }
    stack.push(value);
    $input.val("").focus();
    say("");
    render(false);
  }

  function pop() {
    if (stack.isEmpty()) { say("The stack is empty. Nothing to pop."); return; }
    const value = stack.pop();
    $deleted.append($("<div>").addClass("block").text(value));
    say("");
    render(false);
  }

  function peek() {
    if (stack.isEmpty()) { say("The stack is empty. Nothing to peek."); return; }
    say("");
    render(true);
    setTimeout(function () { render(false); }, 1500);
  }

  function clearAll() {
    stack.clear();
    $deleted.empty();
    say("");
    render(false);
  }

  $("#pushBtn").on("click", push);
  $("#popBtn").on("click", pop);
  $("#peekBtn").on("click", peek);
  $("#clearBtn").on("click", clearAll);
  $input.on("keydown", function (e) { if (e.key === "Enter") push(); });

  render(false);
});

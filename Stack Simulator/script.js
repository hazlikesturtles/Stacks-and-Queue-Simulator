class Stack {
  constructor() { this.items = []; }
  push(value) { this.items.push(value); }
  pop() { return this.items.pop(); }         
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
  let peeked = false;   

  function say(text) { $msg.text(text || ""); }

  function render() {
    $stack.empty();
    stack.items.forEach(function (value, i) {
      const $b = $("<div>").addClass("block").text(value);
      if (i === stack.items.length - 1) {
        $b.addClass("top");
        if (peeked) $b.addClass("highlight");
      }
      $stack.append($b);   
    });
  }

  function push() {
    const value = $input.val().trim();
    if (value === "") { say("Enter a value before pushing."); return; }
    stack.push(value);
    peeked = false;      
    $input.val("").focus();
    say("");
    render();
  }

  function pop() {
    if (stack.isEmpty()) { say("The stack is empty. Nothing to pop."); return; }
    const value = stack.pop();
    $deleted.append($("<div>").addClass("block").text(value));
    peeked = false;
    say("");
    render();
  }

  function peek() {
    if (stack.isEmpty()) { say("The stack is empty. Nothing to peek."); return; }
    say("");
    peeked = true;       
    render();
  }

  function clearAll() {
    stack.clear();
    $deleted.empty();
    peeked = false;
    say("");
    render();
  }

  $("#pushBtn").on("click", push);
  $("#popBtn").on("click", pop);
  $("#peekBtn").on("click", peek);
  $("#clearBtn").on("click", clearAll);
  $input.on("keydown", function (e) { if (e.key === "Enter") push(); });

  render();
});

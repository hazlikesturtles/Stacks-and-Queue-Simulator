class Queue {
  constructor() { this.items = []; }
  enqueue(value) { this.items.push(value); }  
  dequeue() { return this.items.shift(); }     
  peek() { return this.items[0]; }             
  clear() { this.items = []; }
  isEmpty() { return this.items.length === 0; }
}

$(function () {
  const queue = new Queue();
  const $input = $("#valueInput");
  const $queue = $("#queue");
  const $deleted = $("#deleted");
  const $msg = $("#message");
  let peeked = false;   

  function say(text) { $msg.text(text || ""); }

  function render() {
    $queue.empty();
    const last = queue.items.length - 1;
    queue.items.forEach(function (value, i) {
      const $b = $("<div>").addClass("block").text(value);
      const tags = [];
      if (i === 0) tags.push("Front");
      if (i === last) tags.push("Rear");
      if (tags.length) $b.append($("<span>").addClass("tag").text(tags.join(" / ")));
      if (i === 0 && peeked) $b.addClass("highlight");
      $queue.append($b);
    });
  }

  function enqueue() {
    const value = $input.val().trim();
    if (value === "") { say("Enter a value before enqueueing."); return; }
    queue.enqueue(value);
    $input.val("").focus();
    say("");
    render();
  }

  function dequeue() {
    if (queue.isEmpty()) { say("The queue is empty. Nothing to dequeue."); return; }
    const value = queue.dequeue();
    $deleted.append($("<div>").addClass("block").text(value));
    peeked = false;      
    say("");
    render();
  }

  function peek() {
    if (queue.isEmpty()) { say("The queue is empty. Nothing to peek."); return; }
    say("");
    peeked = true;      
    render();
  }

  function clearAll() {
    queue.clear();
    $deleted.empty();
    peeked = false;
    say("");
    render();
  }

  $("#enqueueBtn").on("click", enqueue);
  $("#dequeueBtn").on("click", dequeue);
  $("#peekBtn").on("click", peek);
  $("#clearBtn").on("click", clearAll);
  $input.on("keydown", function (e) { if (e.key === "Enter") enqueue(); });

  render();
});

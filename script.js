class Queue {
  constructor() { this.items = []; }
  enqueue(value) { this.items.push(value); }   // add at the REAR
  dequeue() { return this.items.shift(); }     // remove from the FRONT (earliest value)
  peek() { return this.items[0]; }             // inspect the FRONT
  clear() { this.items = []; }
  isEmpty() { return this.items.length === 0; }
}

$(function () {
  const queue = new Queue();
  const $input = $("#valueInput");
  const $queue = $("#queue");
  const $deleted = $("#deleted");
  const $msg = $("#message");

  function say(text) { $msg.text(text || ""); }

  function render(highlightFront) {
    $queue.empty();
    const last = queue.items.length - 1;
    queue.items.forEach(function (value, i) {
      const $b = $("<div>").addClass("block").text(value);
      const tags = [];
      if (i === 0) tags.push("Front");
      if (i === last) tags.push("Rear");
      if (tags.length) $b.append($("<span>").addClass("tag").text(tags.join(" / ")));
      if (i === 0 && highlightFront) $b.addClass("highlight");
      $queue.append($b);
    });
  }

  function enqueue() {
    const value = $input.val().trim();
    if (value === "") { say("Enter a value before enqueueing."); return; }
    queue.enqueue(value);
    $input.val("").focus();
    say("");
    render(false);
  }

  function dequeue() {
    if (queue.isEmpty()) { say("The queue is empty. Nothing to dequeue."); return; }
    const value = queue.dequeue();
    $deleted.append($("<div>").addClass("block").text(value));
    say("");
    render(false);
  }

  function peek() {
    if (queue.isEmpty()) { say("The queue is empty. Nothing to peek."); return; }
    say("");
    render(true);
    setTimeout(function () { render(false); }, 1500);
  }

  function clearAll() {
    queue.clear();
    $deleted.empty();
    say("");
    render(false);
  }

  $("#enqueueBtn").on("click", enqueue);
  $("#dequeueBtn").on("click", dequeue);
  $("#peekBtn").on("click", peek);
  $("#clearBtn").on("click", clearAll);
  $input.on("keydown", function (e) { if (e.key === "Enter") enqueue(); });

  render(false);
});

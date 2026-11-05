class Queue {
    constructor() {
        this.items = []
        this.count = 0
    }

    // Add element to the rear of the queue
    enqueue(element) {
        this.items[this.count] = element
        let enqueue_res = `${element}`
        this.count += 1
        let count = this.count - 1
        return [enqueue_res, count]
    }

    // Return and remove the element at the front of the queue
    // Return undefined if queue is empty
    dequeue() {
        if (this.count == 0) return undefined
        let deleteItem = this.items.shift()
        this.count -= 1
        console.log(`${deleteItem} removed from front`)
        return deleteItem
    }

    // Check the front element in queue (does not remove it)
    // Return undefined if queue is empty
    peek() {
        if (this.count == 0) return undefined
        console.log(`Front element is ${this.items[0]}`)
        return this.items[0]
    }

    // Check if queue is empty
    isEmpty() {
        console.log(this.count == 0 ? 'Queue is empty' : 'Queue is NOT empty')
        return this.count == 0
    }

    // Check size of queue
    size() {
        console.log(`${this.count} elements in queue`)
        return this.count
    }

    // Print elements in queue (front to rear)
    print() {
        let str = ''
        for (let i = 0; i < this.count; i++) {
            str += this.items[i] + ' '
        }
        return str
    }

    // Clear queue
    clear() {
        this.items = []
        this.count = 0
        console.log('Queue cleared..')
        return this.items
    }
}

const queue = new Queue()

// ---------- UI helpers ----------

let messageTimer = null
let peekTimer = null

// Show a short feedback message under the title
function showMessage(text, type = 'info') {
    clearTimeout(messageTimer)
    $("#message")
        .removeClass("d-none alert-info alert-warning alert-danger alert-success")
        .addClass(`alert-${type}`)
        .text(text)
    messageTimer = setTimeout(() => $("#message").addClass("d-none"), 3000)
}

// Redraw the queue from the data.
// Display direction: FRONT at the top, REAR at the bottom.
function renderQueue() {
    const $queue = $("#queue").empty()

    $("<div>").addClass("queue-label front-label").text("▼ FRONT").appendTo($queue)

    if (queue.count === 0) {
        $("<div>").addClass("queue-empty").text("(empty)").appendTo($queue)
    }

    for (let i = 0; i < queue.count; i++) {
        const color = i % 2 === 0 ? "bg-primary" : "bg-success"
        $("<div>")
            .addClass(`row ${color} queue-block`)
            .attr("title", queue.items[i])
            .text(queue.items[i])
            .appendTo($queue)
    }

    $("<div>").addClass("queue-label rear-label").text("▲ REAR").appendTo($queue)
}

// ---------- Operations ----------

function doEnqueue() {
    const value = $("#data").val().trim()
    if (value === "") {
        showMessage("Please enter a value before enqueueing.", "warning")
        $("#data").focus()
        return
    }
    queue.enqueue(value)
    renderQueue()
    $("#data").val("").focus()
    showMessage(`Enqueued ${value} at the rear of the queue.`, "success")
}

function doDequeue() {
    const removed = queue.dequeue()
    if (removed === undefined) {
        showMessage("The queue is empty. Nothing to dequeue.", "danger")
        return
    }
    renderQueue()
    $("<div>")
        .addClass("row dequeued text-bg-danger border border-light")
        .attr("title", removed)
        .text(removed)
        .appendTo(".deleted-area")
    showMessage(`Dequeued ${removed} from the front.`, "info")
}

function doPeek() {
    const front = queue.peek()
    if (front === undefined) {
        showMessage("The queue is empty. Nothing to peek.", "danger")
        return
    }
    // Highlight the front block (first block) without removing it
    clearTimeout(peekTimer)
    $("#queue .queue-block").removeClass("highlight")
    $("#queue .queue-block").first().addClass("highlight")
    peekTimer = setTimeout(() => $("#queue .queue-block").removeClass("highlight"), 1500)
    showMessage(`Front element is ${front}.`, "info")
}

function doClear() {
    queue.clear()
    renderQueue()
    $(".deleted-area").empty()
    showMessage("Queue cleared.", "success")
}

$(document).ready(function () {
    // Starter data
    queue.enqueue(100)
    queue.enqueue(200)
    queue.enqueue(300)
    queue.enqueue(400)
    renderQueue()

    $("#enqueueBtn").on("click", doEnqueue)
    $("#dequeueBtn").on("click", doDequeue)
    $("#peekBtn").on("click", doPeek)
    $("#clearBtn").on("click", doClear)
    $("#data").on("keydown", function (e) {
        if (e.key === "Enter") doEnqueue()
    })
})

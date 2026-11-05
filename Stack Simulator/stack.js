class Stack {
    constructor() {
        this.items = []
        this.count = 0
    }

    // Add element to top of stack
    push(element) {
        this.items[this.count] = element
        let push_res = `${element}`
        this.count += 1
        let count = this.count - 1
        return [push_res, count]
    }

    // Return and remove top element in stack
    // Return undefined if stack is empty
    pop() {
        if (this.count == 0) return undefined
        let deleteItem = this.items[this.count - 1]
        this.items.pop()
        this.count -= 1
        console.log(`${deleteItem} removed`)
        return deleteItem
    }

    // Check top element in stack (does not remove it)
    // Return undefined if stack is empty
    peek() {
        if (this.count == 0) return undefined
        console.log(`Top element is ${this.items[this.count - 1]}`)
        return this.items[this.count - 1]
    }

    // Check if stack is empty
    isEmpty() {
        console.log(this.count == 0 ? 'Stack is empty' : 'Stack is NOT empty')
        return this.count == 0
    }

    // Check size of stack
    size() {
        console.log(`${this.count} elements in stack`)
        return this.count
    }

    // Print elements in stack
    print() {
        let str = ''
        for (let i = 0; i < this.count; i++) {
            str += this.items[i] + ' '
        }
        return str
    }

    // Clear stack
    clear() {
        this.items = []
        this.count = 0
        console.log('Stack cleared..')
        return this.items
    }
}

const stack = new Stack()

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

// Redraw the stack from the data (top of the stack is shown at the top)
function renderStack() {
    const $stack = $("#stack").empty()
    for (let i = stack.count - 1; i >= 0; i--) {
        const color = i % 2 === 0 ? "bg-primary" : "bg-success"
        $("<div>")
            .addClass(`row ${color} push`)
            .attr("title", stack.items[i])
            .text(stack.items[i])
            .appendTo($stack)
    }
}

// ---------- Operations ----------

function doPush() {
    const value = $("#data").val().trim()
    if (value === "") {
        showMessage("Please enter a value before pushing.", "warning")
        $("#data").focus()
        return
    }
    stack.push(value)
    renderStack()
    $("#data").val("").focus()
    showMessage(`Pushed ${value} onto the stack.`, "success")
}

function doPop() {
    const removed = stack.pop()
    if (removed === undefined) {
        showMessage("The stack is empty. Nothing to pop.", "danger")
        return
    }
    renderStack()
    $("<div>")
        .addClass("row pop text-bg-danger border border-light")
        .attr("title", removed)
        .text(removed)
        .appendTo(".popped")
    showMessage(`Popped ${removed} from the top.`, "info")
}

function doPeek() {
    const top = stack.peek()
    if (top === undefined) {
        showMessage("The stack is empty. Nothing to peek.", "danger")
        return
    }
    // Highlight the top block (first child) without removing it
    clearTimeout(peekTimer)
    $("#stack .push").removeClass("highlight")
    $("#stack .push").first().addClass("highlight")
    peekTimer = setTimeout(() => $("#stack .push").removeClass("highlight"), 1500)
    showMessage(`Top element is ${top}.`, "info")
}

function doClear() {
    stack.clear()
    renderStack()
    $(".popped").empty()
    showMessage("Stack cleared.", "success")
}

$(document).ready(function () {
    // Starter data
    stack.push(100)
    stack.push(200)
    stack.push(300)
    stack.push(400)
    renderStack()

    $("#pushBtn").on("click", doPush)
    $("#popBtn").on("click", doPop)
    $("#peekBtn").on("click", doPeek)
    $("#clearBtn").on("click", doClear)
    $("#data").on("keydown", function (e) {
        if (e.key === "Enter") doPush()
    })
})

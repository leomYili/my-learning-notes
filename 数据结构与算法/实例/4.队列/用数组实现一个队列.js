class CircularQueue {
    constructor(k) {
        this.size = k;

        this.dataSource = [];
    }

    enqueue(value) {
        if (!this.isFull()) {
            this.dataSource.push(value);
        }
    }

    dequeue() {
        this.dataSource.shift();
    }

    head() {
        return this.dataSource[0];
    }

    tail() {
        return this.dataSource[this.dataSource.length - 1];
    }

    isFull() {
        if (this.dataSource.length === this.size) return true;

        return false;
    }

    isEmpty() {
        if (this.dataSource.length === 0) return true;

        return false;
    }
}

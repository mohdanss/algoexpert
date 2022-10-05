class MinHeap {
    constructor(array) {
        this.heap = this.buildHeap(array);
    }

    buildHeap(array) {
        // look for the first parent (from the last/bottom)
        let firstParent = Math.floor((array.length - 2) / 2);

        // this loop will iterate to each node, starting from the first parent, and the sift down each of them till we reach the 0th index
        while (firstParent >= 0) {
            this.siftDown(firstParent, array.length - 1, array);
            firstParent--;
        }
        return array;
    }

    siftDown(currentIdx, endIdx, heap) {
        let firstChild = 2 * currentIdx + 1;

        while (firstChild <= endIdx) {
            let secondChild;

            // check if the second child exists or not
            if (currentIdx * 2 + 2 > endIdx) secondChild = -1;
            else secondChild = currentIdx * 2 + 2;

            let idxToSwap;
            // if 2nd child exists and second child is minimum of both child, then 2nd child will be swapped by parent(currentIdx)
            if (secondChild != -1 && heap[secondChild] < heap[firstChild])
                idxToSwap = secondChild;
            else
                idxToSwap = firstChild;

            // now that we've decided which child to swap, now we'll look if we need to swap it at all or not, (i-e, if the target-child is less than parent (currentIdx)/
            if (heap[idxToSwap] < heap[currentIdx]) {
                this.swap(heap, currentIdx, idxToSwap);

                // now that elements are successfully swapped, let's now update the current index, 
                currentIdx = idxToSwap; // as sift-down, it will go to the swapped element it self and then all the way to the end. (leaves)
                firstChild = 2 * currentIdx + 1; // first child of the current Idx.
            } else
                break;
        }
    }

    siftUp(currentIdx, heap) {
        // finding the parent of the current node
        let parentIdx = Math.floor((currentIdx - 1) / 2);

        // till we reach to the starting node, and swap is valid (parent is greater than child)
        while (currentIdx > 0 && heap[currentIdx] < heap[parentIdx]) {
            // swap the parent with the child
            this.swap(heap, currentIdx, parentIdx);

            // update the child
            currentIdx = parentIdx;

            // update the parent
            parentIdx = Math.floor((currentIdx - 1) / 2);
        }
    }

    peek() {
        // get the element on the top of heap (the first)
        return this.heap[0];
    }

    remove() {
        // swap the first element with the last one, and remove the last one!!!
        this.swap(this.heap, 0, this.heap.length - 1);

        const element = this.heap.pop();

        // we'll sift it down, all the way form starting index to the last
        this.siftDown(0, this.heap.length - 1, this.heap);

        // returns the elment we just removed
        return element;
    }

    insert(value) {
        // insert the value at the end 
        if (this.heap === undefined) this.heap = [];

        this.heap.push(value);
        // now sift it - all the way to the valid position in the heap
        this.siftUp(this.heap.length - 1, this.heap);
    }

    swap(array, index1, index2) {
        let temp = array[index1];
        array[index1] = array[index2];
        array[index2] = temp;
    }
}

const isMinHeapPropertySatisfied = array => {
    for (let currentIdx = 1; currentIdx < array.length; currentIdx++) {
        const parentIdx = Math.floor((currentIdx - 1) / 2);
        if (array[parentIdx] > array[currentIdx]) return false;
    }
    return true;
};

const minHeap = new MinHeap([48, 12, 24, 7, 8, -5, 24, 391, 24, 56, 2, 6, 8, 41]);
console.log(isMinHeapPropertySatisfied(minHeap.heap));
minHeap.insert(76);
console.log(isMinHeapPropertySatisfied(minHeap.heap));
console.log(minHeap.remove()); // -5
console.log(minHeap.peek()); // -5
console.log(isMinHeapPropertySatisfied(minHeap.heap));
console.log(minHeap.peek()); // 2
console.log(minHeap.remove()); // 2
console.log(isMinHeapPropertySatisfied(minHeap.heap));
console.log(minHeap.peek()); // 6
minHeap.insert(87);
console.log(isMinHeapPropertySatisfied(minHeap.heap));

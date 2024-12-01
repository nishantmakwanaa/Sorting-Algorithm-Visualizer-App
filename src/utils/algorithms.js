class Helper {
  constructor(time, list = []) {
    this.time = parseInt(400 / time);
    this.list = list;
  }

  mark = async (index) => {
    this.list[index].setAttribute("class", "cell current");
  };

  markSpl = async (index) => {
    this.list[index].setAttribute("class", "cell min");
  };

  unmark = async (index) => {
    this.list[index].setAttribute("class", "cell");
  };

  pause = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.time);
    });
  };

  compare = async (index1, index2) => {
    await this.pause();
    let value1 = Number(this.list[index1].getAttribute("value"));
    let value2 = Number(this.list[index2].getAttribute("value"));
    if (value1 > value2) {
      return true;
    }
    return false;
  };

  swap = async (index1, index2) => {
    await this.pause();
    let value1 = this.list[index1].getAttribute("value");
    let value2 = this.list[index2].getAttribute("value");
    this.list[index1].setAttribute("value", value2);
    this.list[index1].style.height = `${3.8 * value2}px`;
    this.list[index2].setAttribute("value", value1);
    this.list[index2].style.height = `${3.8 * value1}px`;
  };
}

class SortAlgorithms {
  constructor(time) {
    this.list = document.querySelectorAll(".cell");
    this.size = this.list.length;
    this.time = time;
    this.help = new Helper(this.time, this.list);
  }

  generateArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
  }

  async bubbleSort(array) {
    const arr = [...array];
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        if (await this.help.compare(j, j + 1)) {
          await this.help.swap(j, j + 1);
          swapped = true;
        }
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
      }
      if (!swapped) break;
    }
    return arr;
  }

  async insertionSort(array) {
    const arr = [...array];
    const n = arr.length;

    for (let i = 1; i < n; i++) {
      let key = arr[i];
      let j = i - 1;
      await this.help.mark(i);
      while (j >= 0 && arr[j] > key) {
        await this.help.swap(j, j + 1);
        j = j - 1;
      }
      arr[j + 1] = key;
      await this.help.unmark(i);
    }
    return arr;
  }

  async selectionSort(array) {
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      await this.help.mark(i);
      for (let j = i + 1; j < n; j++) {
        await this.help.mark(j);
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
        await this.help.unmark(j);
      }
      if (minIndex !== i) {
        await this.help.swap(i, minIndex);
      }
      await this.help.unmark(i);
    }
    return arr;
  }

  async mergeSort(array) {
    const merge = (left, right) => {
      let result = [],
        i = 0,
        j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
      return result.concat(left.slice(i)).concat(right.slice(j));
    };

    const recursiveMergeSort = async (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = await recursiveMergeSort(arr.slice(0, mid));
      const right = await recursiveMergeSort(arr.slice(mid));
      return merge(left, right);
    };

    return await recursiveMergeSort(array);
  }

  async quickSort(array) {
    const arr = [...array];

    const quickSortHelper = async (arr) => {
      if (arr.length <= 1) return arr;
      const pivot = arr[arr.length - 1];
      const left = [];
      const right = [];
      for (let i = 0; i < arr.length - 1; i++) {
        await this.help.mark(i);
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
        await this.help.unmark(i);
      }
      return [
        ...(await quickSortHelper(left)),
        pivot,
        ...(await quickSortHelper(right)),
      ];
    };

    return await quickSortHelper(arr);
  }

  async BubbleSort() {
    for (let i = 0; i < this.size - 1; ++i) {
      for (let j = 0; j < this.size - i - 1; ++j) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        if (await this.help.compare(j, j + 1)) {
          await this.help.swap(j, j + 1);
        }
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
      }
      this.list[this.size - i - 1].setAttribute("class", "cell done");
    }
    this.list[0].setAttribute("class", "cell done");
    document.getElementById("time").innerHTML = "O(n^2)";
    document.querySelector(".footer > p:nth-child(1)").style.visibility =
      "visible";
  }

  async InsertionSort() {
    for (let i = 0; i < this.size - 1; ++i) {
      let j = i;
      while (j >= 0 && (await this.help.compare(j, j + 1))) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        await this.help.pause();
        await this.help.swap(j, j + 1);
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
        j -= 1;
      }
    }
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
    document.getElementById("time").innerHTML = "O(n^2)";
    document.querySelector(".footer > p:nth-child(1)").style.visibility =
      "visible";
  }

  async SelectionSort() {
    for (let i = 0; i < this.size; ++i) {
      let minIndex = i;
      for (let j = i; j < this.size; ++j) {
        await this.help.markSpl(minIndex);
        await this.help.mark(j);
        if (await this.help.compare(minIndex, j)) {
          await this.help.unmark(minIndex);
          minIndex = j;
        }
        await this.help.unmark(j);
        await this.help.markSpl(minIndex);
      }
      await this.help.mark(minIndex);
      await this.help.mark(i);
      await this.help.pause();
      await this.help.swap(minIndex, i);
      await this.help.unmark(minIndex);
      this.list[i].setAttribute("class", "cell done");
    }
    document.getElementById("time").innerHTML = "O(n^2)";
    document.querySelector(".footer > p:nth-child(1)").style.visibility =
      "visible";
  }

  async MergeSort() {
    await this.MergeDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
    document.getElementById("time").innerHTML = "O(nlog(n))";
    document.querySelector(".footer > p:nth-child(1)").style.visibility =
      "visible";
  }

  async MergeDivider(start, end) {
    if (start < end) {
      let mid = start + Math.floor((end - start) / 2);
      await this.MergeDivider(start, mid);
      await this.MergeDivider(mid + 1, end);
      await this.Merge(start, mid, end);
    }
  }

  async Merge(start, mid, end) {
    let newList = [];
    let frontcounter = start;
    let midcounter = mid + 1;

    while (frontcounter <= mid && midcounter <= end) {
      let fvalue = Number(this.list[frontcounter].getAttribute("value"));
      let svalue = Number(this.list[midcounter].getAttribute("value"));
      if (fvalue >= svalue) {
        newList.push(svalue);
        ++midcounter;
      } else {
        newList.push(fvalue);
        ++frontcounter;
      }
    }

    while (frontcounter <= mid) {
      newList.push(Number(this.list[frontcounter].getAttribute("value")));
      ++frontcounter;
    }

    while (midcounter <= end) {
      newList.push(Number(this.list[midcounter].getAttribute("value")));
      ++midcounter;
    }

    let counter = start;
    for (let val of newList) {
      this.list[counter].setAttribute("value", val);
      ++counter;
    }
  }

  async QuickSort() {
    await this.QuickSortDivider(0, this.size - 1);
    for (let counter = 0; counter < this.size; ++counter) {
      this.list[counter].setAttribute("class", "cell done");
    }
    document.getElementById("time").innerHTML = "O(nlog(n))";
    document.querySelector(".footer > p:nth-child(1)").style.visibility =
      "visible";
  }

  async QuickSortDivider(start, end) {
    if (start < end) {
      let partitionIndex = await this.Partition(start, end);
      await this.QuickSortDivider(start, partitionIndex - 1);
      await this.QuickSortDivider(partitionIndex + 1, end);
    }
  }

  async Partition(start, end) {
    let pivot = this.list[end].getAttribute("value");
    let pivotIndex = start;
    for (let counter = start; counter < end; ++counter) {
      if (Number(this.list[counter].getAttribute("value")) <= Number(pivot)) {
        await this.help.swap(counter, pivotIndex);
        pivotIndex++;
      }
    }
    await this.help.swap(pivotIndex, end);
    return pivotIndex;
  }
}

export default SortAlgorithms;
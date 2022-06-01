var animations = [];

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function partition(arr, low, high) {
 
    // pivot
    let pivot = arr[high];
 
    // Index of smaller element and
    // indicates the right position
    // of pivot found so far
    let i = (low - 1);
 
    for (let j = low; j <= high - 1; j++) {
        animations.push([i + 1, j, 'color']);
        animations.push([i + 1, j,'revert']);
 
        // If current element is smaller
        // than the pivot
        if (arr[j] < pivot) {
            animations.push([i + 1, j, 'swap']);
            // Increment index of
            // smaller element
            i++;
            swap(arr, i, j);
        }
    }

    animations.push([i + 1, high, 'color']);
    animations.push([i + 1, high, 'revert']);
    animations.push([i + 1, high, 'swap']);

    swap(arr, i + 1, high);
    return (i + 1);
}

export function quickSort(arr, low, high) {
    if (low < high) {
 
        let pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

export function exportAnimations(){
    let exportAni = animations;
    animations = [];

    return exportAni;
}
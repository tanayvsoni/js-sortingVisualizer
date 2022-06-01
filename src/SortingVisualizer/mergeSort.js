export var animations = [];
var arr,itmd = [];

export function initialize(array){
    animations = [];
    arr = [];
    itmd = [];
    arr = array;
}

export function mergeArray(startIndex, endIndex) {
    let mid = Math.floor((startIndex + endIndex) / 2);
    let i = startIndex;
    let j = mid + 1;
    let right = endIndex;

    // Initial index of merged subarray
    let k = startIndex;

    while (i <= mid && j <= right) {
        animations.push([i,j]);
        
        if (arr[i] <= arr[j]) {
            animations.push([k,arr[i]]);

            itmd[k] = arr[i];
            k++;
            i++;
        }
        else if (arr[i] > arr[j]) {
            animations.push([k,arr[j]]);

            itmd[k] = arr[j];
            k++;
            j++;
        }
    }

    // Copy the remaining elements of
    // arr[], if there are any
    while (i <= mid) {
        animations.push([i,k]);

        animations.push([k,arr[i]]);
        itmd[k] = arr[i];
        k++;
        i++;
    }
    while (j <= right) {
        animations.push([j,k]);

        animations.push([k,arr[j]]);
        itmd[k] = arr[j];
        k++;
        j++;
    }

    //Import sorted itmd array in to main array
    for(let i = startIndex; i <= right; i++){
        arr[i] = itmd[i];
    }
}

export const mergeSort = (startIndex, endIndex) => {
    if (startIndex < endIndex) {
        let midIndex = Math.floor((startIndex + endIndex) / 2);
        mergeSort(startIndex, midIndex);
        mergeSort(midIndex + 1, endIndex);
        mergeArray(startIndex, endIndex);
    }
}

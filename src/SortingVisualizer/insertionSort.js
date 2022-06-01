export function insertionSort(arr) { 
    let i, key, j; 
    let animations = [];

    for (i = 1; i < arr.length; i++){ 
        key = arr[i]; 
        j = i - 1; 
   
        while (j >= 0 && arr[j] > key) {

            animations.push([j+1, j, 'color']);
            animations.push([j+1, j, 'revert']);
            animations.push([j+1, arr[j], 'take']);

            arr[j + 1] = arr[j]; 
            j--; 
        } 

        animations.push([j+1, i, 'color']);
        animations.push([j+1, i, 'revert']);
        animations.push([j+1, key, 'take']);

        arr[j + 1] = key; 
    } 

    return animations;
} 
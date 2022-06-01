export function bubbleSort(array){
    let n = array.length;
    let n1 = array.length;
    let temp;
    let swapped;
    let animations = [];

    for(let i = 0; i < n-1; i++){
        swapped = false;
        for(let j = 0; j < n1 - 1; j++){
            animations.push([j,j+1]);

            if(array[j] > array[j + 1]){
                animations.push([-1,-1]);
        
                temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                swapped = true;

                animations.push([array[j],array[j+1]]);
                
            }
        }
        animations.push([-2,n1]);
        n1 -= 1;

        if(swapped === false){
            break;
        }
    }

    return animations;
}
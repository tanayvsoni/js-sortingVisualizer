import './SortingVisualizer.css';
import * as MS from './mergeSort.js';
import * as BS from './bubbleSort.js';
import * as IS from './insertionSort.js';
import * as QS from './quickSort.js';
import React from 'react';

class SortingVisualizer extends React.Component {
    //Store empty array into this.state
    constructor(props){
        super(props);
        this.state = {array: []};
        this.delay = 30;
        this.isDisabled = false;
        this.Sorted = false;
        
        //Colors
        this.green = '#77DD78';
        this.red = '#FF6962';
        this.blue = '#94ACBF';
        this.purple = '#B19CD8';
    }

    componentDidMount(){
        this.setArray();
        document.body.style.backgroundColor = "white";
    }

    //Randimize indices of the array, and set array size
    setArray() {
        const array = [];
        const max = window.innerHeight * 0.85;
        const min = 7;
        const size = document.getElementById("size").value;

        if (!this.Sorted) {
            for (let i = 0; i < size; i++) {
                array.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }

            this.setState({ array });

            const arrayBars = document.getElementsByClassName('arrayBar');

            for (let j = 0; j < this.state.array.length; j++) {
                arrayBars[j].style.backgroundColor = this.blue;
            }
        }
    }

    mergeSort(){
        var arr = Object.assign([], this.state.array);
        
        MS.initialize(this.state.array);
        MS.mergeSort(0,this.state.array.length-1);

        this.state.array = arr;
        
        var animations = MS.animations;

        (async () => {
            this.isDisabled = true;
            for (let i = 0; i < animations.length; i++) {


                if (i % 2 === 0 && animations[i][0] !== animations[i][1]) {
                    arrayBars[animations[i][0]].style.backgroundColor = this.green;
                    arrayBars[animations[i][1]].style.backgroundColor = this.green;
                    await timeout(this.delay);

                    if (arr[animations[i][0]] > arr[animations[i][1]]) {
                        arrayBars[animations[i][0]].style.backgroundColor = this.red;
                        arrayBars[animations[i][1]].style.backgroundColor = this.red;
                        await timeout(this.delay);
                    }
                } else if (i % 2 === 1 && arr[animations[i - 1][0]] !== animations[i][1]) {

                    let k = i;
                    let [barIdx1, barIdx2] = animations[k - 1]

                    arr.splice(barIdx2, 1);
                    arr.splice(animations[k][0], 0, animations[i][1]);

                    this.setState(arr);
                    await timeout(this.delay);
                }
                changeAllColor(arr, this.blue);
            }

            await timeout(this.delay * 10);
            changeAllColor(arr, this.green);
            this.isDisabled = false;
            this.Sorted = true;
            this.forceUpdate();
        })();
    }

    quickSort(){
        var arr = Object.assign([], this.state.array);
        QS.quickSort(this.state.array, 0, this.state.array.length - 1);
        var animations = QS.exportAnimations();
        this.state.array = arr;

        (async () => {
            this.isDisabled = true;
            for (let i = 0; i < animations.length; ++i) {
                if (animations[i][2] === 'color') {
                    arrayBars[animations[i][0]].style.backgroundColor = this.green;
                    arrayBars[animations[i][1]].style.backgroundColor = this.green;
                } else if (animations[i][2] === 'revert') {
                    arrayBars[animations[i][0]].style.backgroundColor = this.blue;
                    arrayBars[animations[i][1]].style.backgroundColor = this.blue;
                } else {
                    arrayBars[animations[i][0]].style.backgroundColor = this.red;
                    arrayBars[animations[i][1]].style.backgroundColor = this.red;
                    await timeout(this.delay);
                    [arr[animations[i][0]], arr[animations[i][1]]] = [arr[animations[i][1]], arr[animations[i][0]]];
                    arrayBars[animations[i][0]].style.backgroundColor = this.blue;
                    arrayBars[animations[i][1]].style.backgroundColor = this.blue;

                }
                this.setState(arr)
                await timeout(this.delay);
            }

            changeAllColor(arr, this.green);
            this.isDisabled = false;
            this.Sorted = true;
            this.forceUpdate();
        })();
        
    }

    insertionSort() {
        var arr = Object.assign([], this.state.array);
        var animations = IS.insertionSort(this.state.array);
        this.state.array = arr;

        (async () => {
            this.isDisabled = true;
            for (let i = 0; i < animations.length; ++i) {
                if (animations[i][2] === 'color') {
                    arrayBars[animations[i][0]].style.backgroundColor = this.green;
                    arrayBars[animations[i][1]].style.backgroundColor = this.green;
                    await timeout(this.delay)
                } else if (animations[i][2] === 'revert') {
                    arrayBars[animations[i-1][0]].style.backgroundColor = this.blue;
                    arrayBars[animations[i-1][1]].style.backgroundColor = this.blue;
                    await timeout(this.delay)
                } else {

                    arrayBars[animations[i-2][0]].style.backgroundColor = this.red;
                    arrayBars[animations[i-2][1]].style.backgroundColor = this.red;
                    await timeout(this.delay)
                    arr[animations[i][0]] = animations[i][1];
                    this.setState(arr);
                    await timeout(this.delay)
                    arrayBars[animations[i-2][0]].style.backgroundColor = this.green;
                    arrayBars[animations[i-2][1]].style.backgroundColor = this.green;
                    await timeout(this.delay)
                    arrayBars[animations[i-2][0]].style.backgroundColor = this.blue;
                    arrayBars[animations[i-2][1]].style.backgroundColor = this.blue;

                    await timeout(this.delay);
                }
            }
            changeAllColor(arr, this.green);
            this.isDisabled = false;
            this.forceUpdate();
            this.Sorted = true;
        })();
        

    }

    bubbleSort() {
        var arr = Object.assign([], this.state.array);
        var animations = BS.bubbleSort(this.state.array);
        this.state.array = arr;

        (async () => {
            this.isDisabled = true;
            for (let i = 0; i < animations.length; i++) {

                if (animations[i][0] > -1) {
                    arrayBars[animations[i][0]].style.backgroundColor = this.green;
                    arrayBars[animations[i][1]].style.backgroundColor = this.green;
                    await timeout(this.delay);
                    arrayBars[animations[i][0]].style.backgroundColor = this.blue;
                    arrayBars[animations[i][1]].style.backgroundColor = this.blue;
                } else if(animations[i][0] === -1){
                    arrayBars[animations[i-1][0]].style.backgroundColor = this.red;
                    arrayBars[animations[i-1][1]].style.backgroundColor = this.red;
                    await timeout(this.delay);

                    let [bar1, bar2] = animations[i - 1];

                    arr[bar1] = animations[i + 1][0];
                    arr[bar2] = animations[i + 1][1];
                    this.setState(arr);
                    await timeout(this.delay);
                
                    arrayBars[animations[i-1][0]].style.backgroundColor = this.green;
                    arrayBars[animations[i-1][1]].style.backgroundColor = this.green;
                    await timeout(this.delay);
                    arrayBars[animations[i-1][0]].style.backgroundColor = this.blue;
                    arrayBars[animations[i-1][1]].style.backgroundColor = this.blue;

                    i += 1;
                } else {
                    arrayBars[animations[i][1]-1].style.backgroundColor = this.purple;
                    await timeout(this.delay);
                }
            }
            changeAllColor(arr,this.purple);
            await timeout(this.delay*10);

            changeAllColor(arr, this.green);
            this.isDisabled = false;
            this.Sorted = true;
            this.forceUpdate();         
        })();
        
        
    }

    getDelay(){
        this.delay = Math.abs(document.getElementById("delay").value)
    }

    reset(){
        this.Sorted = false;
        this.setArray();
    }

    render() {
        const {array} = this.state;
        return(
            <>  
                <header className="header">
                    <div className="innerHeader">
                        <div className="logoContainer">
                            <h1>Sorting<span>Algorithm</span></h1>
                        </div>
                        <div className="navBarContainer">

                            <div className="sliderContainer">
                                <html>Speed: </html> 
                                <input 
                                    disabled = {this.isDisabled} 
                                    type="range" 
                                    min="-60" 
                                    max="-1" 
                                    defaultValue="-30" 
                                    className='slider' 
                                    id="delay"
                                    onChange = {() => this.getDelay()}/>
                            </div>

                            <div className="sliderContainer">
                                <html>Size: </html> 
                                <input 
                                    disabled = {this.isDisabled} 
                                    type="range" 
                                    min="10" 
                                    max="60" 
                                    defaultValue="35" 
                                    className='slider' 
                                    id="size"
                                    onChange = {() => this.setArray()}/>
                                    
                            </div>
                            
                            

                            <button disabled = {this.isDisabled} className="mainBar-btn" onClick={() => this.reset()}>Reset</button>

                            <div className="dropdown">
                                <button className="drop-btn">Algorithm</button>
                                <div className="dropdown-content">
                                    <button disabled = {this.isDisabled} onClick = {() => this.mergeSort()}>Merge Sort</button>
                                    <button disabled = {this.isDisabled} onClick = {() => this.quickSort()}>Quick Sort</button>
                                    <button disabled = {this.isDisabled} onClick = {() => this.bubbleSort()}>Bubble Sort</button>
                                    <button disabled = {this.isDisabled} onClick = {() => this.insertionSort()}>Insertion Sort</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </header>

                <div className="arrayContainer">
                    {array.map((value) => (
                        <div 
                            className="arrayBar" style={{ height: `${value}px` }}>
                            <p className="dummyText">1</p>
                            {value}
                        </div>
                    ))}
                </div>

                <footer className="footerContainer"></footer>
            </>
        );
    }
}

function timeout(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

const arrayBars = document.getElementsByClassName('arrayBar');

function changeAllColor(arr,color) {
    for(let j = 0; j < arr.length; j++){
        arrayBars[j].style.backgroundColor = color;
    }  
}

export default SortingVisualizer;
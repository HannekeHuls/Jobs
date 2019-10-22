const canvas = document.getElementById("hexCanvas");
const ctx = canvas.getContext("2d");
const width = 50;
const height = 43.000;
const gridWidth = 10;
const gridHeight = 10;
const grid = [];

const makeCanvas = (width, height) => {
        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        return canvas;
    };

const drawCell = (context, x, y, fill) => {
    context.fillStyle = fill;

	context.beginPath();
	context.moveTo(x + width * 0.25, y);
	context.lineTo(x + width * 0.75, y);
	context.lineTo(x + width, y + height * 0.5);
	context.lineTo(x + width * 0.75, y + height);
	context.lineTo(x + width * 0.25, y + height);
	context.lineTo(x, y + height * 0.5);
	context.fill();
};

const renderGrid = (context, x, y) => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let gridY = 0; gridY < gridHeight; ++gridY) {
    	for (let gridX = 0; gridX < gridWidth; ++gridX) {
            drawCell(
                context,
                x + getHexX(gridX),
                y + getHexY(gridX, gridY),
                getCell(gridX, gridY).color);
        }
    }
};

const getCell = (x, y) => {
    return grid[x + y * gridWidth];
};

const getHexX = (gridX) => {
    return gridX * width * 0.75;
};

const getHexY = (gridX, gridY) => {
    return gridY * height + (gridX & 1) * (height / 2);
};      

let fertilizer = "#0066ff";//blauw
let plant = "#00cc00";//groen
let sand = "#f0fc05";//rood
let rabbit = "#f9f9f9";//geel

let typeArray = [fertilizer, plant, sand, rabbit];

let color = () => {
    return typeArray[Math.floor(Math.random()* typeArray.length)]
}

const fillGrid = () => {
    for (let i = 0; i < gridWidth * gridHeight; ++i){      
        grid.push(
            {"color": color()}
        )
    }
};

const up =(x, y) => {
    return checkIfIndexExists((x + y * gridWidth) - gridWidth);
}

const rightUp =(x, y) => {
    return checkIfIndexExists((x + y * gridWidth) + 1);
}

const rightDown =(x, y) => {
    return checkIfIndexExists((x + y * gridWidth) + gridWidth + 1);
}

const leftUp =(x, y) => {
    return checkIfIndexExists((x + y * gridWidth) - 1);
}

const leftDown =(x, y) => {
    return checkIfIndexExists((x + y * gridWidth) + gridWidth - 1);
}

const under =(x, y) => {
    return checkIfIndexExists((x + y * gridWidth) + gridWidth);
    }

const findNeighbours = () => {
    for (let gridY = 1; gridY < 7; ++gridY) {
        for (let gridX = 1; gridX < 29; ++gridX) {
            changeNeighbouringColors(neighbours(gridX, gridY));
        }
    }
    renderGrid(ctx, 0, 0);
}

const checkIfIndexExists = (index) => {
    if (index >= 0 && index < grid.length){
        return grid[index];
    }
}

const changeColor = (cell) => {
    if (cell.color == fertilizer){
        cell.color = plant;
    }
    //else if (cell.color == rabbit){
    //    cell.color = sand;
    //}
    return cell.color;
}

const neighbours = (x, y) => {
    let neighbours = [up(x,y),rightUp(x,y),rightDown(x,y),leftUp(x,y),leftDown(x,y),under(x,y)];
    return neighbours;
}

const getRandomNeighbour = (neighbours) => {
    return neighbours[Math.floor((Math.random() * neighbours.length))];
 }

const changeNeighbouringColors = (neighbourList) => {
    let randomNeighbour = getRandomNeighbour(neighbourList);
    changeColor(randomNeighbour);
}
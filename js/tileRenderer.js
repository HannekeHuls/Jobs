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

/*const addAlpha = (color, alpha) => {
    const hex = alpha.toString(16);
    const channel = hex.length === 1?"0" + hex:hex;

    return color + channel;
};*/

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

const fillGrid = () => {
    for (let i = 0; i < gridWidth * gridHeight; ++i){      
        grid.push(
            {"color": color()}
        )
    }
};

//TileRenderer.GRADIENT_STEPS = 18;
const NeighbouringPositions = function(x, y, gridY, gridX){

    const up =(x, y) => {
        return checkIfIndexExists((x + y * gridWidth) - gridWidth);
    };

    const rightUp =(x, y) => {
        return checkIfIndexExists((x + y * gridWidth) + 1);
    }

    const rightDown =(x, y) => {
        return checkIfIndexExists((x + y * gridWidth) + gridWidth + 1);
    };

    const leftUp =(x, y) => {
        return checkIfIndexExists((x + y * gridWidth) - 1);
    };

    const leftDown =(x, y) => {
        return checkIfIndexExists((x + y * gridWidth) + gridWidth - 1);
    };

    const under =(x, y) => {
        return checkIfIndexExists((x + y * gridWidth) + gridWidth);
    };

    const findNeighbours = () => {
        for (let gridY = 1; gridY < 7; ++gridY) {
            for (let gridX = 1; gridX < 29; ++gridX) {
                changeNeighbouringColors(neighbours(gridX, gridY));
            }
        }
        renderGrid(ctx, 0, 0);
    };

    const neighbours = (x, y) => {
        let neighbours = [up(x,y),rightUp(x,y),rightDown(x,y),leftUp(x,y),leftDown(x,y),under(x,y)];
        return neighbours;
    };
    
    const getRandomNeighbour = (neighbours) => {
        return neighbours[Math.floor((Math.random() * neighbours.length))];
     };
};
let color = () => {
    return ColorsLight[Math.floor(Math.random()* ColorsLight.length)]
}
    
const changeNeighbouringColors = (neighbourList) => {
    let randomNeighbour = getRandomNeighbour(neighbourList);
    changeColor(randomNeighbour);
};
    
const checkIfIndexExists = (index) => {
    if (index >= 0 && index < grid.length){
            return grid[index];
    }
};

const changeColor = (cell) => {
    if (cell.color == "#c4eded"){
        cell.color = "#72b5b5"
    }
    //else if (cell.color == rabbit){
    //     cell.color = sand;
    //}
    return cell.color;
};
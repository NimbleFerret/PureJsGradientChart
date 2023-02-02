const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const chartPositionsX = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
const chartPositionsY = [100, 60, 50, 100, 120, 200, 90, 160, 220, 300, 400, 350, 320, 300, 250, 100];

const maxHeight = 800, maxWidth = 800;
const lineWidthPixels = 1;

drawCoordinates();

for (let i = 0; i < chartPositionsX.length; i++) {
    const startCoords = i == 0 ? translateCoordinates(10, 5) : translateCoordinates(chartPositionsX[i - 1], chartPositionsY[i - 1]);
    const endCoords = translateCoordinates(chartPositionsX[i], chartPositionsY[i]);

    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(startCoords.x, startCoords.y);
    ctx.lineTo(endCoords.x, endCoords.y);
    ctx.stroke();

    const x1 = startCoords.x, x2 = endCoords.x;
    const y1 = startCoords.y, y2 = endCoords.y;
    const dx = x2 - x1;
    const dy = y2 - y1;
    let x = x1;
    let y = y1;

    do {
        drawVerticalLine(x, y);

        y = y1 + dy * (x - x1) / dx;
        x += 1;

    } while (x < x2)

}

function drawCoordinates() {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 800);
    ctx.lineTo(810, 800);
    ctx.stroke();
}

function drawVerticalLine(fromX, fromY) {
    const toX = fromX, toY = maxHeight;
    const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);

    gradient.addColorStop(0, "rgba(0, 0, 255, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 255, 0.1)");

    ctx.lineWidth = 2;
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}

function translateCoordinates(x1, y1) {
    return {
        x: x1,
        y: maxHeight - y1
    }
}
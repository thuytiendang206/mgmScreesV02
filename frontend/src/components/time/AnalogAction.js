import moment from 'moment-timezone';

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    // width of clockwise
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawFace(ctx, radius, colorBackground) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = colorBackground;
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, 'white');
    grad.addColorStop(1, 'white');
    ctx.strokeStyle = grad;
    // border btween border and background
    ctx.lineWidth = radius * 0.063;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.065, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.17 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius, utcDiff) {
    var formatH = 'HH';
    var formatM = 'mm';
    var formatS = 'ss';
    var hour = moment().utcOffset(utcDiff * 60).format(formatH);
    var minute = moment().utcOffset(utcDiff * 60).format(formatM);
    var second = moment().utcOffset(utcDiff * 60).format(formatS);
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.7, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.8, radius * 0.02);
}

function getBackGroundColor(time) {
    switch (true) {
        case (time >= 19 || time < 5):
            return "#1f252d";
        case (time >= 5 && time < 6):
            return "#263e66";
        case (time >= 6 && time < 18):
            return "#00a3cc";
        case (time >= 18 && time < 19):
            return "#263e66";
        default:
            return null;
    }
}

export function drawClock(ctx, radius, utcDiff) {
    drawFace(ctx, radius, getBackGroundColor(moment().utcOffset(utcDiff * 60).format("HH")));
    drawNumbers(ctx, radius);
    drawTime(ctx, radius, utcDiff);
}

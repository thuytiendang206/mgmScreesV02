export function getWindDegIcon(deg){
    switch (true) {
        case (deg >= 0 && deg < 23):
            return "towards-0-deg";
        case (deg >= 23 && deg < 45):
            return "towards-23-deg";
        case (deg >= 45 && deg < 68):
            return "towards-45-deg";
        case (deg >= 68 && deg < 90):
            return "towards-68-deg";
        case (deg >= 90 && deg < 113):
            return "towards-90-deg";
        case (deg >= 113 && deg < 135):
            return "towards-113-deg";
        case (deg >= 135 && deg < 158):
            return "towards-135-deg";
        case (deg >= 158 && deg < 180):
            return "towards-158-deg";
        case (deg >= 180 && deg < 203):
            return "towards-180-deg";
        case (deg >= 203 && deg < 225):
            return "towards-203-deg";
        case (deg >= 225 && deg < 248):
            return "towards-225-deg";
        case (deg >= 248 && deg < 270):
            return "towards-248-deg";
        case (deg >= 270 && deg < 293):
            return "towards-270-deg";
        case (deg >= 293 && deg < 313):
            return "towards-293-deg";
        case (deg >= 313 && deg < 336):
            return "towards-313-deg";
        case (deg >= 336):
            return "towards-336-deg";
        default: return "wi-small-craft-advisory";
    }
}

export function getBackgroundColor(temp){
    if (temp >= 30) {
        return 'very-warm';
    }
    else if (temp > 20 && temp <= 30) {
        return 'warm';
    }
    else if (temp > 10 && temp <= 20) {
        return 'normal';
    }
    else if (temp > 0 && temp <= 10) {
        return 'cold';
    }
    else if (temp <= 0) {
        return 'very-cold';
    }
}

export function convertCtoF(temp){
    return Math.round( (9/5)*temp +32 );
}
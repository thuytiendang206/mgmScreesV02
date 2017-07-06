const ratio = {
    HorizontalRatio: {
        analog: {
            minHeight: 1,
            width: 0.6
        },
        text: {
            width: 0.4,
            height: 1
        }
    },
    VerticalRatio: {
        analog: {
            minHeight: 0.7,
            width: 1
        },
        text: {
            width: 1,
            height: 0.3
        }
    },
    TimeFontSize: 0.05,
    DateFontSize: 0.05
}

export function getHorizontalLayoutStyle(width, height) {
    let styles = {
        clock: {
            display: 'flex',
            flexDirection: 'row',
            minHeight: `${height}px`,
            width: `${width}px`,
            margin: '0 auto',
            left: '0'
        },
        analog: {
            minHeight: `${ratio.HorizontalRatio.analog.minHeight * height}px`,
            width: `${ratio.HorizontalRatio.analog.width * width}px`
        },
        text: {
            width: `${ratio.HorizontalRatio.text.width * width}px`,
            height: `${ratio.HorizontalRatio.text.height * height}px`,
        },
        time: {
            fontSize: `${ratio.TimeFontSize * width}px`,
            margin: '0 auto',
            color: 'black'
        },
        date: {
            fontSize: `${ratio.DateFontSize * width}px`,
            margin: '0 auto',
            color: 'green'
        }
    };
    return styles;
}

export function getVerticalLayoutStyle(width, height) {
    let styles = {
        clock: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: `${height}px`,
            width: `${width}px`,
            margin: '0 auto',
            left: '0'
        },
        analog: {
            minHeight: `${ratio.VerticalRatio.analog.minHeight * height}px`,
            width: `${ratio.VerticalRatio.analog.width * width}px`
        },
        text: {
            width: `${ratio.VerticalRatio.text.width * width}px`,
            height: `${ratio.VerticalRatio.text.height * height}px`
        },
        time: {
            fontSize: `${ratio.TimeFontSize * width}px`,
            margin: '0 auto',
            color: 'black'
        },
        date: {
            fontSize: `${ratio.DateFontSize * width}px`,
            margin: '0 auto',
            color: 'green'
        }
    };
    return styles;
}
import { blue600 } from 'material-ui/styles/colors';
const styles = {
    floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 250,
        left: 'auto',
        position: 'fixed',
    },
    editButton: {
        fill: blue600
    },
    deleteButton: {
        fill: blue600
    },
    columns: {
        id: {
            width: '5%'
        },
        name: {
            width: '30%'
        },
        displayTime: {
            width: '10%'
        },
        screens: {
            width: '25%'
        },
        apps: {
            width: '20%'
        },
        action: {
            width: '10%'
        }
    }
};
export default styles;
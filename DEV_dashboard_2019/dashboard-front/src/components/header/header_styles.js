const style = {
    Core: {
        height: 70,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems:  'center'
    },
    Icon:{
        marginRight: 20,
        fontSize: 45,
        color: 'grey',
        '&:hover': {
            cursor: 'pointer',
            color: '#46494c',
        }
    },
    TitleHeader:{
        marginLeft: 20,
        fontSize: 60,
        color: 'white',
        fontFamily: 'Audiowide',
    },
    Core2: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#5E5E5E',
    },
    Icon2:{
        marginRight: 20,
        color: 'white',
        fontSize: 45,
    },
    dropdownContainer: {
        position: 'relative',
        padding: [10,0],
        zIndex: 9999
    },
    card: {
        padding:0,
        borderRadius:7,
    },
    cardItem: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: [10,20],
        margin:[2,4,2],
        cursor: 'pointer',
        borderRadius:7,
        '&:hover':{
            backgroundColor: '#eee'
        }
    },
    icon: {
        marginRight: 10,
        fontSize: 22,
        color: '#444',
    },
    text: {
        color: '#444',
        fontSize: 15
    }
};

export default style;

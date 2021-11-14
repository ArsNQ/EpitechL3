const style = {
    Core: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        color: 'white',
        backgroundColor: '#46494c',
        minHeight: 80,
    },
    myText: {
        fontFamily: 'Questrial',
        color: 'white',
        marginTop: 15,
        width: 200,
        fontSize: 14,
    },
    myLastText: {
        marginTop: 10,
    },
    myLastIcon: {
        marginTop: 8,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 25,
    },
    '@media screen and (max-width: 950px)': {
        Core: {
            flexDirection: 'column',
            alignItems: 'center'
        },
        myText: {
            marginTop: 20
        },
        myLastText: {
            marginTop:20,
            marginBottom: 30,
        },

    },
};

export default style;

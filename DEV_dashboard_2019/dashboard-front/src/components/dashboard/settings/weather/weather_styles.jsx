export default {
    subTitle: {
        fontSize: 25,
        marginLeft: 5
    },
    logo: {
        fontSize: 25,
        color: '#00BFFF'
    },
    sessionBloc: {
        display: 'flex',
        flexDirection: 'column',
        width: 400
    },
    switch: {
        marginLeft: 10,
        marginBottom: 9,
        marginTop: 10,
    },
    autoDropdown: {
        width: '100%',
        maxHeight: 300,
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar-track': {
            border: 0
        },
        '&::-webkit-scrollbar': {
            width: 5
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c0c0c0',
            borderRadius: 5
        },
        zIndex: 1
    },
    itemContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        padding: [10,20],
        margin:[2,4,2],
        cursor: 'pointer',
        borderRadius:7,
        fontSize: 14,
        '&:hover':{
            backgroundColor: '#eee'
        }
    },
    input: {
        marginTop: 10,
        marginBottom: 10,
        width: 300,
        height: 45,
        zIndex: 1
    },
    addCountryButtons: {
        display: 'inline-block',
        marginBottom:20
    },
    img: {
        width: 25,
        height: 25,
        marginBottom: 10,
    },
    sessionBloc2: {
        display: 'flex',
        margin: [10,0],
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
}

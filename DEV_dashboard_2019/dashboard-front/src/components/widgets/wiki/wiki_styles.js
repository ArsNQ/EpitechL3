export default {
    container: {
     height: '100%',
        width: '100%',
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
    },
    MiddleLine: {
        width: 200,
        border: '#ccc 1px solid',
        marginBottom: 10,
    },
    searchResultDiv: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myText: {
        fontWeight: 'bold',
        fontFamily: 'Questrial',
        fontSize: 20,
    },
    description: {
        fontFamily: 'Questrial',
        fontSize: 15,
    },
    searchBar: {
        border: 'none',
        fontSize: 20,
        fontFamily: 'Questrial',
        borderBottom: 'solid black 3px',
        marginLeft: -35,
        marginRight: 10,
        marginBottom: 10,
    },
    btnSearch: {
        fontFamily: 'Questrial',
        fontSize: 20,
        border: 'none',
        backgroundColor: 'transparent',
        width: 20,

    },

}

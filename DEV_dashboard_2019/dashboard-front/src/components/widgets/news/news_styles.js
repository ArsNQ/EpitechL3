export default {
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: [10,5,10],
        borderRadius: 20,
        height:'100%',
        width: '100%',
    },
    articles: {
        flex:1,
        scrollbarWidth: 'thin',
        overflowY: 'scroll',
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
    title: {
        fontSize: 23,
        fontWeight: 'bold',
        marginBottom: 20
    },
    article: {
        textAlign: 'left',
        margin: [25,15,0]
    },
    myTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333'
    },
    info: {
        marginTop: 15,
        display: 'flex',
        justifyContent: 'space-between'
    },
    myAuthor: {
        fontStyle: 'italic',
        fontSize: 16
    },
    divider: {
        marginTop: 15,
        height: 1,
        backgroundColor: "#eee"
    }
}

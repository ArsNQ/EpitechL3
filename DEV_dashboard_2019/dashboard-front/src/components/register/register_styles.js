export default {
    container: {
        minHeight: 'calc(100vh - 150px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer : {
        marginTop: 20,
        display: 'flex',
        flexDirection:  'column',
        alignItems:  'flex-start'
    },
    label: {
        fontFamily: "Questrial",
        fontSize: 18
    },
    input: {
        marginTop: 5,
        width: 300
    },
    innerInput : {
        padding: [8,15]
    },
    button: {
        marginTop: 30,
        marginBottom:10,
        fontFamily: 'Questrial'
    },
    linkContainer: {
      display: 'flex',
      flexDirection: 'column'
    },
    Text:{
        marginTop: 30,
        fontFamily: 'Questrial',
        fontSize: 17,
    },
    SubText:{
        fontFamily: 'Questrial',
        fontSize: 17,
    },
    loader: {
        marginTop: 30,
    },
    corePage: {
        display: 'flex',
        alignItems: 'center',
    },
    img: {
        marginTop: -100,
        width:500
    },
    middleLine : {
        height: 600,
        border: '1px solid #bbb',
        marginLeft: 40,
        marginRight: 40,
    },
    form: {
      width: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
        }
    },
    itemContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        padding: [10,20],
        margin:[2,4,2],
        cursor: 'pointer',
        borderRadius:7,
        '&:hover':{
            backgroundColor: '#eee'
        }
    },
    '@media screen and (max-width: 1000px)': {
        img: {
            marginTop: 0,
        },
        middleLine: {
            display: 'none',
        },
        container: {
            flexDirection: 'column',
        }
    },

}

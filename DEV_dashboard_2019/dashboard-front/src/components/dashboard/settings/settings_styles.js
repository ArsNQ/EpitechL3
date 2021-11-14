export default {
    text:{
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Questrial',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 50,
        flex: 1,
        overflowY: 'scroll',
        scrollbarWidth: 'thin',
        '&::-webkit-scrollbar-track': {
            border: 0
        },
        '&::-webkit-scrollbar': {
            width: 7
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#c0c0c0',
            borderRadius: 10
        },
    },
    service: {
        display: 'flex',
        alignItems: 'center'
    },
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
        marginLeft: '40%',
        marginRight: '40%',
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
        display: 'inline-block'
    },
    img: {
      width: 25,
      height: 25,
        marginBottom: 10,
    },
    logoGoogle:{
        fontSize: 25,
        color: '#4285f4',
    },
    logoCal:{
        fontSize: 25,
        color: '#ea4335',
    },
    imgW: {
        width: 35,
        height: 25,
        marginBottom: 10,
        marginLeft: -4,
    },
    vignette: {
        margin: [20,0],
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 400
    },
    LeftSide:{
      marginRight: 50,
    },
    RightSide: {
      marginLeft: 50,
    },
    container2: {
      display: 'flex',
    },
    MiddleLine: {
        height: 450,
        border: '2px solid #bbb',
        marginLeft: 40,
        marginRight: 40,
    },
}

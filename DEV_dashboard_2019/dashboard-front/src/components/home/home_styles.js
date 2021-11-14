const style = {
    CompoHome:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 150px)',
    },
    img: {
        height: 220,
    },
    CompoTitle:{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center'
    },
    Title:{
        marginTop: 20,
        fontSize: 85,
        color: 'black',
        fontFamily: 'Audiowide',
    },
    SubTitle:{
        paddingBottom: 25,
        fontSize: 37,
        color: '#46494c',
        width: 'calc(100% - 80px)',
        maxWidth: 1000,
        fontFamily: 'Questrial',
        borderBottom: '3px solid #46494c',
    },
    TopText:{
        marginTop: 25,
        color: '#46494c',
        fontSize: 28,
        fontFamily: 'Questrial',
        marginBottom: '1%',
    },
    Text:{
        color: '#1E1E1E',
        fontSize: 22,
        fontFamily: 'Questrial',
        textAlign: 'Center',
        marginLeft: '20%',
        marginRight: '20%',
        paddingBottom: '2%',
    }
};

export default style;

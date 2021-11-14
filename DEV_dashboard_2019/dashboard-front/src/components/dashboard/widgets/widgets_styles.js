export default ({
    container : {
        position: 'relative',
        display:'flex',
        flex:1,
        margin: 15,
        flexWrap: 'wrap',
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
    tets: {
        backgroundColor: 'red'
    },
    layout: {

    }
});

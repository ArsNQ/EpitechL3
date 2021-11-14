import React from 'react';
import styles from './basketheader.module.css'
import cookieManager from 'react-cookies';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Button, Grid } from '@material-ui/core';

const BasketHeader = ({ refreshCart }) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const eraseBasket = () => {
        cookieManager.save('basket', [], { path: '/' });
        refreshCart();
        handleClose();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm your choice
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={eraseBasket} color="secondary" variant="contained" autoFocus>
                        Throw basket
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={styles.container}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <h2 style={{textAlign: 'left', paddingLeft: '5%'}}>Basket</h2>
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>Throw basket</Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default BasketHeader;
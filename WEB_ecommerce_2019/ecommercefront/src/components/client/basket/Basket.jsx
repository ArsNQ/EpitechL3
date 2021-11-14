import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { Redirect } from 'react-router-dom';

import { Icon, Table, TableBody, TableCell, TableHead, TableRow, LinearProgress, Paper, Button, CircularProgress } from '@material-ui/core';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { makeStyles } from '@material-ui/core/styles';

import cookieManager from 'react-cookies';

import styles from './basket.module.css';
import apiManager from '../../../http/apiManager';
import { Link } from '@material-ui/core';


const AddressButton = () => {
  return (<Link classname="link" href='/profile'><Button variant="contained" color="primary" style={{marginTop: 10}}>Set my address to order</Button></Link>)
}

const LoginButton = () => {
  return (<Link className="link" href='/login'><Button variant="contained" color="primary" style={{marginTop: 10}}>Login to order</Button></Link>)
}

const PaypalButton = ({ invoiceTotal, onSuccess }) => {
  const paypal = {
    sandbox: 'ATEsHPH6d7l5UfbMZWapXjIsyKh_GKOFs_2OZkigQyhiUzA8_cGsGHybSM0yxG3Xmk4C7JKJezNlKOkv',
  };

  const purchaseSuccess = () => {
    onSuccess();
  }

  return (<PaypalExpressBtn env="sandbox" style={{size: 'responsive' }} client={paypal} currency="EUR" total={parseFloat(invoiceTotal.toFixed(2))} onSuccess={() => { purchaseSuccess() }} />);
}

const Basket = forwardRef((props, ref) => {
    const [articles, setArticles] = useState();
    const [products, setProducts] = useState(cookieManager.load('basket') || []);
    const [totalPrice, setTotalPrice] = useState();
    const [invoiceTaxes, setInvoiceTaxes] = useState();
    const [invoiceTotal, setInvoiceTotal] = useState();
    const [taxRate, setTaxRate] = useState();
    const [singleOccurence, setSingleOccurence] = useState([]);
    const [redirect, setRedirect] = useState();
    const [render, setRender] = useState(<CircularProgress />);
    const [loaded, setLoaded] = useState(false);

    // Paypal return when success
    
    const purchaseSuccess = useCallback((details) => {
      apiManager.getUser().then((res) => {
        console.log(res.data);
        const order = {
          userId: parseInt(res.data[0].id),
          date: new Date().toISOString(),
          status: 'pending',
          total: totalPrice.toString()
        }
        apiManager.createOrder(order).then((response) => {
          console.log(response.data.id);
          const uniqueProducts = products.filter((item, pos) => {
            return products.indexOf(item) === pos;
          })
          uniqueProducts.forEach((product) => {
            const item = {
              orderId: response.data.id,
              productId: product,
              quantity: getNbOccurence(products, product)
            }
            apiManager.createOrderItem(item);
          })
          cookieManager.save('basket', []);
          setRedirect('/success');
        })
      })
    }, [totalPrice, products]);

    // Check when pass order is clicked
    const checkLogin = useCallback(() => {
      let token = localStorage.getItem('access_token');
      let token_exp = localStorage.getItem('token_exp');

      if (token && token_exp) {
        token_exp = new Date(token_exp);
        if (token_exp > new Date()) {
          apiManager.getUser().then((res) => {
            if (res.data[0].address && invoiceTotal) {
              setLoaded(true);
              setRender(<PaypalButton invoiceTotal={invoiceTotal} onSuccess={() => {purchaseSuccess()}} />);
              return (true);
            }
            else if (loaded){
              setRender(<AddressButton />);
              return (false);
            }
          })
        } else {
          setRender(<LoginButton />);
          return (false);
        }
      } else {
        setRender(<LoginButton />);
      } 
    }, [invoiceTotal, loaded, purchaseSuccess])

    useEffect(() => {
        apiManager.getProducts().then((res) => {
            setArticles(res.data);

            setSingleOccurence(products.filter((val, index) => products.indexOf(val) === index));
            // Calc total price
            let tmp = 0;
            for (let i = 0; i < products.length; i += 1) {
                const [{ price }] = res.data.filter((val) => products[i] === val.id);
                tmp += parseFloat(price);
            }
            setTotalPrice(tmp.toFixed(2));

            // Calc Taxes & total taxes
            /* GET TAX RATE VIA API */   setTaxRate(0.20);
            setInvoiceTaxes(taxRate * totalPrice);
            setInvoiceTotal(parseFloat(invoiceTaxes) + parseFloat(totalPrice));
            checkLogin();
        })
      }, [invoiceTaxes, products, taxRate, totalPrice, invoiceTotal, checkLogin]);

      // Get occurences hits in array (integer returned)
      const getNbOccurence = (array, occu) => {
        let nb = 0;

        for (let i = 0; i < array.length; i += 1) {
          if (array[i] === occu) nb += 1;
        }
        return nb;
      };

      const removeProduct = useCallback((id) => {
        const tmp = [];

        products.forEach((product) => {
          if (product !== id) tmp.push(product);
        });

        cookieManager.save('basket', tmp, { path: '/' });
        setProducts(tmp);
      }, [products]);

      useImperativeHandle(ref, () => ({
        refreshView() {
          setProducts([]);
        }
      }));


    // JS Style for view
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '100%',
          marginTop: theme.spacing(3),
          overflowX: 'auto',
          marginBottom: theme.spacing(3)
        },
        table: {
          minWidth: 700,
          backgroundColor: "#ededed"
        }}
    ));

    const classes = useStyles();

   if (!redirect && products && invoiceTotal && render) {
     return (<>
               <div className={styles.content}>
                 <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                 <Paper className={classes.root}>
                   <Table className={classes.table} aria-label="spanning table">
                     <TableHead>
                       <TableRow>
                       <TableCell>Nom</TableCell>
                       <TableCell align="right">Quantité</TableCell>
                       <TableCell align="right">Prix unitaire</TableCell>
                       <TableCell align="right">Total</TableCell>
                       <TableCell align="right">Supprimer</TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                       {singleOccurence.map((product) => {
                       const [{ price, name, id }] = articles.filter((val) => product === val.id);
                       const nbOccu = getNbOccurence(products, id);
                       const totalArticlePrice = price * nbOccu;
 
                       return (<TableRow key={id}>
                                 <TableCell>{name}</TableCell>
                                 <TableCell align="right">{nbOccu}</TableCell>
                                 <TableCell align="right">{parseFloat(price).toFixed(2)}</TableCell>
                                 <TableCell align="right">{parseFloat(totalArticlePrice).toFixed(2)}</TableCell>
                                 <TableCell align="right"><div onClick={() => removeProduct(id)} className={styles.cursor}><Icon>delete</Icon></div></TableCell>
                               </TableRow>
                             );
                         })}
 
                       <TableRow>
                         <TableCell rowSpan={3} />
                         <TableCell colSpan={2}>Subtotal</TableCell>
                         <TableCell align="right">{totalPrice}</TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell>Tax</TableCell>
                         <TableCell align="right">{`${(taxRate * 100).toFixed(0)} %`}</TableCell>
                         <TableCell align="right">{parseFloat(invoiceTaxes).toFixed(2)}</TableCell>
                       </TableRow>
                       <TableRow>
                         <TableCell colSpan={2}>Total</TableCell>
                         <TableCell align="right">{parseFloat(invoiceTotal).toFixed(2)}</TableCell>
                       </TableRow>
                     </TableBody>
                   </Table>
               </Paper>
               { render }
             </div>
         </>
     )
   } else if (!redirect && products && products.length > 0) {
      return (<LinearProgress color="secondary" style={{marginTop: 20}} />);
   } else if (!redirect) {
     // Code no articles
     return (<div style={{marginTop: 20}}>
       <ErrorOutlineOutlinedIcon color="secondary" fontSize="large" style={{marginRight: 10}}/>No products
     </div>);
   } else {
     return (<Redirect to={{pathname: redirect}} />);
   }
})

export default Basket;

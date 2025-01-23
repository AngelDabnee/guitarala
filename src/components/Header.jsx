import {Fragment} from 'react'
import {React} from 'react'

export default function Header(){
    
    const name = "angel"
    const total = 100;

    return (
        <>
            <p>Total a pagar: {total}</p>
                    
        </>
        )

/* 
    return (
        <React>
            <p>Total a pagar: {total}</p>
            

        </React>
    ) */
    /* return (
        <Fragment>
            <p>Total a pagar: {total}</p>
            <p>algo bien </p>

        </Fragment>
        
    ) */

}


import { useEffect, useState } from 'react'
import "./product.css"
import {transform} from "./utils";
import { Product } from './world'
type ProductProps = {
    product: Product
    }

function ProductComponent({ product} : ProductProps) {
        return (
        <div>  
            <img  src={"http://localhost:4000/" + product.logo} className="round"/>
            <div className="lesdeux">
<div className="lepremier"> <span> {product.quantite} </span></div>
<div className="lesecond"> <span> {product.name} </span></div>
</div> </div>
)}
export default ProductComponent;
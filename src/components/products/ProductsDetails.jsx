import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, ShoppingCart, Truck, Shield, RotateCcw } from "lucide-react";
import SiteHeader from "../site-header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "./Loader";

const ProductsDetails = () => {
  const [products, setProducts] = useState(null);
  const [active, setActive] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
   async function getProduct(){
    setLoading(true)
    const response = await axios.get(`https://6a2258865c61035328699e51.mockapi.io/Products/${id}`).finally(()=>setLoading(false))
    setProducts(response.data)
  }

  useEffect(()=>{
    getProduct()
  },[])

  function toggle() {
    setActive(!active);
  }

  return (
    <>
      <SiteHeader title="Products Details" />
      
      {loading ? (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader />
        </div>
      ) : (
        <div className="min-h-screen bg-background px-4 py-12">
          <div className="max-w-6xl mx-auto">

            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left Column - Image */}
                  <div className="flex items-center justify-center bg-muted/40 p-8">
                    <img 
                      src={products?.image} 
                      alt={products?.title} 
                      className="w-full max-w-md h-auto object-contain transform transition-transform hover:scale-105 duration-300" 
                    />
                  </div>

                  {/* Right Column - Details */}
                  <div className="p-8 lg:p-10">

                    {/* Title */}
                    <h2 className="mb-3 text-3xl font-bold text-foreground lg:text-4xl">
                      {products?.name || products?.title}
                    </h2>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-4xl lg:text-5xl font-bold text-blue-500">
                        {products?.price}
                      </span>
                      <span className="ml-2 text-muted-foreground">Rs</span>
                    </div>
                    
                    {/* Description */}
                    <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                     {products?.description}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Truck className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">Free Shipping</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Shield className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">2 Year Warranty</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <RotateCcw className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">30 Day Returns</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Heart className="w-5 h-5 text-blue-500" />
                        <span className="text-sm">Secure Payment</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <Button 
                        size="lg" 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={toggle} 
                        className="hover:border-red-500 hover:bg-red-500/10"
                      >
                        {active ? 
                          <Heart className="h-5 w-5 fill-red-500 text-red-500" /> : 
                          <Heart className="h-5 w-5 text-muted-foreground" />
                        }
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsDetails;

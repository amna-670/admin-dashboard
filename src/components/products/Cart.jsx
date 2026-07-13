import { useEffect, useState } from "react"
import SiteHeader from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

    useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!currentUser) {
        navigate('/login')
      }
    }, [navigate])
  

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  function handleRemove(id) {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    toast.success("Item removed from cart")
  }

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0)

  return (
    <>
      <SiteHeader title="Cart" />
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-muted-foreground text-sm">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map(item => (
                <Card key={item.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name || item.title}
                        className="h-16 w-16 object-contain"
                      />
                      <div>
                        <p className="font-semibold">{item.name || item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.price} Rs</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemove(item.id)}
                      className="hover:border-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold text-blue-500">{total} Rs</span>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
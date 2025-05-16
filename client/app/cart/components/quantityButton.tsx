'use client'


interface QuantityButtonProps{
productId:string
quantity:number
refreshCart: ()=>void
setCart: (cart: CartItem[]) => void
cart:CartItem[]
loading2?:boolean
}


export default function  QuantityButton({productId,quantity,refreshCart,cart,setCart,loading2}:QuantityButtonProps) {
    
 const getQuantity=async()=>{
 try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getProductQuantity/${productId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', 
          },

      
         
        });
        const data =await res.json()
       
    
    
        if (!res.ok) {
          return
        } 

      const availableQuantity = data.quantity;
      return availableQuantity
      } catch (err) {
        console.log(err);
        
      }
 }
  const handleIncrease = async (productId:string) => {
    if(localStorage.getItem('isLogged')==='true'){
    try{

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/increaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ productId }),
         
        });
        const data =await res.json()
        
    
    
        if (res.ok) {
          refreshCart()
   
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.log(err);
        
      }
    }
    else{
 

    const existingItem = cart.find(item => item.productId._id === productId);
        const availableQuantity = await getQuantity()
       if(!availableQuantity){
        alert('something went wrong try again later')
        return
       }
    if (existingItem) {
    if(availableQuantity < existingItem.quantity + 1){
      alert(`you can just add ${availableQuantity} items`)
    return}
      existingItem.quantity += 1;
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));


    refreshCart();
    }
      }

  const handleDecrease=async(productId:string)=>{   
   
    if(localStorage.getItem('isLogged')==='true'){ 
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/decreaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ productId }),
        });
      

        if (res.ok) {
       
          refreshCart();
          
        } else {
          alert('failed');
        }
      } catch (err) {
        console.log(err);
        
      }
      

      }
      else{
          let newCart=cart
        const existingItem = cart.find(item => item.productId._id === productId);
  
        if (existingItem) {
          if(existingItem.quantity>1){
                
            existingItem.quantity -= 1;
          }
          else{
             newCart = cart.filter(item => item.productId._id !== productId);
          }
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
    
    setCart(newCart)
   
        refreshCart();
      
      }
 

      }
    
  return (
    <>
    <div className="w-full flex justify-between py-1 px-2 rounded-2xl border-2 border-amber-600  ">
              
    <button onClick={()=>{handleIncrease(productId)}} className="cursor-pointer">+</button>
        <p>  
    {loading2 ? (<> <h1 onClick={(e) => {  e.preventDefault()}} className=" "> loading...</h1></>):(
< > {quantity}</>)}
      
     </p>
    <button onClick={()=>{handleDecrease(productId)}}  className="cursor-pointer">-</button>
  </div>
 </> 
 );
}
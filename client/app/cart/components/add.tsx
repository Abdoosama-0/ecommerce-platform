'use client'


interface AddProps{
productId:string
quantity:number
refreshCart: ()=>void
setCart: (cart: CartItem[]) => void
cart:CartItem[]
loading2?:boolean
}


export default function  Add({productId,quantity,refreshCart,cart,setCart,loading2}:AddProps) {
    const url = "http://localhost:3000";

  const handleIncrease = async (productId:string) => {
    if(localStorage.getItem('isLogged')==='true'){
    try{

        const res = await fetch(`${url}/increaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // تأكد من إرسال البيانات بصيغة JSON
          },
          body: JSON.stringify({ productId }),
         
        });
        
    
    
        if (res.ok) {
          refreshCart()
   
        } else {
          alert('failed');
        }
      } catch (err) {
        console.log(err);
        
      }
    }
    else{

  

    const existingItem = cart.find(item => item.productId._id === productId);
  
    if (existingItem) {
    
      existingItem.quantity += 1;
    }
    localStorage.setItem('cart', JSON.stringify(cart));


    refreshCart();
    }
      }

  const handleDecrease=async(productId:string)=>{   
   
    if(localStorage.getItem('isLogged')==='true'){ 
    try{
        const res = await fetch(`${url}/decreaseQuantity`, {
          method: 'PATCH',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json', // تأكد من إرسال البيانات بصيغة JSON
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
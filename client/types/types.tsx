  type address = {
    government: string,
    city: string,
    area: string,
    street: string,
    buildingNumber: Number,
    departmentNumber: Number,
    _id:string
  }

  type userData = {
    username: string,
    email: string,
    name: string,
    isAdmin: Boolean,
    phone: string,
    addresses: address[]
  }

    type CartItem = {
      productId: {
        _id: string,
        imageUrls: string[],
        title: string,
        price: number
        quantity: number
      }
      quantity: number;
    }

     type productDetails={
        imageUrls: string[];
        _id: string;
        title: string;
        details: string;
        price: number;
        category: string;
        quantity:number
       
      }
           type adminProductResponse = {
              message: string;
              products: productDetails[];
              currentPage: number;
              totalPages: number;
              totalProducts: number;
            };
     

  
            
                type Order ={
                    _id: string;
                    userId: {
                      _id: string;
                      name: string;
                      email: string;
                      phone: string;
                    };
                    products: {
                      productId: {
                        _id: string;
                        title: string;
                        price: number;
                        imageUrls: string[];
                      };
                      quantity: number;
                      _id: string;
                    }[];
                    createdAt: string;
                    totalQuantity: number;
                    totalPrice: number; 
                    address:address;
                    status: string;
                  }
            type userType = {
          
              _id: string;
              name: string;
              email: string;
              phone: string;
              address: string;
              isBanned: boolean;
             
              isAdmin: boolean;
            };
          
            type responseType = {
              message: string;
              usersCount: number;
              users: userType[];
            };

            // interface BuyCartItem {
            //   productId: string;
            //   quantity: number;
            // }
            
            interface BuyCartFormProps {
              items: any;//BuyCartItem[]
              totalPrice: number
              products: number
              clearCart: () => void
              clicked: boolean
              setClicked: (arg0: boolean) => void
            }
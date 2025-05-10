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
        imageUrls: [string],
        title: string,
        price: number
      }
      quantity: number;
    }

     type productDetails={
        imageUrls: string[];
        // حسب شكل المنتج في قاعدة البيانات
        _id: string;
        title: string;
        details: string;
        price: number;
        category: string;
        // ضيف باقي الخصائص لو فيه أكتر
      }
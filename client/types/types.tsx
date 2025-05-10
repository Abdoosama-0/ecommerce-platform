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
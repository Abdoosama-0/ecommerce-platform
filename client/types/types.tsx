  type address = {
    government: string,
    city: string,
    area: string,
    street: string,
    buildingNumber: string,
    departmentNumber: string,
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
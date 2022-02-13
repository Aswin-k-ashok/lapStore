import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    phone: 1234567890,
    isAdmin: true,
  },

  {
    name: 'Aswin',
    email: 'aswin@gm.com',
    phone: 1234567890,
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Asok',
    email: 'asok@gm.com',
    phone: 1234567890,
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users

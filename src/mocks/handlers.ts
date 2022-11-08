import { graphql } from 'msw'
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';
import { GET_CART, ADD_CART, CartType } from './../graphql/cart';

const mockProducts = (() => Array.from({length: 20}).map((_, i) => ({
    id: i+1+'',
    imageUrl: `https://placeimg.com/200/150/${i+1}`,
    price: 50000,
    title: `임시상품${i+1}`,
    description: `임시상세내용${i+1}`,
    createdAt: new Date(1645735501883 + i * 1000 * 60 * 60 * 10).toString(),
  })))()

  let cartData:{[key: string]: CartType} = (()=> ({}))() // 서버로 갈것이기 때문에 객체를 써야됨
  // ADD_CART 할때마다

export const handlers = [
  graphql.query(GET_PRODUCTS, (req, res, ctx)=>{
    return res(
      ctx.data({ 
        products: mockProducts,
      }),
    )
  }),
  graphql.query(GET_PRODUCT, (req, res, ctx) => {
    const found = mockProducts.find(item => item.id === req.variables.id) // body생략가능
    if(found) return res(ctx.data(found))
    return res()
  }),
  graphql.query(GET_CART, (req, res, ctx) => {
    return res(ctx.data(cartData))
  }),
  graphql.mutation(ADD_CART, (req, res, ctx) => {
    const newData = { ...cartData }
    const id = req.variables.id
    if (newData[id]) {
      newData[id] = {
        ...newData[id],
        amount: (newData[id].amount || 0) + 1,
      }
    } else {
      const found = mockProducts.find(item => item.id === req.variables.id)
      if (found) {
        newData[id] = {
          ...found,
          amount: 1,
        }
      }
    }
    cartData = newData
    // console.log('여기', newData[id])

    return res(ctx.data(newData))
  }),
]
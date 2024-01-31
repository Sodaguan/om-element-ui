import axios from 'axios'

export function testFn(a: number, callback: Function) {
  if (a > 10) {
    callback(a)
  }
}

export async function request() {
  const { data } = await axios.get('fake.url')
  return data
}

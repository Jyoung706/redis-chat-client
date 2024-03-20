import SecureLS from 'secure-ls'

const ls = new SecureLS({
  encodingType: 'aes',
  encryptionNamespace: 'secureLocalStorage'
})

export const secureStorage = {
  setItem(key, value) {
    ls.set(key, JSON.stringify(value))
  },
  getItem(key) {
    const data = ls.get(key)
    return data ? JSON.parse(data) : null
  },
  removeItem(key) {
    ls.remove(key)
  },
  clearItem() {
    ls.clear()
  }
}

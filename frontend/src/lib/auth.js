class Auth {
  static setToken(token) {
    localStorage.setItem('token', token) 
  }
  static getToken() {
    return localStorage.getItem('token')
  }
  static logout() {
    localStorage.removeItem('token')
  }
  static getPayLoad() {
    const token = this.getToken()
    if (!token) return false 
    const parts = token.split('.')
    if (parts.length < 3) return false
    return JSON.parse(atob(parts[1]))
  }

  static isAuthenticated() {
    const payload = this.getPayLoad()
    if (!payload) return false 
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp 
    
  }

}
export default Auth 
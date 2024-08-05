export class CustomURL {
    constructor(base, path, params = {}) {
      this.url = new URL(path, base);
      Object.keys(params).forEach(key => this.url.searchParams.append(key, params[key]));
    }
  
    getUrl() {
      return String(this.url.href);
    }
  }
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios'

export interface ClientAPIConfig extends AxiosRequestConfig {
}

export default class API {
  private config: ClientAPIConfig

  private defaultConfig = {
    returnRejectedPromiseOnError: true,
    withCredentials: false,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }

  private api: AxiosInstance;

  constructor(config: ClientAPIConfig) {
    this.config = {
      ...this.defaultConfig,
      ...config
    }
    console.log('config: ', config)
    this.api = axios.create(this.config)
  }

  get client() {
    return this.api
  }

  _data(resp: AxiosResponse) {
    return resp.data
  }

}
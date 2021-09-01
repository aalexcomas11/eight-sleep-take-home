import API from './API'

class SleepSessionAPI extends API{
  /**
   * Get sleep sessions for all users
   */
  getSleepSession(id: string) {
    return this.client(`/eight-public/challenge/${id}.json`)
  }
}

const baseURL = process.env.REACT_APP_SLEEP_SESSION_BASE_URL
// singleton
export default new SleepSessionAPI({ baseURL: baseURL})

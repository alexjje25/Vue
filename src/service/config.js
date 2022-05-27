const instance = axios.create({
    baseURL: "https://api.hello.com",
    headers: {
      "X-API-KEY": "hello"
    }
  })
  const res = await instance.get<{}, AxiosResponse<string>>("/world");
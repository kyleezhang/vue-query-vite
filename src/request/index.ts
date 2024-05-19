const BASE_URL = 'http://127.0.0.1:4523/m1/4513833-4161206-default'

export const getPetList = async (page: number, pageSize: number) => {
    const params = new URLSearchParams()
    params.append('page', JSON.stringify(page))
    params.append('pageSize', JSON.stringify(pageSize))
    const res = await (await fetch(`${BASE_URL}/pets?${encodeURIComponent(params.toString())}`, { method: 'GET' })).json()
    if (res.status >= 0) {
        return res.data
    } else {
        throw new Error()
    }
} 
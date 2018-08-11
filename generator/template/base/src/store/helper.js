import Api from '@/services'

const isDev = process.env.NODE_ENV !== 'production'

export const actionHelper = (api) => {
  let service = Api[api] || {}
  if (isDev) {
    service = new Proxy(service, {
      get(target, name) {
        if (target.hasOwnProperty(name)) {
          return target[name]
        }
        throw new Error(`no method ${name} in service ${api}`)
      }
    })
  }
  return (action, mutation = () => {}) => {
    if (typeof action === 'string') {
      return async (context, params) => {
        const response = await service[action](params)
        const changeResponse = mutation(context, response)
        return changeResponse || response
      }
    } else if (Array.isArray(action)) {
      return action.reduce((result, current) => {
        result[current] = async (context, params) => {
          const response = await service[current](params)
          return response
        }
        return result
      }, {})
    } else if (Object.prototype.toString.call(action) === '[object Object]') {
      return Object.keys(action).reduce((result, current) => {
        result[current] = async (context, params) => {
          const response = await service[current](params)
          const changeResponse = typeof action[current] === 'function' ? action[current](context, response) : undefined
          return changeResponse || response
        }
        return result
      }, {})
    } else {
      return mutation
    }
  }
}

export const mutationHelper = (mutation) => {
  if (typeof mutation === 'string') {
    return (state, value) => {
      state[mutation] = value
    }
  } else if (Array.isArray(mutation)) {
    return mutation.reduce((result, current) => {
      result[current] = (state, value) => {
        state[current] = value
      }
      return result
    }, {})
  }
}

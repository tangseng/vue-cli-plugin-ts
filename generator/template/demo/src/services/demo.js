export default serviceHelper => ({
  ...serviceHelper({
    get: {
      xxx: '/xxx',
      yyy: () => {
        return new Promise(resolve => {
          setTimeout(_ => resolve('demo test'), 3000)
        })
      }
    },

    post: {

    }
  })
})
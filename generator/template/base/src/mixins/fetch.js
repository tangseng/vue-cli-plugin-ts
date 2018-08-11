export default (which) => ({
  data() {
    return {
      [`${which}`]: {
        loading: false,
        params: {},
        columns: [],
        data: [],
        pagination: {
          current: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },

  created() {
    typeof this[`${which}Columns`] && (this[`${which}`].columns = this[`${which}Columns`]())
    this[`${which}Fetch`]()
  },

  methods: {
    async [`${which}Fetch`]() {
      const $which = this[`${which}`]
      $which.loading = true

      const pagination = $which.pagination
      const params = {
        current: pagination.current,
        size: pagination.pageSize,
        ...($which.params || {})
      }
      const result = await this[`${which}FetchList`](params)
      const { data, total } = result
      $which.data = data
      pagination.total = total

      $which.loading = false

      return result
    },

    [`${which}ShowBeforeTotal`](total, pageSize, totalPage, pageNo, range) {
      return `共${total}条，每页显示${pageSize}条`
    },

    [`${which}Change`](pageNo, pageSize) {
      const pagination = this[`${which}`].pagination
      pagination.current = pageNo
      pagination.pageSize = pageSize
      this[`${which}Fetch`]()
    }
  }
})
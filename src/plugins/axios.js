export default function ({ $axios, redirect }) {
  $axios.onResponse((res) => {
    if (res.data !== undefined && res.data !== null) {
      if (res.data.code !== undefined && res.data.code !== null && res.data.code === 2000) {
        redirect('/admin/login')
      }
    }
  })
}

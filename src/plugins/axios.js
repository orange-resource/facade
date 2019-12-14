export default function ({ $axios, redirect }) {
  $axios.onResponse((res) => {
    if (res.data.code === 2000) {
      redirect('/admin/login')
    }
  })
}

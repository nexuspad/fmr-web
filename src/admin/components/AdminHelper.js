import AdminService from '../service/AdminService'

export default {
    data() {
        return {
          userEmail: '',
          userAds: []
        }
      },
    methods: {
        setUserEmail(email) {
            this.userEmail = email
        },
        impersonate(email) {
          const self = this
          AdminService.impersonate(email)
          .then((user) => {
            const win = document.getElementsByTagName('iframe')[0].contentWindow;
            win.postMessage(JSON.stringify({key: 'token', data: user.token}), "*");
            self.token = user.token
            self.message = 'You are logged in as ' + email
          })
          .catch((error) => {
            alert(error)
          })
        }
    }
}
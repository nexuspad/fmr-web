import AdminService from '../service/AdminService'

export default {
    data() {
        return {
          userEmail: '',
          userAds: []
        }
      },
    methods: {
        setUserEmail(email, event) {
            this.userEmail = email
            if (event) {
              var range = document.createRange();
              range.selectNodeContents(event.target);
              var sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);

              document.execCommand("copy");  
            }
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
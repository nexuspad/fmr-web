import AccessDenied from './AccessDenied'
import AboutUs from './AboutUs'
import Tos from './Tos'
import Faq from './Faq'
import ContactUs from './ContactUs'
import PrivacyPolicy from './PrivacyPolicy'

export default class MiscRoute {
    static routes() {
        return [
            {
                path: '/site/accessdenied',
                component: AccessDenied
            },
            {
                path: '/site/aboutus',
                component: AboutUs
            },
            {
                path: '/site/faqs',
                component: Faq
            },
            {
                path: '/site/contactus',
                component: ContactUs
            },
            {
                path: '/site/termsofservice',
                component: Tos
            },
            {
                path: '/site/privacypolicy',
                component: PrivacyPolicy
            }
        ]
    }
}
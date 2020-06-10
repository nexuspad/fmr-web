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
                component: AboutUs,
                meta: {
                    title: 'About FindMyRoof',
                }
            },
            {
                path: '/site/faqs',
                component: Faq,
                meta: {
                    title: 'FAQs',
                }
            },
            {
                path: '/site/contactus',
                component: ContactUs,
                meta: {
                    title: 'Contact us',
                }
            },
            {
                path: '/site/termsofservice',
                component: Tos,
                meta: {
                    title: 'Terms of service',
                }
            },
            {
                path: '/site/privacypolicy',
                component: PrivacyPolicy,
                meta: {
                    title: 'Privacy policy',
                }
            }
        ]
    }
}
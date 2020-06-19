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
                component: AccessDenied,
                meta: {
                    title: 'Service Not Available',
                    activity: 'site'
                }
            },
            {
                path: '/site/aboutus',
                component: AboutUs,
                meta: {
                    title: 'About FindMyRoof',
                    activity: 'site'
                }
            },
            {
                path: '/site/faqs',
                component: Faq,
                meta: {
                    title: 'FAQs',
                    activity: 'site'
                }
            },
            {
                path: '/site/contactus',
                component: ContactUs,
                meta: {
                    title: 'Contact Us',
                    activity: 'site'
                }
            },
            {
                path: '/site/termsofservice',
                component: Tos,
                meta: {
                    title: 'Terms of Service',
                    activity: 'site'
                }
            },
            {
                path: '/site/privacypolicy',
                component: PrivacyPolicy,
                meta: {
                    title: 'Privacy Policy',
                    activity: 'site'
                }
            }
        ]
    }
}
import ContactForm from "./ContactForm"
import { Phone, Mail, MapPin } from "lucide-react"

const Contact = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Quick Contact Options */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-600">Call Us</p>
                  <a
                    href="tel:+9779810350199"
                    className="text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    (977) 9810350199
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600">Email Us</p>
                  <a
                    href="mailto:info@bitebuddy.com.np"
                    className="text-gray-800 hover:text-amber-600 transition-colors"
                  >
                    info@bitebuddy.com.np
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600">Visit Us</p>
                  <p className="text-gray-800">123 Food Street, Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-amber-800 mb-2">Send us a Message</h4>
              <p className="text-amber-600">Fill out the form below and we'll get back to you soon</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

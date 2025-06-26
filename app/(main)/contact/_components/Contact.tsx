import ContactForm from "./ContactForm"
import { Phone, Mail, MapPin } from "lucide-react"

const Contact = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Quick Contact Options */}
          <div className="space-y-8">

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-200">
              <h4 className="text-xl font-bold text-amber-800 mb-6">Quick Contact Options</h4>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 bg-amber-50/50 rounded-xl p-4 hover:bg-amber-100/50 transition-all duration-200 cursor-pointer group">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-amber-800 font-bold text-lg">Call Us</p>
                    <a
                      href="tel:+9779810350199"
                      className="text-amber-600 text-base hover:text-amber-800 transition-colors"
                    >
                      (977) 9810350199
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-blue-50/50 rounded-xl p-4 hover:bg-blue-100/50 transition-all duration-200 cursor-pointer group">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-amber-800 font-bold text-lg">Email Us</p>
                    <a
                      href="mailto:info@bitebuddy.com.np"
                      className="text-amber-600 text-base hover:text-amber-800 transition-colors"
                    >
                      info@bitebuddy.com.np
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4 bg-green-50/50 rounded-xl p-4 hover:bg-green-100/50 transition-all duration-200 cursor-pointer group">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-lg">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-amber-800 font-bold text-lg">Visit Us</p>
                    <p className="text-amber-600 text-base">Mhepi, Kathmandu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-amber-200">
              <h4 className="text-lg font-bold text-amber-800 mb-4">Business Hours</h4>
              <div className="space-y-2 text-amber-700">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-semibold">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday - Sunday:</span>
                  <span className="font-semibold">10:00 AM - 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-amber-200">
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

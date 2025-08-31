
import { Briefcase } from "lucide-react";


const Footer = () => {
  return (
   <section className="py-10 bg-gradient-to-r from-sky-500 to-violet-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start a New Career?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join thousands of professionals who have found their dream roles.
          </p>
          

          <div className="flex flex-col items-center gap-5">
            <div className="flex items-center gap-3">
            </div>
            <div className="max-w-2xl text-left bg-white/10 border border-white/20 rounded-xl p-4 backdrop-blur">
              <p className="text-sm text-white/90 leading-relaxed">
                <span className="font-semibold">Anti-fraud notice:</span> We never charge recruitment fees,
                ask for OTP codes, or request sensitive data outside a normal hiring process.
                Ignore any transfer requests and report suspicious postings immediately.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Footer;
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Users, Briefcase, Star } from "lucide-react";
import headerImage from "../assets/image/header.jpg"; 


const Hero = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-10">
          <div className="grid grid-cols-1  gap-12 items-center">
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block font-semibold rounded-lg px-2 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                    Leading Career Platform
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Find Your {" "}
                  <span className="bg-gradient-to-r from-sky-500 to-violet-600 bg-clip-text text-transparent">
                    Dream
                  </span>{" "}
                  Career
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                  Connecting top talents with leading companies in Indonesia. Thousands of job opportunities await you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/vacancy">
                  <button className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition">
                    Browse Jobs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">
                    1000+ Talents
                  </span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">
                    500+ Companies
                  </span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">
                    4.8 Start
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img
                    src={headerImage}
                    alt="Professional team working together"
                    className="w-full h-30 lg:h-[450px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-background to-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-block font-semibold rounded-lg px-2 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  About Us                
                  </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                  Building Bridges Between
                  <span className="bg-gradient-to-r from-sky-500 to-violet-600 bg-clip-text text-transparent"> Talent & Opportunity</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  NextCareer was founded with a simple yet powerful mission: to connect Indonesia’s best talent
                  with the right companies. We believe everyone deserves a job that offers not only a paycheck
                  but also meaning and career growth.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Since 2020, we’ve helped thousands of professionals land their dream roles and supported
                  hundreds of companies in finding the talent they need to grow.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-8 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To become Indonesia’s #1 career platform that connects talent with the best opportunities
                      to build a brighter future.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                      Provide a simple, safe, and effective platform to connect job seekers and companies
                      through leading technology and services.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 border-0 bg-gradient-to-br from-card to-card/80 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="justify-center">
                    <Star className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Our Values</h3>
                    <p className="text-muted-foreground">
                      Integrity, innovation, and a commitment to delivering the best experience for every user
                      throughout their career journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose NextCareer?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A platform that connects top talent with the right career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Easy Process</h3>
              <p className="text-muted-foreground leading-relaxed">
                An intuitive interface makes searching and applying for jobs very easy
              </p>
            </div>

            <div className="text-center p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Trusted Companies</h3>
              <p className="text-muted-foreground leading-relaxed">
                Partnering with leading companies that offer high-quality careers
              </p>
            </div>

            <div className="text-center p-8 hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/80">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Diverse Roles</h3>
              <p className="text-muted-foreground leading-relaxed">
                From entry-level to executive, find positions that match your experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
    
  );
};

export default Hero;

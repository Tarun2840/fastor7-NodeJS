import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, ClipboardList, Building2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CRM System
              </h1>
            </div>
            <div className="flex gap-3">
              {isLoggedIn ? (
                <Button onClick={() => navigate("/dashboard")}>
                  Go to Dashboard
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button onClick={() => navigate("/register")}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-5xl font-bold tracking-tight">
            Modern Lead Management
            <span className="block mt-2 bg-gradient-primary bg-clip-text text-transparent">
              Made Simple
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline your customer relationships with our powerful CRM system. 
            Capture, manage, and convert leads efficiently.
          </p>
          <div className="flex gap-4 justify-center pt-6">
            <Button size="lg" onClick={() => navigate("/enquiry")}>
              Submit Enquiry
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <UserPlus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Easy Registration</CardTitle>
              <CardDescription>
                Quick and secure employee registration with JWT authentication
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <ClipboardList className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>
                Capture leads through public forms and manage them efficiently
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <CardTitle>Smart Claims</CardTitle>
              <CardDescription>
                Claim leads and convert public enquiries to private leads
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto bg-gradient-primary text-primary-foreground border-0">
          <CardContent className="p-12 text-center space-y-6">
            <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Join our CRM system today and start managing your leads more effectively.
              Simple, secure, and powerful.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/register")}
              >
                Register as Counselor
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => navigate("/enquiry")}
              >
                Submit Enquiry
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 CRM System. Built with Express.js, Node.js & React.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

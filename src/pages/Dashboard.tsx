import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building2, LogOut, Users, UserCheck } from "lucide-react";
import LeadCard from "@/components/LeadCard";

interface Lead {
  id: number;
  name: string;
  email: string;
  courseInterest: string;
  phone?: string;
  claimed: boolean;
  createdAt: string;
}

interface User {
  name: string;
  email: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [publicLeads, setPublicLeads] = useState<Lead[]>([]);
  const [privateLeads, setPrivateLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(userData));
    fetchLeads();
  }, [navigate]);

  const fetchLeads = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // Fetch public leads
      const publicResponse = await fetch("http://localhost:3000/api/enquiries/public", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Fetch private leads
      const privateResponse = await fetch("http://localhost:3000/api/enquiries/private", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (publicResponse.ok) {
        const publicData = await publicResponse.json();
        setPublicLeads(publicData);
      }

      if (privateResponse.ok) {
        const privateData = await privateResponse.json();
        setPrivateLeads(privateData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch leads. Make sure the backend is running.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (leadId: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:3000/api/enquiries/${leadId}/claim`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Lead claimed successfully",
        });
        fetchLeads(); // Refresh the leads
      } else {
        toast({
          title: "Failed to claim",
          description: data.message || "This lead may already be claimed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim lead",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CRM Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Public Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publicLeads.length}</div>
              <p className="text-xs text-muted-foreground">
                Available to claim
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Leads</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{privateLeads.length}</div>
              <p className="text-xs text-muted-foreground">
                Claimed by you
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Leads Tabs */}
        <Tabs defaultValue="public" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="public">Public Leads</TabsTrigger>
            <TabsTrigger value="private">My Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="public" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Available Leads</CardTitle>
                <CardDescription>
                  These leads are available for you to claim
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {publicLeads.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No public leads available at the moment
                  </p>
                ) : (
                  publicLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onClaim={() => handleClaim(lead.id)}
                      showClaimButton
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="private" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Claimed Leads</CardTitle>
                <CardDescription>
                  Leads that you have claimed and are assigned to you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {privateLeads.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    You haven't claimed any leads yet
                  </p>
                ) : (
                  privateLeads.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;

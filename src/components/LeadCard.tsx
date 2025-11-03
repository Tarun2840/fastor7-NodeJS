import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, BookOpen, Calendar, UserPlus } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  courseInterest: string;
  phone?: string;
  claimed: boolean;
  createdAt: string;
}

interface LeadCardProps {
  lead: Lead;
  onClaim?: () => void;
  showClaimButton?: boolean;
}

const LeadCard = ({ lead, onClaim, showClaimButton = false }: LeadCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow border-2">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{lead.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={lead.claimed ? "default" : "secondary"}>
                {lead.claimed ? "Claimed" : "Available"}
              </Badge>
            </div>
          </div>
          {showClaimButton && onClaim && (
            <Button onClick={onClaim} size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Claim
            </Button>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{lead.email}</span>
          </div>

          {lead.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{lead.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>{lead.courseInterest}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground pt-2 border-t">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">{formatDate(lead.createdAt)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadCard;

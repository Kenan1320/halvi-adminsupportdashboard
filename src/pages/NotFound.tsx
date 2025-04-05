
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft, AlertTriangle, ExternalLink } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background islamic-pattern p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-gradient-halvi flex items-center justify-center animate-pulse">
            <AlertTriangle className="h-12 w-12 text-white animate-bounce" />
          </div>
        </div>

        <h1 className="text-7xl font-bold mb-4 text-gradient animate-fade-in">404</h1>
        <h2 className="text-2xl font-semibold mb-2 animate-slide-in">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 animate-fade-in">
          The page you were looking for doesn't exist or has been moved.
          You might have mistyped the address or the page may have been relocated.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
          <Button asChild className="gap-2 bg-halvi-accent hover:bg-halvi-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl">
            <Link to="/">
              <HomeIcon className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2 hover:bg-halvi-royal/10 transition-all duration-300 border-halvi-accent/20">
            <Link to="#" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-border animate-fade-in">
          <div className="h-8 w-8 rounded-full bg-gradient-halvi flex items-center justify-center mx-auto mb-2">
            <span className="font-bold text-white text-xs">H</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Halvi. The Command Center of the Halal Economy.
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

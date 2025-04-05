
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft, AlertTriangle } from "lucide-react";

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

        <h1 className="text-6xl font-bold mb-4 text-gradient animate-fade-in">404</h1>
        <h2 className="text-2xl font-semibold mb-2 animate-slide-in">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 animate-fade-in">
          Sorry, we couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
          <Button asChild className="gap-2 bg-halvi-accent hover:bg-halvi-accent/90 transition-all duration-300">
            <Link to="/">
              <HomeIcon className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button variant="outline" asChild className="gap-2 hover:bg-halvi-royal/10 transition-all duration-300">
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
        </div>
      </div>
    </div>
  );
};

export default NotFound;

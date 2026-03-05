import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  children?: ReactNode;
  showBrand?: boolean;
  showBack?: boolean;
  rightContent?: ReactNode;
}

const Navbar = ({ children, showBrand = true, showBack = false, rightContent }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mr-2"
            >
              ← Back
            </button>
          )}
          {showBrand && (
            <button onClick={() => navigate("/")} className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
              <img src="/favicon.png" alt="SmartPurchase" className="h-11 w-11" />
              Smart<span className="text-primary">Purchase</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          {rightContent}
          {location.pathname === "/" && (
            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full hidden sm:inline-flex">
              Gaming Laptops
            </span>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

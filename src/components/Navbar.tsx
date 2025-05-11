
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from '@/hooks/use-auth';
import { 
  MoonIcon, 
  SunIcon, 
  GraduationCap, 
  Book, 
  HelpCircle, 
  User, 
  Key,
  Settings,
  Scroll,
  School,
  Users
} from 'lucide-react';
import SubmitCourse from './SubmitCourse';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-background border-b shadow-sm sticky top-0 z-50">
      <div className="container max-w-7xl flex items-center justify-between py-4">
        <Link to="/" className="font-bold text-2xl font-serif">
          Academy of Everywhere
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/courses" className={navigationMenuTriggerStyle()}>
                Courses
              </Link>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Faculties</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                        to="/faculties"
                      >
                        <School className="h-6 w-6 text-white" />
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          All Faculties
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Explore all our academic faculties and departments
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link
                      to="/faculty/science"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Science</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Physics, Chemistry, Biology and more
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faculty/engineering"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Engineering</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Mechanical, Civil, Electrical and more
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faculty/computer-science"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Computer Science</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Programming, Data Science, AI and more
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-secondary/50 to-secondary p-6 no-underline outline-none focus:shadow-md"
                        to="/student/help"
                      >
                        <HelpCircle className="h-6 w-6 text-white" />
                        <div className="mb-2 mt-4 text-lg font-medium text-white">
                          Study Help
                        </div>
                        <p className="text-sm leading-tight text-white/90">
                          Get assistance with your studies and academic journey
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link
                      to="/student/materials"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Study Materials</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Access learning resources and materials
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">About Us</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Learn about our institution and mission
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/certificates"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">Certificates</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        View and verify academic certificates
                      </p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/study-group/featured" className={navigationMenuTriggerStyle()}>
                <Users className="mr-1 h-4 w-4" />
                Study Groups
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center space-x-4">
          <SubmitCourse />

          <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <MoonIcon className="h-4 w-4" /> : <SunIcon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                {user ? (
                  <img
                    src={user.user_metadata?.avatar_url || "/placeholder.svg"}
                    alt="Avatar"
                    className="h-8 w-8 rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/student/help">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Study Help
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/student/materials">
                      <Book className="mr-2 h-4 w-4" />
                      Study Materials
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/student/tokens">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      My Tokens
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <Key className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/signin">
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup">
                      Sign Up
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

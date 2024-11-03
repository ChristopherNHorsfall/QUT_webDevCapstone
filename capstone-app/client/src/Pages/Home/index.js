import { Container } from "react-bootstrap";
import SignInForm from "../../Components/SignInForm";
import WelcomeCarousel from "../../Components/WelcomeCarousel";
import { useAuth } from "../../AuthContext";
import UserWelcome from "../../Components/UserWelcome";
import IndustryWatch from "../../Components/IndustryWatch";

export default function Home() {
    const {isLoggedIn, setIsLoggedIn } = useAuth();
    return (
        <main>
            {!isLoggedIn ? (
                <>
                    <WelcomeCarousel/>
                    <SignInForm setIsLoggedIn={setIsLoggedIn}/>
                </>
            ):(
                <>
                <UserWelcome/>
                <IndustryWatch/>
                </>
            )}
        </main>
      );
   }
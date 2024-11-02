import { Container } from "react-bootstrap";
import SignInForm from "../../Components/SignInForm";
import WelcomeCarousel from "../../Components/WelcomeCarousel";


export default function Home() {
    return (
        <main>
            <WelcomeCarousel/>

                <SignInForm/>

        </main>
      );
   }
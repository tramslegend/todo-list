import { ThemeToggle2 } from '@/components/theme/ThemeToggle2';
import Container from '@/components/utils/Container';
import Navbar from './Navbar';
import Footer from './Footer';


export default function layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className=''>
            <Navbar />

            <Container className='min-h-svh overflow-hidden md:overflow-visible !px-0'>
                {children}
            </Container>

            <Footer />
        </div>
    )
}

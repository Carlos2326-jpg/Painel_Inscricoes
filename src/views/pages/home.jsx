import Header from "../components/layout/header";
import Article from "../components/layout/article";
import Footer from "../components/layout/footer";

export default function Home() {
    return (
            <body className="body-home">
                <main>
                    <Header />
                    <Article />
                    <Footer />
                </main>
            </body>
    );
}
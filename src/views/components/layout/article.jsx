import '../../_shared/style/components/layout/article.css';
import CardsSection from '../common/CardsSection';
import fatecImg from '../../assets/fatec.jpg';

export default function Article() {
    return (
        <article className="article-block">
            <section className="block-intro">
                <h2 className="title-h2">
                    Tecnologia que <span className="accent-yellow">conecta<br />pessoas e ideias.</span>
                </h2>
                <p className="text text--right">
                    A Semana de Tecnologia reúne estudantes, profissionais e apaixonados
                    por tecnologia em uma experiência dedicada ao aprendizado, à troca
                    de conhecimentos e à inovação. Durante três dias, você poderá explorar
                    novas áreas, desenvolver habilidades e conhecer diferentes perspectivas
                    sobre o futuro da tecnologia.
                </p>
            </section>

            <section className="block-center">
                <h2 className="title-h2 title-h2--center">
                    Muito mais do que<br />
                    <span className="accent-yellow">um evento.</span>
                </h2>
                <p className="text text--center">
                    Uma oportunidade para aprender, experimentar, se conectar e colocar
                    seus conhecimentos em prática.
                </p>
            </section>

            <CardsSection />

            <section className="block-intro">
                <h2 className="title-h2">
                    Três dias. <span className="accent-yellow">Novas<br />experiências.</span>
                </h2>
                <p className="text text--right">
                    Confira a programação completa e planeje sua participação.
                </p>
            </section>


            <section className="block-intro">
                <h2 className="title-h2">
                    Local: <span className="accent-yellow">FATEC de<br />Presidente Prudente.</span>
                </h2>

                <img
                    src={fatecImg}
                    alt=""
                    className="fatec-img"
                    aria-hidden="true"
                />

                <p className="text text--center text--fatec">
                    A FATEC de Presidente Prudente, localizada no município de Presidente Prudente, São Paulo, é uma instituição de ensino superior voltada à formação tecnológica e profissional. Reconhecida pela oferta de cursos alinhados às demandas do mercado de trabalho, a faculdade promove atividades acadêmicas, projetos, eventos e iniciativas que aproximam os estudantes das novas tecnologias e das oportunidades profissionais.
                </p>
            </section>


        </article>
    );
}
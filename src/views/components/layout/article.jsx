import '../../_shared/style/components/layout/article.css';
import CardsSection from '../common/CardsSection';

export default function Article() {
    return (
        <article className='article-block'>
            <section className='block-text'>
                <h2 className='title-h2'>
                    Tecnologia que <span>conecta pessoas e ideias.</span>
                </h2>

                <p className='text right'>
                    A Semana de Tecnologia reúne estudantes, profissionais e apaixonados por tecnologia em uma experiência dedicada ao aprendizado, à troca de conhecimentos e à inovação. Durante três dias, você poderá explorar novas áreas, desenvolver habilidades e conhecer diferentes perspectivas sobre o futuro da tecnologia.
                </p>
            </section>

            <section className='block-image'>
                <h3 className='title-h2'>
                    Três dias. <span>Novas experiências.</span>
                </h3>

                <p className='text'>
                    Uma oportunidade para aprender, experimentar, se conectar e colocar seus conhecimentos em prática.
                </p>
            </section>

            <CardsSection />

            <section>
                <h2 className='title-h2'>
                    Tecnologia que <span>conecta pessoas e ideias.</span>
                </h2>

                <p className='text right'>
                    Confira a programação completa e planeje sua participação.
                </p>
            </section>
        </article>
    );
}
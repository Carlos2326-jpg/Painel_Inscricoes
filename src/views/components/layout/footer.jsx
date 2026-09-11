import Button from '../common/button';
import '../../_shared/style/layout/footer.css'

export default function Footer() {
    return (
        <footer className='footer'>
            <section className='footer-content'>
                <h1 className='text title-h1'>
                    Venha <span>aprender, criar e conectar-se</span> com a gente
                </h1>

                <p className='text text-p description'>
                    Garanta já a sua incrição e sua vaga nos eventos!
                </p>

                <section className='content'>
                    <Button text="Quero participar" />

                    <p className='text text-p price-info'>
                        Inscrição: R$ 15,00 · Acesso aos 3 dias
                    </p>
                </section>
            </section>
        </footer>
    );
}